// src/pages/studentmanagement/StudentUserDashboard.jsx
import React, { useState } from "react";
import MyInfo from "../../components/features/user/MyInfo";
import PasswordManage from "../../components/features/user/PasswordManage";
import StudentStatusApproval from "../../components/features/user/StudentStatusApproval";

/* =========================
   Modal Types (학생용)
========================= */
const modalTypes = {
  MY_INFO: "MY_INFO",
  PASSWORD_CHANGE: "PASSWORD_CHANGE",

  LEAVE_REQUEST: "LEAVE_REQUEST",
  RETURN_REQUEST: "RETURN_REQUEST",
  STATUS_HISTORY: "STATUS_HISTORY",
};

/* =========================
   Main Dashboard
========================= */
export default function StudentUserDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          개인 · 행정 관리
        </h1>
        <p className="text-sm text-slate-500">
          내 정보 관리 및 학적 변동 신청을 진행합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===============================
            중분류 1: 내 정보
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="User"
            tagColor="teal"
            title="내 정보 관리"
            description="개인정보 및 계정 정보를 관리합니다."
            badge="Profile"
            badgeColor="teal"
          />

          <div className="space-y-3">
            <DashboardButton
              label="내 정보 조회"
              description="개인정보를 확인합니다."
              onClick={() => setActiveModal(modalTypes.MY_INFO)}
            />
            <DashboardButton
              label="비밀번호 변경"
              description="계정 비밀번호를 변경합니다."
              onClick={() => setActiveModal(modalTypes.PASSWORD_CHANGE)}
            />
          </div>
        </section>

        {/* ===============================
            중분류 2: 학적 변동
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Academic Status"
            tagColor="fuchsia"
            title="학적 변동 신청"
            description="휴학 및 복학 신청을 관리합니다."
            badge="Request"
            badgeColor="fuchsia"
          />

          <div className="space-y-3">
            <DashboardButton
              label="학적 변동 처리"
              description="학작 변동 신청 및 처리 상태를 확인합니다."
              onClick={() => setActiveModal(modalTypes.STATUS_HISTORY)}
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
    case modalTypes.MY_INFO:
      return {
        title: "내 정보 조회",
        subtitle: "User",
        // hint: "이메일, 이름, 학번 등 기본 정보 표시를 추천합니다.",
        hint: "",
        content: <MyInfo />,
      };

    case modalTypes.PASSWORD_CHANGE:
      return {
        title: "비밀번호 변경",
        subtitle: "User",
        // hint: "현재 비밀번호 검증 + 새 비밀번호 규칙 안내를 추천합니다.",
        hint: "",
        content: <PasswordManage />,
      };

    // 휴학 : StudentStatusHistory
    // 복학 : ReturnRequest
    case modalTypes.STATUS_HISTORY:
      return {
        title: "학적 변동 처리 내역",
        subtitle: "StudentStatusHistory",
        // hint: "신청 유형, 처리 상태, 승인 일자 테이블 구성을 추천합니다.",
        hint: "",
        content: <StudentStatusApproval />,
      };
  }
}
