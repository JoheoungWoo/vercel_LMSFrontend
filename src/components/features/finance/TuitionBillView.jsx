import React from "react";

const TuitionBillView = () => {
  return (
    <div className="space-y-4">
      {/* 제목 */}
      <h2 className="text-xl font-bold text-slate-800">등록금 관리</h2>

      <p className="text-sm text-slate-500">
        학기별 등록금 고지 및 납부 상태를 확인할 수 있습니다.
      </p>

      {/* 등록금 목록 */}
      <div className="space-y-3">
        {TUITION_SEED.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            {/* 상단 */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                {t.semester}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  t.status === "PAID"
                    ? "bg-emerald-100 text-emerald-700"
                    : t.status === "PARTIAL"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {t.status === "PAID"
                  ? "납부 완료"
                  : t.status === "PARTIAL"
                  ? "분납 중"
                  : "미납"}
              </span>
            </div>

            {/* 금액 정보 */}
            <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-slate-500">등록금</div>
              <div className="text-right font-medium">{money(t.tuition)}</div>

              <div className="text-slate-500">장학금</div>
              <div className="text-right font-medium text-emerald-600">
                − {money(t.scholarship)}
              </div>

              <div className="text-slate-700 font-semibold">납부 금액</div>
              <div className="text-right font-bold text-slate-900">
                {money(t.payable)}
              </div>
            </div>

            {/* 하단 정보 */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
              <div className="text-slate-500">
                납부 마감일:{" "}
                <span className="font-medium text-slate-700">{t.dueDate}</span>
              </div>

              {t.paidAt && (
                <div className="text-slate-500">
                  납부일:{" "}
                  <span className="font-medium text-slate-700">{t.paidAt}</span>
                </div>
              )}
            </div>

            {/* 버튼 */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                onClick={() => alert("영수증 다운로드 (연결 예정)")}
              >
                영수증
              </button>

              {t.status !== "PAID" && (
                <button
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  onClick={() => alert("납부 페이지 연결 예정")}
                >
                  납부 안내
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TuitionBillView;

const money = (v) =>
  v.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });

/** 더미 데이터 (학생용) */
const TUITION_SEED = [
  {
    id: 1,
    semester: "2025-1학기",
    tuition: 3800000,
    scholarship: 800000,
    payable: 3000000,
    status: "PAID", // PAID | UNPAID | PARTIAL
    dueDate: "2025-03-10",
    paidAt: "2025-03-05",
  },
  {
    id: 2,
    semester: "2025-2학기",
    tuition: 3800000,
    scholarship: 500000,
    payable: 3300000,
    status: "UNPAID",
    dueDate: "2025-09-05",
    paidAt: null,
  },
];
