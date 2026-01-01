import React, { useState } from "react";

/* ================= 유틸 ================= */
const money = (v) =>
  v.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });

const bankName = (code) => {
  if (code === "KB") return "국민은행";
  if (code === "SH") return "신한은행";
  if (code === "WR") return "우리은행";
  if (code === "HN") return "하나은행";
  return "";
};

/* ================= 가짜 영수증 다운로드 ================= */
const downloadFakeReceipt = (semester, amount) => {
  const content = `
○○대학교 등록금 영수증

학기: ${semester}
납부 금액: ${money(amount)}
결제 상태: 납부 완료
결제 일자: ${new Date().toLocaleDateString()}

(가상 테스트 파일)
`;
  const blob = new Blob([content], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${semester}_등록금_영수증.pdf`;
  a.click();

  URL.revokeObjectURL(url);
};

/* ================= 메인 컴포넌트 ================= */
const TuitionBillView = () => {
  /** 🔥 등록금 목록을 state로 */
  const [tuitions, setTuitions] = useState(TUITION_SEED);

  const [selected, setSelected] = useState(null);
  const [paymentStep, setPaymentStep] = useState("READY");
  const [method, setMethod] = useState("");
  const [bank, setBank] = useState("");
  const [rawCardNumber, setRawCardNumber] = useState("");

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 16);
    setRawCardNumber(input);
  };

  const startPayment = () => {
    if (method === "BANK") {
      setPaymentStep("WAITING");
      return;
    }

    setPaymentStep("WAITING");
    setTimeout(() => setPaymentStep("PROCESSING"), 1000);
    setTimeout(() => setPaymentStep("DONE"), 2500);
  };

  /** ✅ 결제 완료 반영 + 모달 닫기 */
  const closeModal = () => {
    if (paymentStep === "DONE" && selected) {
      setTuitions((prev) =>
        prev.map((t) =>
          t.id === selected.id ? { ...t, status: "PAID" } : t
        )
      );
    }

    setSelected(null);
    setPaymentStep("READY");
    setMethod("");
    setBank("");
    setRawCardNumber("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">등록금 관리</h2>

      <div className="space-y-3">
        {tuitions.map((t) => (
          <div key={t.id} className="rounded-2xl border p-4 bg-slate-50">
            <div className="flex justify-between">
              <h3 className="font-semibold">{t.semester}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  t.status === "PAID"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {t.status === "PAID" ? "납부 완료" : "미납"}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 text-sm gap-y-1">
              <div>등록금</div>
              <div className="text-right">{money(t.tuition)}</div>
              <div>장학금</div>
              <div className="text-right text-emerald-600">
                − {money(t.scholarship)}
              </div>
              <div className="font-semibold">납부 금액</div>
              <div className="text-right font-bold">{money(t.payable)}</div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              {t.status === "PAID" && (
                <button
                  className="border px-4 py-2 rounded-xl text-sm"
                  onClick={() => downloadFakeReceipt(t.semester, t.payable)}
                >
                  영수증
                </button>
              )}

              {t.status !== "PAID" && (
                <button
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm"
                  onClick={() => setSelected(t)}
                >
                  납부 안내
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= 결제 모달 ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <h3 className="font-bold mb-4">{selected.semester} 등록금 납부</h3>

            {paymentStep === "READY" && (
              <>
                <div className="space-y-2 mb-4">
                  {["CARD", "BANK", "VIRTUAL"].map((m) => (
                    <label key={m} className="block border rounded-xl p-3">
                      <input
                        type="radio"
                        checked={method === m}
                        onChange={() => setMethod(m)}
                        className="mr-2"
                      />
                      {m === "CARD" && "카드 결제"}
                      {m === "BANK" && "계좌 이체"}
                      {m === "VIRTUAL" && "가상 계좌"}
                    </label>
                  ))}
                </div>

                {method === "CARD" && (
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="카드 번호"
                    value={rawCardNumber}
                    onChange={handleCardNumberChange}
                  />
                )}

                {method === "BANK" && (
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    <option value="">은행 선택</option>
                    <option value="KB">국민은행</option>
                    <option value="SH">신한은행</option>
                    <option value="WR">우리은행</option>
                    <option value="HN">하나은행</option>
                  </select>
                )}

                <button
                  onClick={startPayment}
                  disabled={!method || (method === "BANK" && !bank)}
                  className="mt-4 w-full bg-slate-900 text-white py-2 rounded-xl"
                >
                  결제 진행
                </button>
              </>
            )}

            {paymentStep === "PROCESSING" && (
              <div className="text-center py-8">결제 진행중…</div>
            )}

            {paymentStep === "DONE" && (
              <div className="text-center py-8 text-emerald-600 font-bold">
                결제가 완료되었습니다 🎉
              </div>
            )}

            <button
              onClick={closeModal}
              className="mt-6 w-full border rounded-xl py-2"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionBillView;

/* ================= 더미 데이터 ================= */
const TUITION_SEED = [
  {
    id: 1,
    semester: "2025-1학기",
    tuition: 3800000,
    scholarship: 800000,
    payable: 3000000,
    status: "PAID",
  },
  {
    id: 2,
    semester: "2025-2학기",
    tuition: 3800000,
    scholarship: 500000,
    payable: 3300000,
    status: "UNPAID",
  },
];
