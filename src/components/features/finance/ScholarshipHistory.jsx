import React from "react";

const ScholarshipHistory = () => {
  // ───────────────── 장학금 지급 내역 더미 ─────────────────
  const histories = [
    {
      id: 1,
      semester: "2025-1학기",
      type: "성적 우수 장학금",
      amount: 1000000,
      status: "지급 완료",
      paidAt: "2025-04-10",
    },
    {
      id: 2,
      semester: "2024-2학기",
      type: "가계 곤란 장학금",
      amount: 1500000,
      status: "지급 완료",
      paidAt: "2024-10-05",
    },
    {
      id: 3,
      semester: "2024-1학기",
      type: "근로 장학금",
      amount: 800000,
      status: "지급 완료",
      paidAt: "2024-04-12",
    },
  ];

  // ───────────────── 금액 포맷 ─────────────────
  const formatAmount = (value) =>
    value.toLocaleString("ko-KR") + "원";

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 본인의 장학금 지급 내역을 확인할 수 있습니다.
      </div>

      {/* 장학금 내역 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          장학금 지급 내역
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">학기</th>
                <th className="px-2 py-2">장학금 종류</th>
                <th className="px-2 py-2 text-right">지급 금액</th>
                <th className="px-2 py-2 text-center">상태</th>
                <th className="px-2 py-2">지급일</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((h, idx) => (
                <tr
                  key={h.id}
                  className={`border-b border-slate-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="px-2 py-2 text-slate-700">
                    {h.semester}
                  </td>
                  <td className="px-2 py-2 text-slate-800">
                    {h.type}
                  </td>
                  <td className="px-2 py-2 text-right text-slate-700">
                    {formatAmount(h.amount)}
                  </td>
                  <td className="px-2 py-2 text-center">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] text-emerald-700">
                      {h.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {h.paidAt}
                  </td>
                </tr>
              ))}
              {histories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    장학금 지급 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 학기별 필터, 지급 취소 이력,
        출력(PDF) 기능이 추가될 수 있습니다.
      </p>
    </div>
  );
};

export default ScholarshipHistory;
