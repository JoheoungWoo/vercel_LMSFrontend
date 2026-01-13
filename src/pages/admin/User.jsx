// src/pages/adminmanagement/UserManagementDashboard.jsx
import React, { useState } from "react";
import UserManage from "../../components/features/user/UserManage";
import UserCreate from "../../components/features/user/UserCreate";
import StudentStatusApproval from "../../components/features/user/StudentStatusApproval";
import { DashboardModal } from "../../components/common/DashboardModal";

/* =========================
   Modal Types (소분류)
========================= */
const modalTypes = {
  USER_REGISTER: "USER_REGISTER",
  USER_EDIT: "USER_EDIT",
  USER_DEACTIVATE: "USER_DEACTIVATE",
  USER_ROLE_BULK: "USER_ROLE_BULK",
  USER_ACADEMIC_STATUS: "USER_ACADEMIC_STATUS",
};

/* =========================
   Main Dashboard
========================= */
export default function UserManagementDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">유저 관리</h1>
        <p className="text-sm text-slate-500">
          사용자 계정, 권한, 학적 상태를 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-1">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="User Management"
            tagColor="indigo"
            title="사용자 · 계정 관리"
            description="학생, 교수, 관리자 계정을 통합 관리합니다."
            badge="Admin"
            badgeColor="indigo"
          />

          <div className="space-y-3">
            <DashboardButton
              label="사용자 등록"
              description="신규 사용자 계정을 생성합니다."
              onClick={() => setActiveModal(modalTypes.USER_REGISTER)}
            />
            <DashboardButton
              label="사용자 수정"
              description="기존 사용자 정보를 수정합니다."
              onClick={() => setActiveModal(modalTypes.USER_EDIT)}
            />
            <DashboardButton
              label="학적 상태 수정"
              description="재학, 휴학, 졸업 등 학적 상태를 변경합니다."
              onClick={() => setActiveModal(modalTypes.USER_ACADEMIC_STATUS)}
            />
          </div>
        </section>
      </div>

      {/* ===== 공통 모달 ===== */}
      {/* <DashboardModal activeModal={activeModal} onClose={closeModal} /> */}
      <DashboardModal
        activeModal={activeModal}
        onClose={closeModal}
        renderModalContent={renderModalContent}
      />
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
    indigo: "text-indigo-500",
  };

  const badgeColorMap = {
    indigo: "text-indigo-500 bg-indigo-50",
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
// function DashboardModal({ activeModal, onClose }) {
//   if (!activeModal) return null;

//   // ✅ 기존 로직 그대로 사용
//   const { title, subtitle, content } = renderModalContent(activeModal);

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25">
//       {/* 모달 컨테이너 (높이 제한) */}
//       <div className="w-full max-w-3xl max-h-[80vh] rounded-2xl bg-white p-6 shadow-xl overflow-hidden">
//         {/* 헤더 영역 (고정) */}
//         <div className="mb-4 flex items-start justify-between">
//           <div>
//             <h3 className="text-lg font-semibold">{title}</h3>
//             <p className="text-xs text-slate-500">{subtitle}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 text-slate-400 hover:text-slate-600"
//           >
//             ✕
//           </button>
//         </div>

//         {/* 콘텐츠 영역 (스크롤) */}
//         <div className="max-h-[60vh] overflow-y-auto rounded-xl border border-dashed p-4 text-xs text-slate-500">
//           {content}
//         </div>
//       </div>
//     </div>
//   );
// }

/* =========================
   Modal Resolver
========================= */
function renderModalContent(activeModal) {
  switch (activeModal) {
    case modalTypes.USER_REGISTER:
      return {
        title: "사용자 등록",
        subtitle: "User · Role",
        content: <UserCreate />,
      };
    case modalTypes.USER_EDIT:
      return {
        title: "사용자 수정",
        subtitle: "User Profile",
        content: <UserManage />,
      };
    case modalTypes.USER_ACADEMIC_STATUS:
      return {
        title: "학적 변동 승인",
        subtitle: "Academic Status",
        content: <StudentStatusApproval />,
      };
    default:
      return {};
  }
}
