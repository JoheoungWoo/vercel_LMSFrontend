// src/pages/professormanagement/ProfessorAcademicDashboard.jsx
import React, { useState } from "react";
import MyCourses from "../../components/features/academic/MyCourses";
import StudentList from "../../components/features/academic/StudentList";
import CourseNotice from "../../components/features/notice/CourseNotice";
// 🔥 [1] 관리자용 시간표 컴포넌트 Import
import TimeTableManager from "../../components/features/academic/TimeTableManager";

/* =========================
   Modal Types (교수용)
========================= */
const modalTypes = {
  MY_COURSES: "MY_COURSES",
  STUDENT_LIST: "STUDENT_LIST",
  COURSE_NOTICE: "COURSE_NOTICE",
  TIMETABLE_MANAGEMENT: "TIMETABLE_MANAGEMENT", // 신규
};

/* =========================
   Main Dashboard
========================= */
export default function ProfessorAcademicDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          수업 운영 관리
        </h1>
        <p className="text-sm text-slate-500">
          담당 강의 관리, 수강생 조회, 시간표 편성 및 공지 사항을 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 그리드 ===== */}
      {/* lg:grid-cols-3 로 변경하여 3단 배열하거나, 2단 유지하되 섹션을 나눔 */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* ===============================
            [1] 강의 기본 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Academic"
            tagColor="teal"
            title="담당 강의"
            description="이번 학기 담당 강의와 수강생을 확인합니다."
            badge="Course"
            badgeColor="teal"
          />
          <div className="space-y-3">
            <DashboardButton
              label="담당 강의 조회"
              description="내가 강의 중인 과목 목록을 확인합니다."
              onClick={() => setActiveModal(modalTypes.MY_COURSES)}
            />
            <DashboardButton
              label="수강생 명단 조회"
              description="강의를 수강 중인 학생 명단을 확인합니다."
              onClick={() => setActiveModal(modalTypes.STUDENT_LIST)}
            />
          </div>
        </section>

        {/* ===============================
            [2] 시간표 관리 (신규 섹션)
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Schedule"
            tagColor="indigo"
            title="시간표 관리"
            description="강의 시간표를 편성하고 수정합니다."
            badge="TimeTable"
            badgeColor="indigo"
          />
          <div className="space-y-3">
            <DashboardButton
              label="시간표 통합 관리"
              description="전체 시간표 조회, 등록, 수정, 삭제를 수행합니다."
              onClick={() => setActiveModal(modalTypes.TIMETABLE_MANAGEMENT)}
              style="bg-indigo-50 border-indigo-100 hover:bg-indigo-100 ring-1 ring-indigo-200" // 강조 스타일
            />
            {/* 추후 휴강 관리 등이 추가될 수 있음 */}
          </div>
        </section>

        {/* ===============================
            [3] 강의 공지 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Notice"
            tagColor="fuchsia"
            title="강의 공지"
            description="수강생들에게 알릴 공지사항을 등록합니다."
            badge="Manage"
            badgeColor="fuchsia"
          />
          <div className="space-y-3">
            <DashboardButton
              label="강의 공지 등록"
              description="휴강, 시험 일정 등의 공지를 등록합니다."
              onClick={() => setActiveModal(modalTypes.COURSE_NOTICE)}
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
    indigo: "text-indigo-500",
  };

  const badgeColorMap = {
    teal: "text-teal-500 bg-teal-50",
    fuchsia: "text-fuchsia-500 bg-fuchsia-50",
    indigo: "text-indigo-500 bg-indigo-50",
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p
          className={`text-xs font-semibold uppercase ${
            tagColorMap[tagColor] || "text-slate-500"
          }`}
        >
          {tag}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs ${
          badgeColorMap[badgeColor] || "bg-slate-100"
        }`}
      >
        {badge}
      </span>
    </div>
  );
}

/* =========================
   Dashboard Button (Style prop 지원)
========================= */
function DashboardButton({ label, description, onClick, style }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all shadow-sm 
        ${
          style
            ? style
            : "border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md"
        }`}
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
   Dashboard Modal (크기 자동 조절)
========================= */
function DashboardModal({ activeModal, onClose }) {
  if (!activeModal) return null;

  const { title, subtitle, content } = renderModalContent(activeModal);

  // 시간표 관리일 때만 모달을 넓게(Wide) 설정
  const isWideModal = activeModal === modalTypes.TIMETABLE_MANAGEMENT;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25 backdrop-blur-sm animate-fade-in p-4">
      <div
        className={`w-full bg-white rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]
        ${isWideModal ? "max-w-6xl" : "max-w-3xl"} transition-all duration-300`}
      >
        <div className="mb-4 flex justify-between shrink-0 border-b pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full h-fit"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto rounded-xl p-1">{content}</div>
      </div>
    </div>
  );
}

/* =========================
   Modal Resolver
========================= */
function renderModalContent(activeModal) {
  switch (activeModal) {
    case modalTypes.MY_COURSES:
      return {
        title: "담당 강의 조회",
        subtitle: "CourseOffering",
        content: <MyCourses />,
      };

    case modalTypes.STUDENT_LIST:
      return {
        title: "수강생 명단 조회",
        subtitle: "Enrollment · User",
        content: <StudentList />,
      };

    case modalTypes.COURSE_NOTICE:
      return {
        title: "강의 공지 등록",
        subtitle: "Notice",
        content: <CourseNotice />,
      };

    case modalTypes.TIMETABLE_MANAGEMENT:
      return {
        title: "시간표 통합 관리",
        subtitle: "TimeTable",
        content: <TimeTableManager />,
      };

    default:
      return {};
  }
}
