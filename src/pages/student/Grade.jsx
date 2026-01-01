// src/pages/student/StudentGradeDashboard.jsx
import React, { useState } from "react";
// 🔥 통합된 컴포넌트 하나만 import
import StudentGradeViewer from "../../components/features/grade/StudentGradeViewer";
import AttendanceView from "../../components/features/attendance/AttendanceView";
import ExamScheduleView from "../../components/features/exam/ExamScheduleView";

/* =========================
   Modal Types
========================= */
const modalTypes = {
  INTEGRATED_GRADE: "INTEGRATED_GRADE", // 성적 통합 조회
  ATTENDANCE_STATUS: "ATTENDANCE_STATUS",
  EXAM_SCHEDULE: "EXAM_SCHEDULE",
};

export default function StudentGradeDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* 헤더 */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">성적 · 학사</h1>
        <p className="text-sm text-slate-500">
          성적 조회, 출결 및 학사 관련 정보를 확인합니다.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* === [좌측] 성적 통합 관리 === */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Grade"
            tagColor="indigo"
            title="성적 통합 조회"
            description="전체 성적, 상세 점수, 평점(GPA)을 한눈에 확인합니다."
            badge="All-in-One"
            badgeColor="indigo"
          />

          <div className="space-y-3">
            {/* 🔥 버튼 하나로 통합됨! */}
            <DashboardButton
              label="내 성적 확인하기"
              description="이번 학기 및 전체 성적을 조회합니다."
              onClick={() => setActiveModal(modalTypes.INTEGRATED_GRADE)}
            />
          </div>
        </section>

        {/* === [우측] 출결 · 학사 관리 === */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Academic"
            tagColor="rose"
            title="출결 · 시험 관리"
            description="출결 현황과 시험 일정을 확인합니다."
            badge="Manage"
            badgeColor="rose"
          />

          <div className="space-y-3">
            <DashboardButton
              label="출결 현황"
              description="과목별 출석/지각/결석 현황을 확인합니다."
              onClick={() => setActiveModal(modalTypes.ATTENDANCE_STATUS)}
            />
            <DashboardButton
              label="시험 일정 조회"
              description="중간·기말 시험 일정을 확인합니다."
              onClick={() => setActiveModal(modalTypes.EXAM_SCHEDULE)}
            />
          </div>
        </section>
      </div>

      {/* 공통 모달 렌더링 */}
      <DashboardModal activeModal={activeModal} onClose={closeModal} />
    </div>
  );
}

/* =========================
   Modal Content Resolver
========================= */
function DashboardModal({ activeModal, onClose }) {
  if (!activeModal) return null;

  let content = null;
  let title = "";
  let subtitle = "";

  switch (activeModal) {
    case modalTypes.INTEGRATED_GRADE:
      title = "내 성적 조회";
      subtitle = "Grade & GPA Viewer";
      // 🔥 통합 뷰어 렌더링
      content = <StudentGradeViewer onClose={onClose} />;
      break;

    case modalTypes.ATTENDANCE_STATUS:
      title = "출결 현황";
      subtitle = "Attendance Status";
      content = <AttendanceView />;
      break;

    case modalTypes.EXAM_SCHEDULE:
      title = "시험 일정";
      subtitle = "Exam Schedule";
      content = <ExamScheduleView />;
      break;

    default:
      return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      {/* 모달 크기를 넉넉하게 잡음 (max-w-6xl) */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* 모달 헤더 */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              {subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition p-1 hover:bg-slate-200 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* 모달 바디 */}
        <div className="flex-1 overflow-auto bg-slate-50 p-4">{content}</div>
      </div>
    </div>
  );
}

// (SectionHeader, DashboardButton 컴포넌트는 기존 코드 유지)
function SectionHeader({
  tag,
  tagColor,
  title,
  description,
  badge,
  badgeColor,
}) {
  const tagColorMap = { indigo: "text-indigo-500", rose: "text-rose-500" };
  const badgeColorMap = {
    indigo: "text-indigo-500 bg-indigo-50",
    rose: "text-rose-500 bg-rose-50",
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

function DashboardButton({ label, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm hover:bg-white hover:shadow-sm transition"
    >
      <div className="flex justify-between">
        <span className="font-medium text-slate-800">{label}</span>
        <span className="text-[10px] text-slate-400">Open</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </button>
  );
}
