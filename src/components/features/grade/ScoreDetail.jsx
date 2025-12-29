import React from "react";

const ScoreDetail = () => {
  // ───────────────── 평가 항목 더미 ─────────────────
  const scoreItems = [
    {
      id: 1,
      name: "중간고사",
      score: 78,
      maxScore: 100,
      weight: 30, // %
    },
    {
      id: 2,
      name: "기말고사",
      score: 85,
      maxScore: 100,
      weight: 40,
    },
    {
      id: 3,
      name: "과제",
      score: 90,
      maxScore: 100,
      weight: 20,
    },
    {
      id: 4,
      name: "출석",
      score: 18,
      maxScore: 20,
      weight: 10,
    },
  ];

  const professorComment =
    "전반적으로 성실하나 중간고사 이론 문제에서 감점이 있었습니다.";

  // ───────────────── 환산 점수 계산 ─────────────────
  const calcConvertedScore = (item) => {
    const ratio = item.score / item.maxScore;
    return Math.round(ratio * item.weight * 10) / 10;
  };

  // ───────────────── 총점 계산 ─────────────────
  const totalScore = scoreItems.reduce(
    (sum, item) => sum + calcConvertedScore(item),
    0
  );

  // ───────────────── 등급 계산 ─────────────────
  const calcGrade = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  const finalGrade = calcGrade(totalScore);

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-5 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 항목별 점수와 반영 비율을 기준으로 최종 점수가 계산됩니다.
      </div>

      {/* 점수 테이블 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          점수 세부 내역
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">평가 항목</th>
                <th className="px-2 py-2 text-center">원점수</th>
                <th className="px-2 py-2 text-center">만점</th>
                <th className="px-2 py-2 text-center">반영 비율</th>
                <th className="px-2 py-2 text-center">환산 점수</th>
              </tr>
            </thead>
            <tbody>
              {scoreItems.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`border-b border-slate-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="px-2 py-2 font-medium text-slate-800">
                    {item.name}
                  </td>
                  <td className="px-2 py-2 text-center text-slate-700">
                    {item.score}
                  </td>
                  <td className="px-2 py-2 text-center text-slate-700">
                    {item.maxScore}
                  </td>
                  <td className="px-2 py-2 text-center text-slate-700">
                    {item.weight}%
                  </td>
                  <td className="px-2 py-2 text-center font-semibold">
                    {calcConvertedScore(item)}
                  </td>
                </tr>
              ))}

              {scoreItems.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    점수 정보가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 총점 요약 */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
          <p className="text-xs text-slate-500">총점</p>
          <p className="mt-1 text-2xl font-semibold text-slate-800">
            {totalScore.toFixed(1)}
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
          <p className="text-xs text-slate-500">최종 등급</p>
          <p
            className={`mt-1 text-2xl font-semibold ${
              finalGrade === "A"
                ? "text-emerald-600"
                : finalGrade === "F"
                ? "text-rose-600"
                : "text-slate-800"
            }`}
          >
            {finalGrade}
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
          <p className="text-xs text-slate-500">성적 상태</p>
          <span className="mt-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
            확정
          </span>
        </div>
      </div>

      {/* 교수 코멘트 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h4 className="mb-2 font-semibold text-slate-800">
          교수 코멘트
        </h4>
        <p className="text-sm text-slate-700">
          {professorComment}
        </p>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 점수 관련 이의가 있을 경우 성적 이의 신청을 통해 문의할 수 있습니다.
      </p>
    </div>
  );
};

export default ScoreDetail;
