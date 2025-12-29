// src/pages/studentmanagement/CertificateRecordDashboard.jsx
import React, { useState } from "react";
import CertificateIssue from "../../components/features/certificate/CertificateIssue";
import TuitionInvoice from "../../components/features/finance/TuitionInvoice";
import TuitionPaymentStatus from "../../components/features/finance/TuitionPaymentStatus";
import ScholarshipEligibility from "../../components/features/scholarship/ScholarshipEligibility";
import ScholarshipApply from "../../components/features/scholarship/ScholarshipApply";

/* =========================
   Modal Types (소분류)
========================= */
const modalTypes = {
  CERTIFICATE_ISSUE: "CERTIFICATE_ISSUE",
  TUITION_INVOICE: "TUITION_INVOICE",
  TUITION_PAYMENT_STATUS: "TUITION_PAYMENT_STATUS",
  SCHOLARSHIP_ELIGIBILITY: "SCHOLARSHIP_ELIGIBILITY",
  SCHOLARSHIP_APPLY: "SCHOLARSHIP_APPLY",
  APPEAL_HISTORY: "APPEAL_HISTORY",
};

/* =========================
   Main Dashboard
========================= */
export default function CertificateRecordDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          증명 · 기록 관리
        </h1>
        <p className="text-sm text-slate-500">
          증명서 발급, 등록금·장학금, 이의 신청 내역을 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-1">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Certificate & Records"
            tagColor="sky"
            title="증명 · 재정 · 이의 기록"
            description="공식 증명서와 재정·신청 이력을 관리합니다."
            badge="Student"
            badgeColor="sky"
          />

          <div className="space-y-3">
            <DashboardButton
              label="증명서 발급"
              description="재학·성적·졸업 증명서를 발급합니다."
              onClick={() => setActiveModal(modalTypes.CERTIFICATE_ISSUE)}
            />
            <DashboardButton
              label="등록금 고지서"
              description="학기별 등록금 고지서를 확인합니다."
              onClick={() => setActiveModal(modalTypes.TUITION_INVOICE)}
            />
            <DashboardButton
              label="등록금 납부 현황"
              description="등록금 납부 여부 및 이력을 조회합니다."
              onClick={() => setActiveModal(modalTypes.TUITION_PAYMENT_STATUS)}
            />
            <DashboardButton
              label="장학금 가능 여부"
              description="신청 가능한 장학금 여부를 확인합니다."
              onClick={() => setActiveModal(modalTypes.SCHOLARSHIP_ELIGIBILITY)}
            />
            <DashboardButton
              label="장학금 신청"
              description="장학금을 신청하고 진행 상태를 확인합니다."
              onClick={() => setActiveModal(modalTypes.SCHOLARSHIP_APPLY)}
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
    sky: "text-sky-500",
  };

  const badgeColorMap = {
    sky: "text-sky-500 bg-sky-50",
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

        <div className="rounded-xl border border-dashed p-4">{content}</div>
      </div>
    </div>
  );
}

/* =========================
   Modal Resolver
========================= */
function renderModalContent(activeModal) {
  switch (activeModal) {
    case modalTypes.CERTIFICATE_ISSUE:
      return {
        title: "증명서 발급",
        subtitle: "Certificate",
        content: <CertificateIssue />,
      };
    case modalTypes.TUITION_INVOICE:
      return {
        title: "등록금 고지서",
        subtitle: "Tuition Invoice",
        content: <TuitionInvoice />,
      };
    case modalTypes.TUITION_PAYMENT_STATUS:
      return {
        title: "등록금 납부 현황",
        subtitle: "Payment Status",
        content: <TuitionPaymentStatus />,
      };
    case modalTypes.SCHOLARSHIP_ELIGIBILITY:
      return {
        title: "장학금 가능 여부",
        subtitle: "Scholarship Eligibility",
        content: <ScholarshipEligibility />,
      };
    case modalTypes.SCHOLARSHIP_APPLY:
      return {
        title: "장학금 신청",
        subtitle: "Scholarship Application",
        content: <ScholarshipApply />,
      };
    default:
      return {};
  }
}
