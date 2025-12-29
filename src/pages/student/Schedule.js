// src/pages/studentmanagement/ScheduleFinanceDashboard.jsx
import React, { useState } from "react";
import AcademicCalendarView from "../../components/features/schedule/AcademicCalendarView";
import TuitionPaymentCheck from "../../components/features/finance/TuitionPaymentCheck";
import ScholarshipPaymentHistory from "../../components/features/scholarship/ScholarshipPaymentHistory";

/* =========================
   Modal Types (소분류)
========================= */
const modalTypes = {
  ACADEMIC_CALENDAR: "ACADEMIC_CALENDAR",
  TUITION_PAYMENT_CHECK: "TUITION_PAYMENT_CHECK",
  SCHOLARSHIP_PAYMENT_HISTORY: "SCHOLARSHIP_PAYMENT_HISTORY",
};

/* =========================
   Main Dashboard
========================= */
export default function ScheduleFinanceDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          일정 · 재정 관리
        </h1>
        <p className="text-sm text-slate-500">
          학사 일정과 등록금·장학금 내역을 확인합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-1">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Schedule & Finance"
            tagColor="violet"
            title="일정 · 재정 조회"
            description="학사 일정과 재정 정보를 한눈에 확인합니다."
            badge="Student"
            badgeColor="violet"
          />

          <div className="space-y-3">
            <DashboardButton
              label="학사 일정 확인"
              description="학기 일정, 수강신청·시험·휴강 일정을 확인합니다."
              onClick={() =>
                setActiveModal(modalTypes.ACADEMIC_CALENDAR)
              }
            />
            <DashboardButton
              label="등록금 납부 확인"
              description="등록금 납부 여부와 상세 내역을 조회합니다."
              onClick={() =>
                setActiveModal(modalTypes.TUITION_PAYMENT_CHECK)
              }
            />
            <DashboardButton
              label="장학금 지급 내역 확인"
              description="장학금 지급 금액과 지급 이력을 확인합니다."
              onClick={() =>
                setActiveModal(modalTypes.SCHOLARSHIP_PAYMENT_HISTORY)
              }
            />
          </div>
        </section>
      </div>

      {/* ===== 공통 모달 ===== */}
      <DashboardModal activeModal={activeModal} onClose={closeModal} />
    </div>
  );
}

/* =========================
   Section Header
========================= */
function SectionHeader({
  tag,
  tagColor,
  title,
  description,
  badge,
  badgeColor,
}) {
  const tagColorMap = {
    violet: "text-violet-500",
  };

  const badgeColorMap = {
    violet: "text-violet-500 bg-violet-50",
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className={`text-xs font-semibold uppercase ${tagColorMap[tagColor]}`}>
          {tag}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs ${badgeColorMap[badgeColor]}`}
      >
        {badge}
      </span>
    </div>
  );
}

/* =========================
   Dashboard Button
========================= */
function DashboardButton({ label, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm hover:bg-white hover:shadow-sm"
    >
      <div className="flex justify-between">
        <span className="font-medium text-slate-800">{label}</span>
        <span className="text-[10px] text-slate-400">Open</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </button>
  );
}

/* =========================
   Dashboard Modal
========================= */
function DashboardModal({ activeModal, onClose }) {
  if (!activeModal) return null;

  const { title, subtitle, content } = renderModalContent(activeModal);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="rounded-xl border border-dashed p-4">
          {content}
        </div>
      </div>
    </div>
  );
}

/* =========================
   Modal Resolver
========================= */
function renderModalContent(activeModal) {
  switch (activeModal) {
    case modalTypes.ACADEMIC_CALENDAR:
      return {
        title: "학사 일정",
        subtitle: "Academic Calendar",
        content: <AcademicCalendarView />,
      };
    case modalTypes.TUITION_PAYMENT_CHECK:
      return {
        title: "등록금 납부 확인",
        subtitle: "Tuition Payment",
        content: <TuitionPaymentCheck />,
      };
    case modalTypes.SCHOLARSHIP_PAYMENT_HISTORY:
      return {
        title: "장학금 지급 내역",
        subtitle: "Scholarship Payment",
        content: <ScholarshipPaymentHistory />,
      };
    default:
      return {};
  }
}
