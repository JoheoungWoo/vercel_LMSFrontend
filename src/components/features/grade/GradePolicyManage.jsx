import React, { useState } from "react";
// 🔥 [중요] 여기서 useProfessorGrade를 import 합니다.
import { useProfessorGrade } from "../../../hook/grade/useProfessorGrade";

// 타입 선택 옵션
const TYPE_OPTIONS = [
  { label: "중간고사", value: "midterm" },
  { label: "기말고사", value: "final" },
  { label: "과제", value: "assignment" },
  { label: "출결", value: "attendance" },
];

const GradePolicyManage = ({ offeringId, userEmail }) => {
  // 🔥 훅 이름도 useProfessorGrade로 사용
  const {
    items,
    loading,
    currentTotalWeight,
    createItem,
    updateItem,
    // deleteItem,
    // applyPreset 제거됨
  } = useProfessorGrade(offeringId, userEmail);

  // ───────────────── UI 상태 ─────────────────
  const [editingId, setEditingId] = useState(null); // 수정 모드인 항목 ID

  // 신규/수정 입력 폼 (공용 사용)
  const [form, setForm] = useState({
    name: "",
    type: "midterm",
    maxScore: 100,
    weight: 0,
  });

  // ───────────────── 핸들러 ─────────────────

  // 입력 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "name" || name === "type" ? value : Number(value),
    }));
  };

  // 등록 (Create) 버튼 클릭
  const handleCreate = async () => {
    if (!form.name) return alert("항목명을 입력하세요.");
    // 100% 초과 검증 로직이 필요하면 주석 해제
    // if (currentTotalWeight + form.weight > 100) return alert("총 합계가 100%를 초과합니다.");

    const success = await createItem(form);
    if (success) {
      setForm({ name: "", type: "midterm", maxScore: 100, weight: 0 }); // 초기화
    }
  };

  // 수정 (Update) 모드 진입
  const startEdit = (item) => {
    setEditingId(item.itemId);

    // DB Enum값(MIDTERM)을 UI value(midterm)로 변환
    let typeValue = "midterm";
    if (item.itemType === "FINAL") typeValue = "final";
    else if (item.itemType === "ASSIGNMENT") typeValue = "assignment";
    else if (item.itemType === "ATTENDANCE") typeValue = "attendance";

    setForm({
      name: item.itemName,
      type: typeValue,
      maxScore: item.maxScore,
      weight: item.weightPercent,
    });
  };

  // 수정 저장
  const handleUpdate = async () => {
    const success = await updateItem(editingId, form);
    if (success) {
      setEditingId(null);
      setForm({ name: "", type: "midterm", maxScore: 100, weight: 0 }); // 초기화
    }
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", type: "midterm", maxScore: 100, weight: 0 });
  };

  // ───────────────── 렌더링 ─────────────────
  return (
    <div className="space-y-6 text-[0.85rem]">
      {/* 1. 상단 안내 및 합계 */}
      <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="text-slate-600">
          ※ 평가 항목을 개별적으로 추가, 수정, 삭제할 수 있습니다.
          {!offeringId && (
            <span className="text-red-500 font-bold ml-2">(강의 ID 없음)</span>
          )}
        </div>
        <div
          className={`font-bold ${
            currentTotalWeight === 100 ? "text-blue-600" : "text-red-500"
          }`}
        >
          현재 반영 비율 합계: {currentTotalWeight}%
        </div>
      </div>

      {loading && (
        <div className="text-center text-blue-500 font-bold">로딩 중...</div>
      )}

      {/* 2. 현재 평가 항목 목록 (CRUD 영역) */}
      <div className="rounded-md border border-slate-200 bg-white p-4">
        <h3 className="mb-3 font-semibold text-slate-800">평가 항목 목록</h3>

        {/* 테이블 헤더 */}
        <div className="grid grid-cols-12 gap-2 border-b border-slate-100 pb-2 text-xs font-medium text-slate-500 text-center">
          <div className="col-span-3 text-left pl-2">항목명</div>
          <div className="col-span-2">유형</div>
          <div className="col-span-2">만점</div>
          <div className="col-span-2">비율(%)</div>
          <div className="col-span-3">관리</div>
        </div>

        {/* 목록 리스트 */}
        <div className="space-y-2 mt-2">
          {items.map((item) => (
            <div
              key={item.itemId}
              className="grid grid-cols-12 gap-2 items-center py-2 border-b border-slate-50 text-center text-sm"
            >
              {editingId === item.itemId ? (
                // 🔹 수정 모드 (Input 표시)
                <>
                  <div className="col-span-3">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full border rounded px-1 py-1"
                    >
                      {TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      name="maxScore"
                      value={form.maxScore}
                      onChange={handleChange}
                      className="w-full border rounded px-1 py-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      className="w-full border rounded px-1 py-1"
                    />
                  </div>
                  <div className="col-span-3 flex justify-center gap-1">
                    <button
                      onClick={handleUpdate}
                      className="bg-emerald-500 text-white px-2 py-1 rounded text-xs"
                    >
                      저장
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-slate-400 text-white px-2 py-1 rounded text-xs"
                    >
                      취소
                    </button>
                  </div>
                </>
              ) : (
                // 🔹 조회 모드 (Text 표시)
                <>
                  <div className="col-span-3 text-left pl-2 font-medium">
                    {item.itemName}
                  </div>
                  <div className="col-span-2 text-slate-500 text-xs">
                    {item.itemType}
                  </div>
                  <div className="col-span-2">{item.maxScore}점</div>
                  <div className="col-span-2 font-bold text-slate-700">
                    {item.weightPercent}%
                  </div>
                  <div className="col-span-3 flex justify-center gap-1">
                    <button
                      onClick={() => startEdit(item)}
                      className="border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 px-2 py-1 rounded text-xs"
                    >
                      수정
                    </button>
                    {/* <button
                      onClick={() => deleteItem(item.itemId)}
                      className="border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 px-2 py-1 rounded text-xs"
                    >
                      삭제
                    </button> */}
                  </div>
                </>
              )}
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-center text-slate-400 py-4">
              등록된 평가 항목이 없습니다.
            </p>
          )}
        </div>

        {/* 3. 신규 항목 추가 폼 (수정 중이 아닐 때만 표시) */}
        {!editingId && (
          <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/50 p-3 rounded-md">
            <h4 className="text-xs font-bold text-slate-600 mb-2">
              ➕ 신규 항목 추가
            </h4>
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3">
                <input
                  placeholder="항목명"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                />
              </div>
              <div className="col-span-2">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded px-1 py-1.5 text-sm"
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="만점"
                  name="maxScore"
                  value={form.maxScore}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded px-1 py-1.5 text-sm"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="비율"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded px-1 py-1.5 text-sm"
                />
              </div>
              <div className="col-span-3 text-center">
                <button
                  onClick={handleCreate}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm transition"
                >
                  추가하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradePolicyManage;
