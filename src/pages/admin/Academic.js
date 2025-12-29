// src/pages/adminmanagement/AdminAcademicDashboard.jsx
import React, { useState } from "react";
import CourseEnroll from "../../components/features/academic/CourseEnroll";
import TermManage from "../../components/features/academic/TermManage";
import CourseOfferingManage from "../../components/features/academic/CourseOfferingManage";
import CourseManage from "../../components/features/academic/CourseManage";
import ClassSectionManage from "../../components/features/academic/ClassSectionManage";
import TimetableManage from "../../components/features/academic/TimetableManage";

/* =========================
   Modal Types (관리자용)
========================= */
const modalTypes = {
  TERM_MANAGE: "TERM_MANAGE",

  COURSE_MANAGE: "COURSE_MANAGE",

  COURSE_OFFERING: "COURSE_OFFERING",

  CLASS_SECTION: "CLASS_SECTION",
  TIMETABLE_MANAGE: "TIMETABLE_MANAGE",
};

/* =========================
   Main Dashboard
========================= */
export default function AdminAcademicDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          교과 과정 및 개설 관리
        </h1>
        <p className="text-sm text-slate-500">
          학기, 과목, 강의 개설 및 시간표를 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===============================
            중분류 1: 학기 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Academic Term"
            tagColor="teal"
            title="학기 관리"
            description="학기 생성 및 수강신청 기간을 설정합니다."
            badge="Base"
            badgeColor="teal"
          />

          <DashboardButton
            label="학기 관리"
            description="학기 생성, 현재 학기 설정 및 수강신청 기간 관리"
            onClick={() => setActiveModal(modalTypes.TERM_MANAGE)}
          />
        </section>

        {/* ===============================
            중분류 2: 과목 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Course"
            tagColor="fuchsia"
            title="과목 관리"
            description="교과목 정보를 등록 및 수정합니다."
            badge="Curriculum"
            badgeColor="fuchsia"
          />

          <DashboardButton
            label="과목 관리"
            description="과목명, 학점 등 교과목 기본 정보를 관리합니다."
            onClick={() => setActiveModal(modalTypes.COURSE_MANAGE)}
          />
        </section>

        {/* ===============================
            중분류 3: 강의 개설
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Course Offering"
            tagColor="lime"
            title="강의 개설"
            description="학기별 강의를 개설하고 교수를 배정합니다."
            badge="Open"
            badgeColor="lime"
          />

          <DashboardButton
            label="강의 개설 관리"
            description="담당 교수 및 정원을 설정합니다."
            onClick={() => setActiveModal(modalTypes.COURSE_OFFERING)}
          />
        </section>

        {/* ===============================
            중분류 4: 분반 및 시간표
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Schedule"
            tagColor="amber"
            title="분반 및 시간표"
            description="분반 생성 및 강의실/시간표를 관리합니다."
            badge="Timetable"
            badgeColor="amber"
          />

          <div className="space-y-3">
            <DashboardButton
              label="분반 관리"
              description="분반(ClassSection)을 생성합니다."
              onClick={() => setActiveModal(modalTypes.CLASS_SECTION)}
            />
            <DashboardButton
              label="시간표 관리"
              description="강의실 배정 및 시간표를 입력합니다."
              onClick={() => setActiveModal(modalTypes.TIMETABLE_MANAGE)}
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
    lime: "text-lime-500",
    amber: "text-amber-500",
  };

  const badgeColorMap = {
    teal: "text-teal-500 bg-teal-50",
    fuchsia: "text-fuchsia-500 bg-fuchsia-50",
    lime: "text-lime-500 bg-lime-50",
    amber: "text-amber-500 bg-amber-50",
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
    case modalTypes.TERM_MANAGE:
      return {
        title: "학기 관리",
        subtitle: "AcademicTerm",
        // hint: "학기 시작/종료일, 현재 학기 설정 및 수강신청 기간 설정 UI를 추천합니다.",
        content: <TermManage />,
      };

    case modalTypes.COURSE_MANAGE:
      return {
        title: "과목 관리",
        subtitle: "Course",
        // hint: "과목 코드, 과목명, 학점 입력 및 활성/비활성 관리 UI를 추천합니다.",
        content: <CourseManage />,
      };

    case modalTypes.COURSE_OFFERING:
      return {
        title: "강의 개설",
        subtitle: "CourseOffering",
        // hint: "학기 선택 → 과목 선택 → 담당 교수 배정 → 정원 설정 플로우를 추천합니다.",
        content: <CourseOfferingManage />,
      };

    case modalTypes.CLASS_SECTION:
      return {
        title: "분반 관리",
        subtitle: "ClassSection",
        // hint: "분반 번호, 정원, 연결된 강의 정보 설정 UI를 추천합니다.",
        content: <ClassSectionManage />,
      };

    case modalTypes.TIMETABLE_MANAGE:
      return {
        title: "시간표 관리",
        subtitle: "TimeTable · Classroom",
        // hint: "요일/교시 기반 시간표 + 강의실 중복 체크 로직을 추천합니다.",
        content: <TimetableManage />,
      };

    default:
      return {
        title: "교과 과정 및 개설",
        subtitle: "",
        hint: "",
      };
  }
}
