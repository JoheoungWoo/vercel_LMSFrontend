// src/pages/academicaffairs/AcademicAffairsDashboard.jsx
import React, { useState } from "react";
import { DashboardModal } from "../../components/common/DashboardModal";

const modalTypes = {
  CREDIT_MANAGE: "CREDIT_MANAGE",
  DEGREE_CERT: "DEGREE_CERT",
  STUDENT_STATUS: "STUDENT_STATUS",
  TUITION_MANAGE: "TUITION_MANAGE",
  SCHOLARSHIP: "SCHOLARSHIP",
  FINANCE_STATUS: "FINANCE_STATUS",
  ACADEMIC_CALENDAR: "ACADEMIC_CALENDAR",
  GRADUATION_CHECK: "GRADUATION_CHECK",
  RECORD_CORRECTION: "RECORD_CORRECTION",
};

export default function AcademicAffairsDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* 상단 헤더 */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          Academic Affairs Management
        </h1>
        <p className="text-sm text-slate-500">
          학사 행정, 학적, 증명서, 재정 업무를 통합 관리합니다.
        </p>
      </header>

      {/* 메인 그리드 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 학점 / 학적 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-500">
                Academic Records
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                학점 · 학적 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                학생의 학점 이수 및 학적 상태를 관리합니다.
              </p>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-600">
              Records
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="학점 관리"
              description="이수 학점, 인정 학점, 졸업 요건을 관리합니다."
              onClick={() => setActiveModal(modalTypes.CREDIT_MANAGE)}
            />
            <DashboardButton
              label="학적 상태 관리"
              description="재학, 휴학, 복학, 제적 상태를 관리합니다."
              onClick={() => setActiveModal(modalTypes.STUDENT_STATUS)}
            />
            <DashboardButton
              label="졸업 요건 점검"
              description="졸업 가능 여부를 자동으로 점검합니다."
              onClick={() => setActiveModal(modalTypes.GRADUATION_CHECK)}
            />
          </div>
        </section>

        {/* 증명서 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lime-500">
                Certificates
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                증명서 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                학사 관련 증명서 발급 및 이력을 관리합니다.
              </p>
            </div>
            <span className="rounded-full bg-lime-50 px-3 py-1 text-xs font-medium text-lime-600">
              Certification
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="증명서 발급"
              description="재학·성적·졸업 증명서를 발급합니다."
              onClick={() => setActiveModal(modalTypes.DEGREE_CERT)}
            />
            <DashboardButton
              label="학적 기록 정정"
              description="학적 및 성적 기록 정정을 처리합니다."
              onClick={() => setActiveModal(modalTypes.RECORD_CORRECTION)}
            />
            <DashboardButton
              label="학사 일정 관리"
              description="학기별 학사 일정을 관리합니다."
              onClick={() => setActiveModal(modalTypes.ACADEMIC_CALENDAR)}
            />
          </div>
        </section>

        {/* 등록금 / 재정 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-500">
                Finance
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                등록금 · 재정 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                등록금, 장학금 및 재정 현황을 관리합니다.
              </p>
            </div>
            <span className="rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-medium text-fuchsia-600">
              Finance
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="등록금 관리"
              description="등록금 고지 및 납부 상태를 관리합니다."
              onClick={() => setActiveModal(modalTypes.TUITION_MANAGE)}
            />
            <DashboardButton
              label="장학금 관리"
              description="장학금 지급 내역을 관리합니다."
              onClick={() => setActiveModal(modalTypes.SCHOLARSHIP)}
            />
            <DashboardButton
              label="재정 현황 조회"
              description="학생별 재정 상태를 조회합니다."
              onClick={() => setActiveModal(modalTypes.FINANCE_STATUS)}
            />
          </div>
        </section>
      </div>

      {/* <DashboardModal activeModal={activeModal} onClose={closeModal} /> */}
      <DashboardModal
        activeModal={activeModal}
        onClose={closeModal}
        renderModalContent={renderModalContent}
      />
    </div>
  );
}

/* ================= 공통 컴포넌트 ================= */

function DashboardButton({ label, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-slate-800">{label}</span>
        <span className="text-[10px] uppercase tracking-wide text-slate-400">
          Open
        </span>
      </div>
      {description && (
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      )}
    </button>
  );
}

// function DashboardModal({ activeModal, onClose }) {
//   if (!activeModal) return null;

//   const { title, subtitle, hint } = renderModalContent(activeModal);

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25">
//       <div className="w-full max-w-[80%] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
//         <div className="mb-4 flex items-start justify-between gap-4">
//           <div>
//             <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
//             <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
//           <p className="font-medium text-slate-700">🔧 개발자용 placeholder</p>
//           <p className="mt-1">{hint}</p>
//         </div>

//         <div className="mt-5 flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600"
//           >
//             닫기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

function renderModalContent(activeModal) {
  return {
    title: "학사 행정 관리",
    subtitle: "선택한 학사 행정 기능을 관리합니다.",
    hint: "이 영역에 실제 폼(Form), 테이블(Table), 검색 필터 등을 연결하면 됩니다.",
  };
}
