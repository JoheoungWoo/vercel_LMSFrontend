import React from "react";

const GpaOverview = () => {
  // ───────────────── 학기별 성적 더미 ─────────────────
  const semesters = [
    {
      semester: "2025-1학기",
      credits: 18,
      gpa: 3.4,
    },
    {
      semester: "2024-2학기",
      credits: 17,
      gpa: 3.1,
    },
    {
      semester: "2024-1학기",
      credits: 16,
      gpa: 2.6,
    },
  ];

  // ───────────────── 누적 계산 ─────────────────
  const totalCredits = semesters.reduce(
    (sum, s) => sum + s.credits,
    0
  );

  const averageGpa = (
    semesters.reduce(
      (sum, s) => sum + s.gpa * s.credits,
      0
    ) / totalCredits
  ).toFixed(2);

  // ───────────────── 학사 경고 기준 ─────────────────
  const WARNING_GPA = 2.0;
  const isWarning = averageGpa < WARNING_GPA;

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 상단 요약 */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* 누적 GPA */}
        <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
          <p className="text-xs text-slate-500">누적 GPA</p>
          <p
            className={`mt-1 text-2xl font-semibold ${
              isWarning
                ? "text-rose-600"
                : "text-slate-800"
            }`}
          >
            {averageGpa}
          </p>
          <p className="mt-1 text-[0.75rem] text-slate-400">
            기준: 4.5 만점
          </p>
        </div>

        {/* 이수 학점 */}
        <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
          <p className="text-xs text-slate-500">이수 학점</p>
          <p className="mt-1 text-2xl font-semibold text-slate-800">
            {totalCredits}
          </p>
          <p className="mt-1 text-[0.75rem] text-slate-400">
            전체 이수 학점
          </p>
        </div>

        {/* 학사 경고 상태 */}
        <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
          <p className="text-xs text-slate-500">학사 상태</p>
          <p className="mt-2">
            {isWarning ? (
              <span className="rounded-full bg-rose-50 px-3 py-1 text-sm text-rose-600">
                학사 경고 대상
              </span>
            ) : (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
                정상
              </span>
            )}
          </p>
          <p className="mt-1 text-[0.75rem] text-slate-400">
            기준 GPA {WARNING_GPA} 미만
          </p>
        </div>
      </div>

      {/* 학기별 GPA */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          학기별 GPA
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">학기</th>
                <th className="px-2 py-2 text-center">이수 학점</th>
                <th className="px-2 py-2 text-center">GPA</th>
                <th className="px-2 py-2 text-center">상태</th>
              </tr>
            </thead>
            <tbody>
              {semesters.map((s, idx) => (
                <tr
                  key={s.semester}
                  className={`border-b border-slate-100 ${
                    idx % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50/60"
                  }`}
                >
                  <td className="px-2 py-2 text-slate-700">
                    {s.semester}
                  </td>
                  <td className="px-2 py-2 text-center text-slate-700">
                    {s.credits}
                  </td>
                  <td className="px-2 py-2 text-center font-semibold">
                    {s.gpa.toFixed(2)}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {s.gpa < WARNING_GPA ? (
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[0.7rem] text-rose-600">
                        경고
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] text-emerald-700">
                        정상
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {semesters.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
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
        ※ GPA는 확정된 최종 성적을 기준으로 계산됩니다.
      </p>
    </div>
  );
};

export default GpaOverview;
