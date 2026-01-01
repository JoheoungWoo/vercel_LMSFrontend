// src/components/student/TuitionPaymentStatusComponent.jsx
import React from "react";

export default function TuitionPaymentStatusComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 요약 영역 ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          title="총 등록금"
          value="4,200,000원"
          sub="2025년 1학기"
        />
        <SummaryCard
          title="납부 금액"
          value="4,200,000원"
          sub="전액 납부"
          highlight
        />
        <SummaryCard
          title="미납 금액"
          value="0원"
          sub="잔여 없음"
        />
      </div>

      {/* ===== 납부 내역 테이블 ===== */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                학기
              </th>
              <th className="px-4 py-3 text-left font-medium">
                납부 구분
              </th>
              <th className="px-4 py-3 text-right font-medium">
                금액
              </th>
              <th className="px-4 py-3 text-center font-medium">
                상태
              </th>
              <th className="px-4 py-3 text-left font-medium">
                납부일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <PaymentRow
              semester="2025-1학기"
              type="등록금"
              amount="4,200,000원"
              status="PAID"
              date="2025-02-15"
            />
            <PaymentRow
              semester="2024-2학기"
              type="등록금"
              amount="4,100,000원"
              status="PAID"
              date="2024-08-20"
            />
          </tbody>
        </table>
      </div>

      {/* ===== 안내 문구 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>등록금 납부 완료 시 상태가 <b>납부 완료</b>로 표시됩니다.</li>
          <li>미납 내역이 있는 경우 학사 일정에 제한이 있을 수 있습니다.</li>
          <li>문의: 학사행정팀 (02-0000-0000)</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================
   요약 카드
========================= */
function SummaryCard({ title, value, sub, highlight }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-teal-200 bg-teal-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-xs font-medium text-slate-500">
        {title}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {sub}
      </p>
    </div>
  );
}

/* =========================
   테이블 Row
========================= */
function PaymentRow({
  semester,
  type,
  amount,
  status,
  date,
}) {
  const statusMap = {
    PAID: {
      label: "납부 완료",
      className: "bg-green-100 text-green-700",
    },
    UNPAID: {
      label: "미납",
      className: "bg-red-100 text-red-700",
    },
    PARTIAL: {
      label: "부분 납부",
      className: "bg-yellow-100 text-yellow-700",
    },
  };

  return (
    <tr className="bg-white">
      <td className="px-4 py-3">
        {semester}
      </td>
      <td className="px-4 py-3">
        {type}
      </td>
      <td className="px-4 py-3 text-right">
        {amount}
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusMap[status].className}`}
        >
          {statusMap[status].label}
        </span>
      </td>
      <td className="px-4 py-3">
        {date}
      </td>
    </tr>
  );
}
