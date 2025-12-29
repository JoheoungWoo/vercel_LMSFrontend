import React from "react";

const FinalGradeView = () => {
  // ───────────────── 최종 성적 더미 (학생 기준) ─────────────────
  const grades = [
    {
      id: 1,
      courseCode: "CS301",
      courseName: "웹 프로그래밍",
      professor: "홍길동",
      total: 88,
      grade: "B",
      confirmed: true,
    },
    {
      id: 2,
      courseCode: "CS302",
      courseName: "자료구조",
      professor: "김교수",
      total: 92,
      grade: "A",
      confirmed: true,
    },
    {
      id: 3,
      courseCode: "CS303",
      courseName: "운영체제",
      professor: "이교수",
      total: 58,
      grade: "F",
      confirmed: true,
    },
  ];

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 확정된 최종 성적만 조회할 수 있습니다.
      </div>

      {/* 성적 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          최종 성적 조회
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">과목 코드</th>
                <th className="px-2 py-2">과목명</th>
                <th className="px-2 py-2">담당 교수</th>
                <th className="px-2 py-2 text-center">총점</th>
                <th className="px-2 py-2 text-center">등급</th>
                <th className="px-2 py-2 text-center">상태</th>
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
                    {g.courseCode}
                  </td>
                  <td className="px-2 py-2 font-medium text-slate-800">
                    {g.courseName}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {g.professor}
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
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.7rem] text-slate-500">
                        미공개
                      </span>
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
                    공개된 성적이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 성적 이의 신청은 성적 공개 기간 내에만 가능합니다.
      </p>
    </div>
  );
};

export default FinalGradeView;
