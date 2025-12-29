import React from "react";

const StudentStatusHistory = () => {
  /** 학적 상태 변경 이력 (더미) */
  const histories = [
    {
      id: 1,
      type: "휴학",
      semester: "2024-2학기",
      reason: "군 복무",
      status: "승인",
      processedAt: "2024-08-20",
    },
    {
      id: 2,
      type: "복학",
      semester: "2025-1학기",
      reason: "군 복무 종료",
      status: "승인",
      processedAt: "2025-01-10",
    },
    {
      id: 3,
      type: "휴학",
      semester: "2025-2학기",
      reason: "개인 사정",
      status: "대기",
      processedAt: "-",
    },
    {
      id: 4,
      type: "휴학",
      semester: "2023-2학기",
      reason: "건강 문제",
      status: "반려",
      processedAt: "2023-08-18",
    },
  ];

  /** 상태 뱃지 */
  const statusBadge = (status) => {
    if (status === "승인")
      return "bg-emerald-100 text-emerald-700";
    if (status === "반려")
      return "bg-red-100 text-red-600";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">학적 상태 변경 이력</h1>
      <p className="mb-4 text-sm text-slate-500">
        휴학 및 복학 등 학적 상태 변경 내역을 확인합니다.
      </p>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">변경 유형</th>
              <th className="px-4 py-2 text-left">적용 학기</th>
              <th className="px-4 py-2 text-left">사유</th>
              <th className="px-4 py-2 text-center">상태</th>
              <th className="px-4 py-2 text-center">처리 일자</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((h) => (
              <tr
                key={h.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-2 font-medium">{h.type}</td>
                <td className="px-4 py-2">{h.semester}</td>
                <td className="px-4 py-2 text-slate-700">
                  {h.reason}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadge(
                      h.status
                    )}`}
                  >
                    {h.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {h.processedAt}
                </td>
              </tr>
            ))}

            {histories.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  학적 변경 이력이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[0.75rem] text-slate-400">
        ※ 승인 완료된 학적 상태는 다음 학기부터 적용됩니다.
      </p>
    </div>
  );
};

export default StudentStatusHistory;
