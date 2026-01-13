// src/pages/professormanagement/ProfessorFeedbackDashboard.jsx
import React, { useState } from "react";
import CourseReviewView from "../../components/features/review/CourseReviewView";
import { DashboardModal } from "../../components/common/DashboardModal";

/* =========================
   Modal Types (교수용)
========================= */
const modalTypes = {
  COURSE_REVIEW: "COURSE_REVIEW",
};

/* =========================
   Main Dashboard
========================= */
export default function ProfessorFeedbackDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">강의 피드백</h1>
        <p className="text-sm text-slate-500">
          학생들이 남긴 강의 평가를 익명으로 확인합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-1">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Review"
            tagColor="teal"
            title="강의 평가 조회"
            description="학생 강의 평가 점수 및 코멘트를 확인합니다."
            badge="Anonymous"
            badgeColor="teal"
          />

          <DashboardButton
            label="강의 평가 조회"
            description="과목별 강의 평가 점수와 코멘트를 확인합니다."
            onClick={() => setActiveModal(modalTypes.COURSE_REVIEW)}
          />
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
    teal: "text-teal-500",
  };

  const badgeColorMap = {
    teal: "text-teal-500 bg-teal-50",
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

//   const { title, subtitle, hint, content } = renderModalContent(activeModal);

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25">
//       <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
//         <div className="mb-4 flex justify-between">
//           <div>
//             <h3 className="text-lg font-semibold">{title}</h3>
//             <p className="text-xs text-slate-500">{subtitle}</p>
//           </div>
//           <button onClick={onClose}>✕</button>
//         </div>

//         <div className="rounded-xl border border-dashed p-4 text-xs text-slate-500">
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
    case modalTypes.COURSE_REVIEW:
      return {
        title: "강의 평가 조회",
        subtitle: "Review",
        // hint: "과목/학기 필터 + 평균 평점 그래프 + 익명 코멘트 리스트 구성을 추천합니다.",
        content: <CourseReviewView />,
      };

    default:
      return {
        title: "강의 피드백",
        subtitle: "",
        hint: "",
      };
  }
}
