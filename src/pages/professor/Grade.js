// src/pages/professormanagement/ProfessorGradeLmsDashboard.jsx
import React, { useState } from "react";
import GradePolicyManage from "../../components/features/grade/GradePolicyManage";
import AttendanceManage from "../../components/features/attendance/AttendanceManage";
import AbsenceApproval from "../../components/features/attendance/AbsenceApproval";
import AssignmentManage from "../../components/features/assignment/AssignmentManage";
import SubmissionReview from "../../components/features/assignment/SubmissionReview";
import ScoreInput from "../../components/features/grade/ScoreInput";
import FinalGradeConfirm from "../../components/features/grade/FinalGradeConfirm";

/* =========================
   Modal Types (교수용)
========================= */
const modalTypes = {
  GRADE_ITEM: "GRADE_ITEM",

  ATTENDANCE_MANAGE: "ATTENDANCE_MANAGE",
  ABSENCE_APPROVAL: "ABSENCE_APPROVAL",

  ASSIGNMENT_CREATE: "ASSIGNMENT_CREATE",
  SUBMISSION_REVIEW: "SUBMISSION_REVIEW",

  SCORE_INPUT: "SCORE_INPUT",
  FINAL_GRADE_CONFIRM: "FINAL_GRADE_CONFIRM",
};

/* =========================
   Main Dashboard
========================= */
export default function ProfessorGradeLmsDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          평가 및 성적 관리
        </h1>
        <p className="text-sm text-slate-500">
          평가 기준 설정부터 출석, 과제, 성적 산출까지 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===============================
            중분류 1: 평가 기준
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Grade Policy"
            tagColor="teal"
            title="평가 기준 설정"
            description="과목별 평가 항목 및 반영 비율을 설정합니다."
            badge="Required"
            badgeColor="teal"
          />

          <DashboardButton
            label="평가 기준 설정"
            description="중간·기말·과제·출석 반영 비율을 설정합니다."
            onClick={() => setActiveModal(modalTypes.GRADE_ITEM)}
          />
        </section>

        {/* ===============================
            중분류 2: 출석 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Attendance"
            tagColor="lime"
            title="출석 관리"
            description="출석 내역 확인 및 인정 처리를 진행합니다."
            badge="Manage"
            badgeColor="lime"
          />

          <div className="space-y-3">
            <DashboardButton
              label="출석 체크 / 수정"
              description="전자출결 및 수동 출석을 관리합니다."
              onClick={() => setActiveModal(modalTypes.ATTENDANCE_MANAGE)}
            />
            <DashboardButton
              label="병가 증빙 승인"
              description="병가 증빙 서류를 확인하고 출석 인정 처리합니다."
              onClick={() => setActiveModal(modalTypes.ABSENCE_APPROVAL)}
            />
          </div>
        </section>

        {/* ===============================
            중분류 3: 과제 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Assignment"
            tagColor="fuchsia"
            title="과제 관리"
            description="과제 생성 및 제출물을 관리합니다."
            badge="LMS"
            badgeColor="fuchsia"
          />

          <div className="space-y-3">
            <DashboardButton
              label="과제 생성"
              description="마감일 및 만점을 설정하여 과제를 생성합니다."
              onClick={() => setActiveModal(modalTypes.ASSIGNMENT_CREATE)}
            />
            <DashboardButton
              label="제출물 확인 및 채점"
              description="학생 제출물을 확인하고 점수를 부여합니다."
              onClick={() => setActiveModal(modalTypes.SUBMISSION_REVIEW)}
            />
          </div>
        </section>

        {/* ===============================
            중분류 4: 성적 처리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Grade"
            tagColor="amber"
            title="성적 처리"
            description="점수 입력 및 최종 성적을 확정합니다."
            badge="Final"
            badgeColor="amber"
          />

          <div className="space-y-3">
            <DashboardButton
              label="점수 입력"
              description="학생별 평가 항목 점수를 입력합니다."
              onClick={() => setActiveModal(modalTypes.SCORE_INPUT)}
            />
            <DashboardButton
              label="최종 성적 확정"
              description="성적을 산출하고 최종 확정합니다."
              onClick={() => setActiveModal(modalTypes.FINAL_GRADE_CONFIRM)}
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
    lime: "text-lime-500",
    fuchsia: "text-fuchsia-500",
    amber: "text-amber-500",
  };

  const badgeColorMap = {
    teal: "text-teal-500 bg-teal-50",
    lime: "text-lime-500 bg-lime-50",
    fuchsia: "text-fuchsia-500 bg-fuchsia-50",
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
    case modalTypes.GRADE_ITEM:
      return {
        title: "평가 기준 설정",
        subtitle: "GradeItem",
        // hint: "평가 항목별 반영 비율 합계 100% 검증 로직을 추천합니다.",
        content: <GradePolicyManage />,
      };

    case modalTypes.ATTENDANCE_MANAGE:
      return {
        title: "출석 관리",
        subtitle: "Attendance",
        // hint: "전자출결 + 수동 수정 이력 관리 UI를 추천합니다.",
        content: <AttendanceManage />,
      };

    case modalTypes.ABSENCE_APPROVAL:
      return {
        title: "병가 증빙 승인",
        subtitle: "Attendance · absenceDoc",
        // hint: "증빙 파일 미리보기 + 승인/반려 처리를 추천합니다.",
        content: <AbsenceApproval />,
      };

    case modalTypes.ASSIGNMENT_CREATE:
      return {
        title: "과제 생성",
        subtitle: "Assignment",
        // hint: "마감일, 만점, 첨부 자료 업로드 UI를 추천합니다.",
        content: <AssignmentManage />,
      };

    case modalTypes.SUBMISSION_REVIEW:
      return {
        title: "제출물 확인 및 채점",
        subtitle: "Submission",
        // hint: "학생별 제출 상태 + 점수 입력 테이블을 추천합니다.",
        content: <SubmissionReview />,
      };

    case modalTypes.SCORE_INPUT:
      return {
        title: "점수 입력",
        subtitle: "StudentScore",
        // hint: "평가 항목별 점수 입력 및 자동 합산을 추천합니다.",
        content: <ScoreInput />,
      };

    case modalTypes.FINAL_GRADE_CONFIRM:
      return {
        title: "최종 성적 확정",
        subtitle: "Grade",
        // hint: "성적 확정 후 수정 불가 처리 경고를 추천합니다.",
        content: <FinalGradeConfirm />,
      };

    default:
      return {
        title: "평가 및 성적 관리",
        subtitle: "",
        hint: "",
      };
  }
}
