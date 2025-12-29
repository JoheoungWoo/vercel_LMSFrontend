// src/components/student/SupportHistoryComponent.jsx
import React from "react";

export default function SupportHistoryComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 상단 요약 ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          title="총 지원 건수"
          value="5건"
          sub="전체 학기 기준"
        />
        <SummaryCard
          title="적용 완료"
          value="3건"
          sub="지급 또는 감면 완료"
          highlight
        />
        <SummaryCard
          title="진행 중"
          value="1건"
          sub="심사 중"
        />
      </div>

      {/* ===== 지원 내역 테이블 ===== */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                학기
              </th>
              <th className="px-4 py-3 text-left font-medium">
                지원 구분
              </th>
              <th className="px-4 py-3 text-left font-medium">
                지원 명칭
              </th>
              <th className="px-4 py-3 text-right font-medium">
                금액
              </th>
              <th className="px-4 py-3 text-center font-medium">
                상태
              </th>
              <th className="px-4 py-3 text-left font-medium">
                처리일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <SupportRow
              semester="2025-1학기"
              category="장학금"
              name="성적우수 장학금"
              amount="2,100,000원"
              status="COMPLETED"
              date="2025-03-05"
            />
            <SupportRow
              semester="2025-1학기"
              category="학비 감면"
              name="저소득층 학비 지원"
              amount="400,000원"
              status="COMPLETED"
              date="2025-02-28"
            />
            <SupportRow
              semester="2025-1학기"
              category="학비 감면"
              name="특별 지원 감면"
              amount="-"
              status="IN_PROGRESS"
              date="-"
            />
            <SupportRow
              semester="2024-2학기"
              category="장학금"
              name="국가장학금 (Ⅰ유형)"
              amount="1,800,000원"
              status="COMPLETED"
              date="2024-09-10"
            />
          </tbody>
        </table>
      </div>

      {/* ===== 안내 문구 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 지원 내역 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>지원 내역은 최근 학기부터 순서대로 표시됩니다.</li>
          <li>심사 중인 내역은 처리 완료 후 반영됩니다.</li>
          <li>문의: 재정지원팀 (02-0000-0000)</li>
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
          ? "border-emerald-200 bg-emerald-50"
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
function SupportRow({
  semester,
  category,
  name,
  amount,
  status,
  date,
}) {
  const statusMap = {
    COMPLETED: {
      label: "처리 완료",
      className: "bg-green-100 text-green-700",
    },
    IN_PROGRESS: {
      label: "심사 중",
      className: "bg-yellow-100 text-yellow-700",
    },
    REJECTED: {
      label: "미적용",
      className: "bg-red-100 text-red-700",
    },
  };

  return (
    <tr className="bg-white">
      <td className="px-4 py-3">
        {semester}
      </td>
      <td className="px-4 py-3">
        {category}
      </td>
      <td className="px-4 py-3">
        {name}
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
