import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// 🔥 [추가] 강의 목록 조회를 위한 API (없으면 axios 직접 사용)
import axios from "axios";
import { API_SERVER_HOST } from "../../api/commonApi";

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

  // 1. 로그인 정보 가져오기 (리덕스)
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState?.email || "professor@test.com";

  // 2. 상태 관리
  const [offerings, setOfferings] = useState([]); // 강의 목록
  const [selectedOfferingId, setSelectedOfferingId] = useState(0); // 선택된 강의 ID
  const [loadingOfferings, setLoadingOfferings] = useState(false);

  // 3. 강의 목록 불러오기 (API 연동)
  useEffect(() => {
    if (!userEmail) return;

    const fetchOfferings = async () => {
      setLoadingOfferings(true);
      try {
        //  [중요] 교수님 이메일로 개설된 강의 목록을 가져오는 API
        // 해당 API가 없으면 백엔드에 추가하거나 더미 데이터를 사용해야 합니다.
        // 여기서는 예시로 '/api/course-offering/professor/{email}' 호출
        const res = await axios.get(
          `${API_SERVER_HOST}/api/offering/professor/${userEmail}`
        );

        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          setOfferings(data);
          // 목록이 있으면 첫 번째 강의를 기본 선택
          setSelectedOfferingId(data[0].offeringId);
        } else {
          setOfferings([]);
          setSelectedOfferingId(0);
        }
      } catch (error) {
        console.error("강의 목록 조회 실패:", error);
        // 에러 시 빈 배열 유지
      } finally {
        setLoadingOfferings(false);
      }
    };

    fetchOfferings();
  }, [userEmail]);

  // 4. 강의 선택 핸들러
  const handleCourseChange = (e) => {
    setSelectedOfferingId(Number(e.target.value));
  };

  const closeModal = () => setActiveModal(null);

  // 5. 모달 컨텐츠 렌더링 함수 (컴포넌트 내부로 이동)
  const renderModalContent = (activeModal) => {
    // 강의 미선택 시 방어 로직
    if (!selectedOfferingId && activeModal) {
      alert("먼저 상단에서 강의를 선택해주세요.");
      setActiveModal(null);
      return null;
    }

    const currentCourse = offerings.find(
      (o) => o.offeringId === selectedOfferingId
    );
    const courseName = currentCourse ? currentCourse.courseName : "";

    switch (activeModal) {
      case modalTypes.GRADE_ITEM:
        return {
          title: `평가 기준 설정 - ${courseName}`,
          subtitle: "GradeItem Policy",
          content: (
            <GradePolicyManage
              offeringId={selectedOfferingId}
              userEmail={userEmail}
            />
          ),
        };

      case modalTypes.ATTENDANCE_MANAGE:
        return {
          title: "출석 관리",
          subtitle: "Attendance",
          content: <AttendanceManage offeringId={selectedOfferingId} />,
        };

      case modalTypes.ABSENCE_APPROVAL:
        return {
          title: "병가 증빙 승인",
          subtitle: "Attendance · absenceDoc",
          content: <AbsenceApproval offeringId={selectedOfferingId} />,
        };

      case modalTypes.ASSIGNMENT_CREATE:
        return {
          title: "과제 생성",
          subtitle: "Assignment",
          content: <AssignmentManage offeringId={selectedOfferingId} />,
        };

      case modalTypes.SUBMISSION_REVIEW:
        return {
          title: "제출물 확인 및 채점",
          subtitle: "Submission",
          content: <SubmissionReview offeringId={selectedOfferingId} />,
        };

      case modalTypes.SCORE_INPUT:
        return {
          title: "점수 입력",
          subtitle: "StudentScore",
          content: <ScoreInput offeringId={selectedOfferingId} />,
        };

      case modalTypes.FINAL_GRADE_CONFIRM:
        return {
          title: "최종 성적 확정",
          subtitle: "Grade",
          content: <FinalGradeConfirm offeringId={selectedOfferingId} />,
        };

      default:
        return {
          title: "평가 및 성적 관리",
          subtitle: "",
          content: null,
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 + 강의 선택 ===== */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            평가 및 성적 관리
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            담당 강의를 선택하고 평가 기준, 출석, 성적을 관리하세요.
          </p>
        </div>

        {/* 강의 선택 드롭다운 */}
        <div className="flex flex-col gap-1 min-w-[250px]">
          <label className="text-xs font-bold text-slate-500 ml-1">
            관리할 강의 선택
          </label>
          <div className="relative">
            <select
              value={selectedOfferingId}
              onChange={handleCourseChange}
              className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              disabled={loadingOfferings}
            >
              {loadingOfferings ? (
                <option value={0}>강의 목록 로딩 중...</option>
              ) : offerings.length > 0 ? (
                offerings.map((offering) => (
                  <option key={offering.offeringId} value={offering.offeringId}>
                    [{offering.year}-{offering.semester}] {offering.courseName}
                  </option>
                ))
              ) : (
                <option value={0}>담당 강의가 없습니다.</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. 평가 기준 */}
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

        {/* 2. 출석 관리 */}
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

        {/* 3. 과제 관리 */}
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

        {/* 4. 성적 처리 */}
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
      <DashboardModal
        activeModal={activeModal}
        onClose={closeModal}
        modalContent={activeModal ? renderModalContent(activeModal) : null}
      />
    </div>
  );
}

/* =========================
   Section Header & Button
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
function DashboardModal({ activeModal, onClose, modalContent }) {
  if (!activeModal || !modalContent) return null;

  const { title, subtitle, content } = modalContent;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="rounded-xl border border-dashed p-4 text-xs text-slate-500">
          {content}
        </div>
      </div>
    </div>
  );
}
