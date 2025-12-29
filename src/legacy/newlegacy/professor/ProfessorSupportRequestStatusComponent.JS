// src/components/professor/ProfessorSupportRequestStatusComponent.jsx
import React from "react";

export default function ProfessorSupportRequestStatusComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 필터 ===== */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <FilterSelect
            label="요청 유형"
            options={[
              "전체",
              "일반 지원",
              "IT 지원",
              "시설 지원",
            ]}
          />
          <FilterSelect
            label="처리 상태"
            options={[
              "전체",
              "접수",
              "처리 중",
              "완료",
              "반려",
            ]}
          />
        </div>
      </div>

      {/* ===== 요청 리스트 ===== */}
      <div className="space-y-3">
        <SupportRequestCard
          type="IT 지원"
          title="LMS 로그인 오류 발생"
          date="2025-04-12"
          status="IN_PROGRESS"
          handler="정보전산팀"
        />

        <SupportRequestCard
          type="시설 지원"
          title="강의실 냉방 작동 불량"
          date="2025-04-10"
          status="COMPLETED"
          handler="시설관리팀"
        />

        <SupportRequestCard
          type="일반 지원"
          title="강의 보강 일정 관련 문의"
          date="2025-04-08"
          status="RECEIVED"
          handler="학사팀"
        />
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 요청 처리 현황 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>요청은 접수 → 처리 중 → 완료 단계로 진행됩니다.</li>
          <li>반려된 요청은 사유를 확인 후 재요청 가능합니다.</li>
          <li>완료된 요청은 수정할 수 없습니다.</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================
   요청 카드
========================= */
function SupportRequestCard({
  type,
  title,
  date,
  status,
  handler,
}) {
  const statusMap = {
    RECEIVED: {
      label: "접수",
      color: "bg-slate-200 text-slate-700",
    },
    IN_PROGRESS: {
      label: "처리 중",
      color: "bg-blue-100 text-blue-700",
    },
    COMPLETED: {
      label: "완료",
      color: "bg-green-100 text-green-700",
    },
    REJECTED: {
      label: "반려",
      color: "bg-red-100 text-red-700",
    },
  };

  const current = statusMap[status];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
              {type}
            </span>
            <p className="text-sm font-semibold text-slate-800">
              {title}
            </p>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            요청일: {date}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            담당 부서: {handler}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${current.color}`}
        >
          {current.label}
        </span>
      </div>
    </div>
  );
}

/* =========================
   필터 셀렉트
========================= */
function FilterSelect({ label, options }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600">
        {label}
      </label>
      <select className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
