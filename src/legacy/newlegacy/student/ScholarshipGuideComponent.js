// src/components/student/ScholarshipGuideComponent.jsx
import React from "react";

export default function ScholarshipGuideComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 요약 영역 ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          title="총 장학금 종류"
          value="6종"
          sub="교내 · 교외 포함"
        />
        <SummaryCard
          title="신청 가능 장학금"
          value="3종"
          sub="현재 학기 기준"
          highlight
        />
        <SummaryCard
          title="최근 지급일"
          value="2025-03-05"
          sub="성적우수 장학금"
        />
      </div>

      {/* ===== 장학금 목록 ===== */}
      <div className="space-y-3">
        <ScholarshipItem
          title="성적우수 장학금"
          target="직전 학기 성적 우수자"
          amount="등록금의 50%"
          status="AVAILABLE"
        />
        <ScholarshipItem
          title="국가장학금 (Ⅰ유형)"
          target="소득분위 기준 충족자"
          amount="소득분위별 차등"
          status="AVAILABLE"
        />
        <ScholarshipItem
          title="근로 장학금"
          target="교내 근로 참여 학생"
          amount="시간당 지급"
          status="CLOSED"
        />
      </div>

      {/* ===== 안내 문구 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 장학금 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>장학금 신청 기간은 학기별로 상이할 수 있습니다.</li>
          <li>국가장학금은 한국장학재단 신청이 필요합니다.</li>
          <li>문의: 학생지원팀 (02-0000-0000)</li>
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
          ? "border-indigo-200 bg-indigo-50"
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
   장학금 아이템
========================= */
function ScholarshipItem({ title, target, amount, status }) {
  const statusMap = {
    AVAILABLE: {
      label: "신청 가능",
      className: "bg-green-100 text-green-700",
    },
    CLOSED: {
      label: "신청 종료",
      className: "bg-slate-200 text-slate-600",
    },
    UPCOMING: {
      label: "예정",
      className: "bg-yellow-100 text-yellow-700",
    },
  };

  return (
    <div className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          대상: {target}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          지급 금액: {amount}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${statusMap[status].className}`}
      >
        {statusMap[status].label}
      </span>
    </div>
  );
}
