// src/pages/adminmanagement/ManagementDashboard.jsx
import React, { useState } from "react";
import TuitionManagement from "../../components/features/management/TuitionManagement";
import ScholarshipManagement from "../../components/features/management/ScholarshipManagement";
import ExamScheduleManagement from "../../components/features/management/ExamScheduleManagement";

/* =========================
   Modal Types (소분류)
========================= */
const modalTypes = {
  TUITION_MANAGE: "TUITION_MANAGE",
  SCHOLARSHIP_MANAGE: "SCHOLARSHIP_MANAGE",
  EXAM_SCHEDULE_MANAGE: "EXAM_SCHEDULE_MANAGE",
};

/* =========================
   Main Dashboard
========================= */
export default function ManagementDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          관리
        </h1>
        <p className="text-sm text-slate-500">
          등록금, 장학금, 시험 일정을 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-1">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Administration"
            tagColor="emerald"
            title="재정 · 시험 관리"
            description="학사 운영에 필요한 재정 및 시험 일정을 관리합니다."
            badge="Admin"
            badgeColor="emerald"
          />

          <div className="space-y-3">
            <DashboardButton
              label="등록금 관리"
              description="학기별 등록금 및 납부 상태를 관리합니다."
              onClick={() => setActiveModal(modalTypes.TUITION_MANAGE)}
            />
            <DashboardButton
              label="장학금 관리"
              description="장학금 유형, 지급 기준 및 수혜자를 관리합니다."
              onClick={() => setActiveModal(modalTypes.SCHOLARSHIP_MANAGE)}
            />
            <DashboardButton
              label="시험 일정 관리"
              description="중간·기말 시험 일정을 등록 및 수정합니다."
              onClick={() =>
                setActiveModal(modalTypes.EXAM_SCHEDULE_MANAGE)
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
    emerald: "text-emerald-500",
  };

  const badgeColorMap = {
    emerald: "text-emerald-500 bg-emerald-50",
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
    case modalTypes.TUITION_MANAGE:
      return {
        title: "등록금 관리",
        subtitle: "Tuition · Payment",
        content: <TuitionManagement />,
      };
    case modalTypes.SCHOLARSHIP_MANAGE:
      return {
        title: "장학금 관리",
        subtitle: "Scholarship",
        content: <ScholarshipManagement />,
      };
    case modalTypes.EXAM_SCHEDULE_MANAGE:
      return {
        title: "시험 일정 관리",
        subtitle: "Exam Schedule",
        content: <ExamScheduleManagement />,
      };
    default:
      return {};
  }
}
