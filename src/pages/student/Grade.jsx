// src/pages/studentmanagement/StudentGradeDashboard.jsx
import React, { useState } from "react";
import MyGrades from "../../components/features/grade/MyGrades";
import CourseGrades from "../../components/features/grade/CourseGrades";
import ScoreDetail from "../../components/features/grade/ScoreDetail";
import FinalGradeView from "../../components/features/grade/FinalGradeView";
import AttendanceView from "../../components/features/attendance/AttendanceView";
import ExamScheduleView from "../../components/features/exam/ExamScheduleView";

/* =========================
   Modal Types (학생용)
========================= */
const modalTypes = {
  // ───────── 성적 조회 ─────────
  MY_GRADES: "MY_GRADES",
  COURSE_GRADES: "COURSE_GRADES",
  STUDENT_SCORE_DETAIL: "STUDENT_SCORE_DETAIL",
  FINAL_GRADE: "FINAL_GRADE",
  GPA_OVERVIEW: "GPA_OVERVIEW",

  // ───────── 출결 · 시험 ─────────
  ATTENDANCE_STATUS: "ATTENDANCE_STATUS",
  EXAM_SCHEDULE: "EXAM_SCHEDULE",

  // ───────── 학사 관리 ─────────
  ACADEMIC_WARNING: "ACADEMIC_WARNING",
  GRADE_APPEAL: "GRADE_APPEAL",
};

/* =========================
   Main Dashboard
========================= */
export default function StudentGradeDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">성적 · 학사</h1>
        <p className="text-sm text-slate-500">
          성적 조회, 출결 및 학사 관련 정보를 확인합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===============================
            중분류 1: 성적 조회
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Grade"
            tagColor="indigo"
            title="성적 조회"
            description="학기 및 과목별 성적을 확인합니다."
            badge="Score"
            badgeColor="indigo"
          />

          <div className="space-y-3">
            <DashboardButton
              label="전체 성적 조회"
              description="학기별 전체 성적을 확인합니다."
              onClick={() => setActiveModal(modalTypes.MY_GRADES)}
            />
            <DashboardButton
              label="과목별 성적"
              description="수강 과목별 성적을 확인합니다."
              onClick={() => setActiveModal(modalTypes.COURSE_GRADES)}
            />
            <DashboardButton
              label="상세 점수 확인"
              description="중간 · 기말 · 과제 점수를 확인합니다."
              onClick={() => setActiveModal(modalTypes.STUDENT_SCORE_DETAIL)}
            />
            <DashboardButton
              label="최종 성적 조회"
              description="학기별 최종 등급과 평점을 확인합니다."
              onClick={() => setActiveModal(modalTypes.FINAL_GRADE)}
            />
          </div>
        </section>

        {/* ===============================
            중분류 2: 출결 · 학사 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Academic"
            tagColor="rose"
            title="출결 · 학사 관리"
            description="출결, 시험 및 학사 이력을 관리합니다."
            badge="Manage"
            badgeColor="rose"
          />

          <div className="space-y-3">
            <DashboardButton
              label="출결 현황"
              description="출석, 지각, 결석 현황을 확인합니다."
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
    indigo: "text-indigo-500",
    rose: "text-rose-500",
  };

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
    case modalTypes.MY_GRADES:
      return {
        title: "전체 성적 조회",
        subtitle: "Grade · Semester",
        // hint: "학기 선택 + 성적 테이블 구성을 추천합니다.",
        content: <MyGrades />,
      };

    case modalTypes.COURSE_GRADES:
      return {
        title: "과목별 성적",
        subtitle: "Grade · Course",
        // hint: "과목별 점수 및 등급 표시를 추천합니다.",
        content: <CourseGrades />,
      };

    case modalTypes.STUDENT_SCORE_DETAIL:
      return {
        title: "상세 점수 확인",
        subtitle: "Mid · Final · Assignment",
        // hint: "과목 선택 → 평가 항목별 점수 테이블 UI를 추천합니다.",
        content: <ScoreDetail />,
      };

    case modalTypes.FINAL_GRADE:
      return {
        title: "최종 성적 조회",
        subtitle: "Final Grade",
        // hint: "학기별 최종 등급(A+, B 등) + 평점 요약 UI를 추천합니다.",
        content: <FinalGradeView />,
      };

    case modalTypes.ATTENDANCE_STATUS:
      return {
        title: "출결 현황",
        subtitle: "Attendance",
        // hint: "출석/지각/결석 색상 구분 UI를 추천합니다.",
        content: <AttendanceView />,
      };

    case modalTypes.EXAM_SCHEDULE:
      return {
        title: "시험 일정 조회",
        subtitle: "Exam Schedule",
        // hint: "캘린더 또는 리스트 UI를 추천합니다.",
        content: <ExamScheduleView />,
      };

    default:
      return {
        title: "성적 · 학사",
        subtitle: "",
        hint: "",
      };
  }
}
