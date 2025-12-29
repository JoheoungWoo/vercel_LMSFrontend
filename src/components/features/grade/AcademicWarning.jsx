import React, { useState } from "react";

const AcademicWarning = () => {
  // ───────────────── 학사 경고 더미 데이터 ─────────────────
  const [warnings, setWarnings] = useState([
    {
      id: 1,
      studentId: "20250001",
      name: "김학생",
      department: "컴퓨터공학과",
      semester: "2025-1학기",
      reason: "평점 평균 미달 (GPA 1.8)",
      warningCount: 1,
      active: true,
    },
    {
      id: 2,
      studentId: "20250003",
      name: "박테스트",
      department: "전자공학과",
      semester: "2025-1학기",
      reason: "출석률 미달 (68%)",
      warningCount: 2,
      active: true,
    },
    {
      id: 3,
      studentId: "20240007",
      name: "최샘플",
      department: "경영학과",
      semester: "2024-2학기",
      reason: "평점 평균 미달 (GPA 1.9)",
      warningCount: 1,
      active: false,
    },
  ]);

  // ───────────────── 경고 해제 ─────────────────
  const handleRelease = (id) => {
    setWarnings((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, active: false } : w
      )
    );
    alert("학사 경고가 해제되었습니다. (더미)");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 학사 경고 대상 학생을 확인하고 경고 상태를 관리합니다.
      </div>

      {/* 경고 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          학사 경고 관리
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">학번</th>
                <th className="px-2 py-2">이름</th>
                <th className="px-2 py-2">학과</th>
                <th className="px-2 py-2">학기</th>
                <th className="px-2 py-2">사유</th>
                <th className="px-2 py-2 text-center">누적</th>
                <th className="px-2 py-2 text-center">상태</th>
                <th className="px-2 py-2 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {warnings.map((w, idx) => (
                <tr
                  key={w.id}
                  className={`border-b border-slate-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="px-2 py-2 text-slate-700">
                    {w.studentId}
                  </td>
                  <td className="px-2 py-2 font-medium text-slate-800">
                    {w.name}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {w.department}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {w.semester}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {w.reason}
                  </td>
                  <td className="px-2 py-2 text-center font-semibold">
                    {w.warningCount}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {w.active ? (
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[0.7rem] text-rose-600">
                        경고 중
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] text-emerald-700">
                        해제
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {w.active && (
                      <button
                        onClick={() => handleRelease(w.id)}
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] hover:bg-slate-50"
                      >
                        경고 해제
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {warnings.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    학사 경고 대상자가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 GPA/출석 자동 계산,
        경고 누적에 따른 제적 처리 로직이 추가됩니다.
      </p>
    </div>
  );
};

export default AcademicWarning;
