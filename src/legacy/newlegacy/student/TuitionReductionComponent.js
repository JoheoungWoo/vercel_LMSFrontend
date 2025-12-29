// src/components/student/TuitionReductionComponent.jsx
import React from "react";

export default function TuitionReductionComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 상단 요약 ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          title="총 등록금"
          value="4,200,000원"
          sub="2025년 1학기"
        />
        <SummaryCard
          title="감면 금액"
          value="1,200,000원"
          sub="학비 지원 포함"
          highlight
        />
        <SummaryCard
          title="실 납부 금액"
          value="3,000,000원"
          sub="감면 적용 후"
        />
      </div>

      {/* ===== 감면 항목 목록 ===== */}
      <div className="space-y-3">
        <ReductionItem
          title="국가장학금 연계 감면"
          description="국가장학금 수혜에 따른 등록금 감면"
          amount="-800,000원"
          status="APPLIED"
        />

        <ReductionItem
          title="저소득층 학비 지원 감면"
          description="소득분위 기준 충족 시 자동 적용"
          amount="-400,000원"
          status="APPLIED"
        />

        <ReductionItem
          title="특별 지원 감면"
          description="개별 심사 후 적용"
          amount="-"
          status="PENDING"
        />
      </div>

      {/* ===== 안내 문구 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 학비 감면 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>학비 감면은 장학금 및 지원 기준에 따라 자동 또는 심사 적용됩니다.</li>
          <li>감면 항목은 등록금 고지서에 반영됩니다.</li>
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
          ? "border-blue-200 bg-blue-50"
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
   감면 항목
========================= */
function ReductionItem({
  title,
  description,
  amount,
  status,
}) {
  const statusMap = {
    APPLIED: {
      label: "적용 완료",
      badge: "bg-green-100 text-green-700",
    },
    PENDING: {
      label: "심사 중",
      badge: "bg-yellow-100 text-yellow-700",
    },
    REJECTED: {
      label: "미적용",
      badge: "bg-red-100 text-red-700",
    },
  };

  return (
    <div className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusMap[status].badge}`}
          >
            {statusMap[status].label}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <p className="text-sm font-semibold text-slate-800">
        {amount}
      </p>
    </div>
  );
}
