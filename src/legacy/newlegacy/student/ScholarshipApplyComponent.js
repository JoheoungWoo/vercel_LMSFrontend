// src/components/student/ScholarshipApplyComponent.jsx
import React from "react";

export default function ScholarshipApplyComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 상단 안내 ===== */}
      <div className="rounded-lg bg-indigo-50 p-4 text-xs text-indigo-700">
        <p className="font-semibold">📢 장학금 신청 안내</p>
        <p className="mt-1 leading-relaxed">
          신청 가능한 장학금만 표시됩니다.  
          신청 기간 및 조건을 반드시 확인하세요.
        </p>
      </div>

      {/* ===== 신청 가능 장학금 목록 ===== */}
      <div className="space-y-3">
        <ScholarshipApplyItem
          title="성적우수 장학금"
          period="2025-03-01 ~ 2025-03-15"
          condition="직전 학기 평점 4.0 이상"
          amount="등록금의 50%"
          status="AVAILABLE"
        />

        <ScholarshipApplyItem
          title="국가장학금 (Ⅰ유형)"
          period="2025-02-01 ~ 2025-03-20"
          condition="소득분위 기준 충족"
          amount="소득분위별 차등"
          status="AVAILABLE"
        />

        <ScholarshipApplyItem
          title="근로 장학금"
          period="신청 기간 종료"
          condition="교내 근로 가능자"
          amount="시간당 지급"
          status="CLOSED"
        />
      </div>

      {/* ===== 하단 주의 사항 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          ⚠️ 유의사항
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>장학금 중복 수혜 여부는 내부 기준에 따릅니다.</li>
          <li>신청 후에는 취소가 제한될 수 있습니다.</li>
          <li>문의: 학생지원팀 (02-0000-0000)</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================
   장학금 신청 아이템
========================= */
function ScholarshipApplyItem({
  title,
  period,
  condition,
  amount,
  status,
}) {
  const statusMap = {
    AVAILABLE: {
      label: "신청 가능",
      badge: "bg-green-100 text-green-700",
      button:
        "bg-slate-900 text-white hover:bg-slate-800",
      disabled: false,
    },
    CLOSED: {
      label: "신청 종료",
      badge: "bg-slate-200 text-slate-600",
      button:
        "bg-slate-200 text-slate-400 cursor-not-allowed",
      disabled: true,
    },
  };

  const current = statusMap[status];

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${current.badge}`}
          >
            {current.label}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          신청 기간: {period}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          조건: {condition}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          지급 금액: {amount}
        </p>
      </div>

      <button
        type="button"
        disabled={current.disabled}
        className={`rounded-lg px-4 py-2 text-xs font-medium transition ${current.button}`}
      >
        신청하기
      </button>
    </div>
  );
}
