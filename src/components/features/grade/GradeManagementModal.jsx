import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGradeManagement } from "../../../hook/grade/useGradeManagement";

// 통합 모달
export default function GradeManagementModal({
  offeringId,
  courseName,
  onClose,
}) {
  const userEmail = useSelector((state) => state.loginSlice?.email);
  const [activeTab, setActiveTab] = useState("items"); // items | scores

  // Hook 호출 (공통 데이터 로드)
  const hook = useGradeManagement(offeringId, userEmail);

  return (
    <div className="flex flex-col h-[80vh] bg-slate-50">
      {" "}
      {/* 높이 고정 */}
      {/* 1. 상단 헤더 */}
      <div className="bg-white p-4 border-b flex justify-between items-center shrink-0">
        <h2 className="text-lg font-bold text-slate-800">
          [{courseName}] 성적 관리
        </h2>
        <div className="flex gap-2">
          <TabButton
            label="1. 평가 기준 설정"
            isActive={activeTab === "items"}
            onClick={() => setActiveTab("items")}
          />
          <TabButton
            label="2. 점수 입력 및 산출"
            isActive={activeTab === "scores"}
            onClick={() => setActiveTab("scores")}
          />
          <button
            onClick={onClose}
            className="ml-4 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      </div>
      {/* 2. 컨텐츠 영역 */}
      <div className="flex-1 overflow-hidden p-4">
        {activeTab === "items" ? (
          <GradeItemManager hook={hook} />
        ) : (
          <ScoreInputManager hook={hook} />
        )}
      </div>
    </div>
  );
}

// 탭 버튼 컴포넌트
function TabButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
        isActive
          ? "bg-indigo-600 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

// =============================================================================
// [탭 1] 평가 기준 관리
// =============================================================================
function GradeItemManager({ hook }) {
  const { items, fetchGradeItems, createGradeItem } = hook;
  const [newItem, setNewItem] = useState({
    itemName: "",
    itemType: "EXAM",
    maxScore: 100,
    weightPercent: 0,
    description: "",
  });

  useEffect(() => {
    fetchGradeItems();
  }, [fetchGradeItems]);

  const handleCreate = async () => {
    const success = await createGradeItem(newItem);
    if (success) {
      setNewItem({
        itemName: "",
        itemType: "EXAM",
        maxScore: 100,
        weightPercent: 0,
        description: "",
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 입력 폼 */}
      <div className="bg-white p-4 rounded-xl shadow-sm border grid grid-cols-12 gap-2 items-end shrink-0">
        <div className="col-span-3">
          <label className="text-xs font-bold text-slate-500">항목명</label>
          <input
            className="w-full border p-2 rounded text-sm"
            value={newItem.itemName}
            onChange={(e) =>
              setNewItem({ ...newItem, itemName: e.target.value })
            }
            placeholder="예: 중간고사"
          />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-bold text-slate-500">유형</label>
          <select
            className="w-full border p-2 rounded text-sm"
            value={newItem.itemType}
            onChange={(e) =>
              setNewItem({ ...newItem, itemType: e.target.value })
            }
          >
            <option value="EXAM">시험</option>
            <option value="ASSIGNMENT">과제</option>
            <option value="ATTENDANCE">출석</option>
            <option value="PROJECT">프로젝트</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="text-xs font-bold text-slate-500">만점</label>
          <input
            type="number"
            className="w-full border p-2 rounded text-sm"
            value={newItem.maxScore}
            onChange={(e) =>
              setNewItem({ ...newItem, maxScore: parseFloat(e.target.value) })
            }
          />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-bold text-slate-500">비율(%)</label>
          <input
            type="number"
            className="w-full border p-2 rounded text-sm"
            value={newItem.weightPercent}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                weightPercent: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div className="col-span-3">
          <button
            onClick={handleCreate}
            className="w-full bg-green-500 text-white p-2 rounded font-bold hover:bg-green-600 text-sm"
          >
            추가하기
          </button>
        </div>
      </div>

      {/* 리스트 테이블 */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0">
            <tr>
              <th className="p-3">항목명</th>
              <th className="p-3">유형</th>
              <th className="p-3">만점</th>
              <th className="p-3">비율</th>
              <th className="p-3">설명</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={item.itemId} className="hover:bg-slate-50">
                <td className="p-3">{item.itemName}</td>
                <td className="p-3">
                  <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                    {item.itemType}
                  </span>
                </td>
                <td className="p-3">{item.maxScore}점</td>
                <td className="p-3 font-bold text-indigo-600">
                  {item.weightPercent}%
                </td>
                <td className="p-3 text-slate-500">
                  {item.description || "-"}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-400">
                  등록된 항목이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =============================================================================
// [탭 2] 점수 입력 (Gradebook)
// =============================================================================
function ScoreInputManager({ hook }) {
  const {
    items,
    students,
    scores,
    fetchGradeBookData,
    saveScore,
    calculateAllGrades,
    loading,
  } = hook;

  useEffect(() => {
    fetchGradeBookData();
  }, [fetchGradeBookData]);

  if (loading)
    return (
      <div className="p-10 text-center text-slate-500">
        데이터를 불러오는 중입니다...
      </div>
    );

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 툴바 */}
      <div className="flex justify-between items-center bg-white p-3 rounded-xl border shadow-sm shrink-0">
        <div className="text-sm text-slate-500">
          💡 점수를 입력하고 포커스를 이동하면 자동 저장됩니다.
        </div>
        <button
          onClick={calculateAllGrades}
          className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700 shadow text-sm flex items-center gap-2"
        >
          <span>🧮</span> 전체 성적 산출 및 마감
        </button>
      </div>

      {/* 엑셀형 테이블 */}
      <div className="flex-1 bg-white rounded-xl shadow border overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-slate-100 sticky top-0 z-10 text-slate-700">
            <tr>
              <th className="p-3 border text-left min-w-[120px] bg-slate-100 sticky left-0 z-20">
                학생명
              </th>
              {items.map((item) => (
                <th
                  key={item.itemId}
                  className="p-3 border text-center min-w-[100px]"
                >
                  {item.itemName} <br />
                  <span className="text-[10px] font-normal text-slate-500">
                    ({item.maxScore}점/{item.weightPercent}%)
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((std) => (
              <tr key={std.enrollmentId} className="hover:bg-slate-50">
                <td className="p-3 border font-medium bg-white sticky left-0 z-10">
                  {std.studentName}
                </td>
                {items.map((item) => {
                  const key = `${std.enrollmentId}_${item.itemId}`;
                  const scoreData = scores[key];
                  return (
                    <td key={item.itemId} className="p-0 border relative group">
                      <input
                        type="number"
                        className="w-full h-full p-3 text-center focus:bg-indigo-50 outline-none bg-transparent"
                        defaultValue={scoreData?.scoreObtained ?? ""}
                        onBlur={(e) =>
                          saveScore(
                            std.enrollmentId,
                            item.itemId,
                            e.target.value
                          )
                        }
                        placeholder="-"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={items.length + 1}
                  className="p-10 text-center text-slate-400"
                >
                  수강생 데이터가 없거나 평가 항목이 설정되지 않았습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
