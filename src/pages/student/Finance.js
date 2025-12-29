// src/pages/studentmanagement/StudentFinanceScholarshipDashboard.jsx
import React, { useState } from "react";
import TuitionBillView from "../../components/features/finance/TuitionBillView";
import ScholarshipHistory from "../../components/features/finance/ScholarshipHistory";

/* =========================
   Modal Types (학생용)
========================= */
const modalTypes = {
  TUITION_BILL: "TUITION_BILL",
  SCHOLARSHIP_HISTORY: "SCHOLARSHIP_HISTORY",
};

/* =========================
   Main Dashboard
========================= */
export default function StudentFinanceScholarshipDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          재무 · 장학 조회
        </h1>
        <p className="text-sm text-slate-500">
          등록금 납부 현황과 장학금 수혜 내역을 확인합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===============================
            중분류 1: 등록금
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Tuition"
            tagColor="teal"
            title="등록금 고지"
            description="등록금 고지서 및 납부 상태를 확인합니다."
            badge="Payment"
            badgeColor="teal"
          />

          <div className="space-y-3">
            <DashboardButton
              label="등록금 고지서 확인"
              description="납부 금액 및 납부 상태를 확인합니다."
              onClick={() => setActiveModal(modalTypes.TUITION_BILL)}
            />
          </div>
        </section>

        {/* ===============================
            중분류 2: 장학금
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Scholarship"
            tagColor="fuchsia"
            title="장학 내역"
            description="수혜한 장학금 내역을 확인합니다."
            badge="Support"
            badgeColor="fuchsia"
          />

          <div className="space-y-3">
            <DashboardButton
              label="장학 내역 조회"
              description="장학금 유형 및 수혜 금액을 확인합니다."
              onClick={() => setActiveModal(modalTypes.SCHOLARSHIP_HISTORY)}
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
        <span className="text-[10px] text-slate-400">View</span>
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
    case modalTypes.TUITION_BILL:
      return {
        title: "등록금 고지서 확인",
        subtitle: "TuitionPayment",
        // hint: "학기별 고지 금액, 납부 상태(PAID / UNPAID), 납부 일자 표시를 추천합니다.",
        content: <TuitionBillView />,
      };

    case modalTypes.SCHOLARSHIP_HISTORY:
      return {
        title: "장학 내역 조회",
        subtitle: "ScholarshipHistory",
        // hint: "장학금 유형, 수혜 학기, 지급 금액 테이블 구성을 추천합니다.",
        content: <ScholarshipHistory />,
      };
  }
}
