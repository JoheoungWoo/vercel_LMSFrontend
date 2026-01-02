import { useState, useCallback, useEffect } from "react";
// API 경로가 프로젝트 구조에 맞는지 확인해주세요
import GradeItemApi from "../../api/GradeItemApi";

// 백엔드 Enum 매핑
const ITEM_TYPE_MAP = {
  midterm: "MIDTERM",
  final: "FINAL",
  assignment: "ASSIGNMENT",
  attendance: "ATTENDANCE",
};

// 🔥 [중요] 함수 이름을 useProfessorGrade로 통일했습니다.
export const useProfessorGrade = (offeringId, userEmail) => {
  const [items, setItems] = useState([]); // 현재 DB에 저장된 항목들
  const [loading, setLoading] = useState(false);

  // ───────────────── 1. 조회 (Read) ─────────────────
  const fetchItems = useCallback(async () => {
    if (!offeringId) return;
    setLoading(true);
    try {
      const data = await GradeItemApi.config.funcs.findByOffering(offeringId);
      if (Array.isArray(data)) {
        // 정렬: ID 순 또는 타입 순 (여기서는 생성된 ID 순서)
        const sorted = data.sort((a, b) => a.itemId - b.itemId);
        setItems(sorted);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("평가 기준 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [offeringId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ───────────────── 2. 생성 (Create) ─────────────────
  const createItem = async (newItem) => {
    if (!offeringId) return;
    setLoading(true);
    try {
      const dto = {
        offeringId: offeringId,
        itemName: newItem.name,
        itemType: ITEM_TYPE_MAP[newItem.type],
        maxScore: Number(newItem.maxScore),
        weightPercent: Number(newItem.weight),
      };
      await GradeItemApi.config.funcs.writeOne(dto, userEmail);
      await fetchItems(); // 목록 갱신
      return true;
    } catch (error) {
      console.error("항목 생성 실패:", error);
      alert("항목 생성 중 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ───────────────── 3. 수정 (Update) ─────────────────
  const updateItem = async (itemId, updatedData) => {
    setLoading(true);
    try {
      const dto = {
        offeringId: offeringId,
        itemId: itemId,
        itemName: updatedData.name,
        itemType: ITEM_TYPE_MAP[updatedData.type],
        maxScore: Number(updatedData.maxScore),
        weightPercent: Number(updatedData.weight),
      };

      // API에 updateOne이 있다면 사용, 없다면 writeOne 사용 (상황에 맞게)
      if (GradeItemApi.config.funcs.updateOne) {
        await GradeItemApi.config.funcs.updateOne(dto, userEmail);
      } else {
        // 임시: 업데이트 API가 없다면 writeOne으로 시도
        await GradeItemApi.config.funcs.writeOne(dto, userEmail);
      }

      await fetchItems();
      return true;
    } catch (error) {
      console.error("항목 수정 실패:", error);
      alert("항목 수정 중 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ───────────────── 4. 삭제 (Delete) ─────────────────
  // const deleteItem = async (itemId) => {
  //   if (!window.confirm("정말 이 평가 항목을 삭제하시겠습니까?")) return;
  //   setLoading(true);
  //   try {
  //     await GradeItemApi.config.funcs.deleteOne(itemId, userEmail);
  //     await fetchItems();
  //   } catch (error) {
  //     console.error("항목 삭제 실패:", error);
  //     alert("삭제 실패");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ───────────────── 5. 프리셋 일괄 적용 ─────────────────
  const applyPreset = async (preset) => {
    if (
      !window.confirm(
        `[${preset.name}]을 적용하시겠습니까?\n기존 항목은 모두 삭제됩니다.`
      )
    )
      return;

    setLoading(true);
    try {
      // 1) 기존 항목 전체 삭제
      for (const item of items) {
        await GradeItemApi.config.funcs.deleteOne(item.itemId, userEmail);
      }

      // 2) 프리셋 내용으로 신규 생성
      const itemsToCreate = [
        { name: "중간고사", type: "midterm", max: 100, weight: preset.midterm },
        { name: "기말고사", type: "final", max: 100, weight: preset.final },
        {
          name: "과제",
          type: "assignment",
          max: 50,
          weight: preset.assignment,
        },
        {
          name: "출결",
          type: "attendance",
          max: 20,
          weight: preset.attendance,
        },
      ];

      for (const item of itemsToCreate) {
        if (item.weight > 0) {
          const dto = {
            offeringId,
            itemName: item.name,
            itemType: ITEM_TYPE_MAP[item.type],
            maxScore: item.max,
            weightPercent: item.weight,
          };
          await GradeItemApi.config.funcs.writeOne(dto, userEmail);
        }
      }

      await fetchItems();
      alert("정책이 적용되었습니다.");
    } catch (error) {
      console.error("프리셋 적용 실패:", error);
      alert("프리셋 적용 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // 총 반영 비율 계산
  const currentTotalWeight = items.reduce(
    (sum, item) => sum + item.weightPercent,
    0
  );

  return {
    items,
    loading,
    currentTotalWeight,
    createItem,
    updateItem,
    // deleteItem,
    applyPreset,
  };
};
