// src/pages/studentmanagement/AcademicLmsDashboard.jsx
import React, { useState } from "react";
import CourseEnroll from "../../components/features/academic/CourseEnroll";
import TimetableView from "../../components/features/academic/TimetableView";
import AttendanceView from "../../components/features/attendance/AttendanceView";
import AssignmentList from "../../components/features/assignment/AssignmentList";
import AssignmentSubmit from "../../components/features/assignment/AssignmentSubmit";
import CourseReviewWrite from "../../components/features/review/CourseReviewWrite";

/* =========================
   Modal Types (소분류)
========================= */
const modalTypes = {
  COURSE_ENROLL: "COURSE_ENROLL",
  TIMETABLE: "TIMETABLE",
  ATTENDANCE: "ATTENDANCE",

  ASSIGNMENT_LIST: "ASSIGNMENT_LIST",
  ASSIGNMENT_SUBMIT: "ASSIGNMENT_SUBMIT",

  COURSE_REVIEW: "COURSE_REVIEW",
};

/* =========================
   Main Dashboard
========================= */
export default function AcademicLmsDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          수업 및 학사 관리
        </h1>
        <p className="text-sm text-slate-500">
          수강 신청, 출결, 과제, 강의 평가 등 학습 활동을 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-1">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Academic & LMS"
            tagColor="teal"
            title="수강 · 학습 관리"
            description="수업 참여와 학습 전반을 관리합니다."
            badge="Student"
            badgeColor="teal"
          />

          <div className="space-y-3">
            <DashboardButton
              label="수강 신청"
              description="개설된 강의를 조회하고 수강 신청합니다."
              onClick={() => setActiveModal(modalTypes.COURSE_ENROLL)}
            />
            <DashboardButton
              label="시간표 조회"
              description="나의 수강 내역을 바탕으로 주간 시간표를 확인합니다."
              onClick={() => setActiveModal(modalTypes.TIMETABLE)}
            />
            <DashboardButton
              label="출석 현황 확인"
              description="과목별 출석, 지각, 결석 현황을 조회합니다."
              onClick={() => setActiveModal(modalTypes.ATTENDANCE)}
            />
            <DashboardButton
              label="과제 목록 확인"
              description="과제 목록과 상세 내용을 확인합니다."
              onClick={() => setActiveModal(modalTypes.ASSIGNMENT_LIST)}
            />
            <DashboardButton
              label="과제 제출"
              description="파일 업로드를 통해 과제를 제출합니다."
              onClick={() => setActiveModal(modalTypes.ASSIGNMENT_SUBMIT)}
            />
            <DashboardButton
              label="강의 평가"
              description="종강 후 수강 과목에 대한 평가와 평점을 등록합니다."
              onClick={() => setActiveModal(modalTypes.COURSE_REVIEW)}
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
function DashboardModal({ activeModal, onClose }) {
  if (!activeModal) return null;

  const { title, subtitle, hint, content } = renderModalContent(activeModal);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25">
      {/* 모달 컨테이너: 최대 높이 제한 */}
      <div className="w-full max-w-3xl max-h-[80vh] rounded-2xl bg-white p-6 shadow-xl overflow-hidden">
        <div className="mb-4 flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        {/* 콘텐츠 영역: 스크롤 처리 */}
        <div className="rounded-xl border border-dashed p-4 text-xs text-slate-500 max-h-[60vh] overflow-y-auto">
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
    case modalTypes.COURSE_ENROLL:
      return {
        title: "수강 신청",
        subtitle: "CourseOffering · Enrollment",
        // hint: "개설 강의 목록 + 신청/취소 버튼 구조를 추천합니다.",
        content: <CourseEnroll />,
      };
    case modalTypes.TIMETABLE:
      return {
        title: "시간표 조회",
        subtitle: "TimeTable",
        // hint: "요일 × 교시 기반 주간 시간표 UI를 추천합니다.",
        content: <TimetableView />,
      };

    case modalTypes.ATTENDANCE:
      return {
        title: "출석 현황",
        subtitle: "Attendance",
        // hint: "출석/지각/결석 상태 뱃지 표시를 추천합니다.",
        content: <AttendanceView />,
      };
    case modalTypes.ASSIGNMENT_LIST:
      return {
        title: "과제 목록",
        subtitle: "Assignment",
        // hint: "마감일 기준 정렬 및 상태 표시를 추천합니다.",
        content: <AssignmentList />,
      };
    case modalTypes.ASSIGNMENT_SUBMIT:
      return {
        title: "과제 제출",
        subtitle: "Submission · FileAttachment",
        // hint: "파일 업로드 + 제출 이력 테이블 구조가 적합합니다.",
        content: <AssignmentSubmit />,
      };
    case modalTypes.COURSE_REVIEW:
      return {
        title: "강의 평가",
        subtitle: "Review",
        // hint: "별점 + 텍스트 리뷰 입력 UI를 추천합니다.",
        content: <CourseReviewWrite />,
      };
    default:
      return {};
  }
}
