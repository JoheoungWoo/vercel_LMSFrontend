import React, { useState } from "react";

const TuitionManage = () => {
  // ───────────────── 등록금 더미 데이터 ─────────────────
  const [tuitionList, setTuitionList] = useState([
    {
      id: 1,
      studentId: "20250001",
      name: "김학생",
      department: "컴퓨터공학과",
      semester: "2025-2학기",
      baseAmount: 4200000,
      scholarshipAmount: 1000000,
      paid: false,
    },
    {
      id: 2,
      studentId: "20250002",
      name: "이예제",
      department: "전자공학과",
      semester: "2025-2학기",
      baseAmount: 4200000,
      scholarshipAmount: 0,
      paid: true,
    },
  ]);

  // ───────────────── 납부 처리 ─────────────────
  const handlePay = (id) => {
    setTuitionList((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, paid: true } : t
      )
    );
    alert("납부 처리되었습니다. (더미)");
  };

  // ───────────────── 금액 포맷 ─────────────────
  const formatWon = (amount) =>
    amount.toLocaleString("ko-KR") + "원";

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 학기별 등록금 고지 및 납부 상태를 관리합니다.
      </div>

      {/* 등록금 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          등록금 관리
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">학번</th>
                <th className="px-2 py-2">이름</th>
                <th className="px-2 py-2">학과</th>
                <th className="px-2 py-2">학기</th>
                <th className="px-2 py-2 text-right">등록금</th>
                <th className="px-2 py-2 text-right">장학금</th>
                <th className="px-2 py-2 text-right">납부 금액</th>
                <th className="px-2 py-2 text-center">상태</th>
                <th className="px-2 py-2 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {tuitionList.map((t, idx) => {
                const finalAmount =
                  t.baseAmount - t.scholarshipAmount;

                return (
                  <tr
                    key={t.id}
                    className={`border-b border-slate-100 ${
                      idx % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50/60"
                    }`}
                  >
                    <td className="px-2 py-2">
                      {t.studentId}
                    </td>
                    <td className="px-2 py-2 font-medium">
                      {t.name}
                    </td>
                    <td className="px-2 py-2">
                      {t.department}
                    </td>
                    <td className="px-2 py-2">
                      {t.semester}
                    </td>
                    <td className="px-2 py-2 text-right">
                      {formatWon(t.baseAmount)}
                    </td>
                    <td className="px-2 py-2 text-right text-emerald-700">
                      - {formatWon(t.scholarshipAmount)}
                    </td>
                    <td className="px-2 py-2 text-right font-semibold">
                      {formatWon(finalAmount)}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {t.paid ? (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] text-emerald-700">
                          납부 완료
                        </span>
                      ) : (
                        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[0.7rem] text-rose-600">
                          미납
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {!t.paid && (
                        <button
                          onClick={() => handlePay(t.id)}
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] hover:bg-slate-50"
                        >
                          납부 처리
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {tuitionList.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    등록금 정보가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 장학금 확정 후 등록금 차감,
        결제 API 연동, 납부 이력 관리가 추가됩니다.
      </p>
    </div>
  );
};

export default TuitionManage;
