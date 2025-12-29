// src/pages/adminmanagement/AdminFinanceDashboard.jsx
import React, { useState } from "react";
import TuitionManage from "../../components/features/finance/TuitionManage";
import ScholarshipTypeManage from "../../components/features/finance/ScholarshipTypeManage";
import ScholarshipAssign from "../../components/features/finance/ScholarshipAssign";

/* =========================
   Modal Types (관리자용)
========================= */
const modalTypes = {
  TUITION_MANAGE: "TUITION_MANAGE",

  SCHOLARSHIP_TYPE: "SCHOLARSHIP_TYPE",
  SCHOLARSHIP_ASSIGN: "SCHOLARSHIP_ASSIGN",
};

/* =========================
   Main Dashboard
========================= */
export default function AdminFinanceDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">재무 관리</h1>
        <p className="text-sm text-slate-500">
          등록금 고지 및 장학금 지급을 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===============================
            중분류 1: 등록금 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Tuition"
            tagColor="teal"
            title="등록금 관리"
            description="학생별 등록금을 책정하고 고지합니다."
            badge="Finance"
            badgeColor="teal"
          />

          <DashboardButton
            label="등록금 책정 및 고지"
            description="학생/학기별 등록금을 고지합니다."
            onClick={() => setActiveModal(modalTypes.TUITION_MANAGE)}
          />
        </section>

        {/* ===============================
            중분류 2: 장학금 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Scholarship"
            tagColor="fuchsia"
            title="장학금 관리"
            description="장학금 종류 및 수여 내역을 관리합니다."
            badge="Support"
            badgeColor="fuchsia"
          />

          <div className="space-y-3">
            <DashboardButton
              label="장학금 종류 관리"
              description="장학금 유형을 등록 및 수정합니다."
              onClick={() => setActiveModal(modalTypes.SCHOLARSHIP_TYPE)}
            />
            <DashboardButton
              label="장학금 수여"
              description="학생에게 장학금을 수여합니다."
              onClick={() => setActiveModal(modalTypes.SCHOLARSHIP_ASSIGN)}
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
    teal: "text-teal-500",
    fuchsia: "text-fuchsia-500",
  };

  const badgeColorMap = {
    teal: "text-teal-500 bg-teal-50",
    fuchsia: "text-fuchsia-500 bg-fuchsia-50",
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p
          className={`text-xs font-semibold uppercase ${tagColorMap[tagColor]}`}
        >
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

  const { title, subtitle, hint, content } = renderModalContent(activeModal);

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

        <div className="rounded-xl border border-dashed p-4 text-xs text-slate-500">
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
        title: "등록금 책정 및 고지",
        subtitle: "TuitionPayment",
        // hint: "학생/학기 선택 → 등록금 금액 입력 → 납부 상태(PAID/UNPAID) 관리 UI를 추천합니다.",
        content: <TuitionManage />,
      };

    case modalTypes.SCHOLARSHIP_TYPE:
      return {
        title: "장학금 종류 관리",
        subtitle: "Scholarship",
        // hint: "장학금명, 지급 기준, 금액/비율 설정 UI를 추천합니다.",
        content: <ScholarshipTypeManage />,
      };

    case modalTypes.SCHOLARSHIP_ASSIGN:
      return {
        title: "장학금 수여",
        subtitle: "ScholarshipHistory",
        // hint: "학생 선택 → 장학금 선택 → 수여 금액 및 이력 관리 UI를 추천합니다.",
        content: <ScholarshipAssign />,
      };

    default:
      return {
        title: "재무 관리",
        subtitle: "",
        hint: "",
      };
  }
}
