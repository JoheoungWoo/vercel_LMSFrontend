import React, { useState } from "react";

const FinalGradeConfirm = () => {
  // ───────────────── 최종 성적 더미 ─────────────────
  const [grades, setGrades] = useState([
    {
      id: 1,
      studentId: "20250001",
      name: "김학생",
      total: 88,
      grade: "B",
      confirmed: false,
    },
    {
      id: 2,
      studentId: "20250002",
      name: "이예제",
      total: 92,
      grade: "A",
      confirmed: false,
    },
    {
      id: 3,
      studentId: "20250003",
      name: "박테스트",
      total: 58,
      grade: "F",
      confirmed: true,
    },
  ]);

  // ───────────────── 단일 확정 ─────────────────
  const handleConfirmOne = (id) => {
    setGrades((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, confirmed: true } : g
      )
    );
    alert("최종 성적이 확정되었습니다. (더미)");
  };

  // ───────────────── 전체 확정 ─────────────────
  const handleConfirmAll = () => {
    setGrades((prev) =>
      prev.map((g) => ({ ...g, confirmed: true }))
    );
    alert("모든 최종 성적이 확정되었습니다. (더미)");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 최종 성적을 확정하면 학생에게 공개되며 이후 수정이 제한됩니다.
      </div>

      {/* 최종 성적 테이블 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            최종 성적 확정
          </h3>
          <button
            onClick={handleConfirmAll}
            className="rounded-md bg-emerald-500 px-3 py-1.5 text-[0.8rem] font-medium text-white hover:bg-emerald-600"
          >
            전체 확정
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">학번</th>
                <th className="px-2 py-2">이름</th>
                <th className="px-2 py-2 text-center">총점</th>
                <th className="px-2 py-2 text-center">등급</th>
                <th className="px-2 py-2 text-center">상태</th>
                <th className="px-2 py-2 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, idx) => (
                <tr
                  key={g.id}
                  className={`border-b border-slate-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="px-2 py-2 text-slate-700">
                    {g.studentId}
                  </td>
                  <td className="px-2 py-2 font-medium text-slate-800">
                    {g.name}
                  </td>
                  <td className="px-2 py-2 text-center font-semibold">
                    {g.total}
                  </td>
                  <td className="px-2 py-2 text-center">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.7rem] ${
                        g.grade === "A"
                          ? "bg-emerald-50 text-emerald-700"
                          : g.grade === "F"
                          ? "bg-rose-50 text-rose-600"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {g.grade}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    {g.confirmed ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] text-emerald-700">
                        확정
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[0.7rem] text-amber-700">
                        임시
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {!g.confirmed && (
                      <button
                        onClick={() =>
                          handleConfirmOne(g.id)
                        }
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] hover:bg-slate-50"
                      >
                        확정
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {grades.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    성적 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 확정 이후 성적 수정은
        학사팀 승인 절차를 거쳐야 합니다.
      </p>
    </div>
  );
};

export default FinalGradeConfirm;
