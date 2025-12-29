// src/pages/studentmanagement/AcademicAffairsDashboard.jsx
import React, { useState } from "react";
import { DashboardButton, DashboardModal, SectionHeader } from "../what";



/* =========================
   Main Dashboard
========================= */
export default function AcademicAffairsDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          학사 · 행정 관리
        </h1>
        <p className="text-sm text-slate-500">
          학적, 성적, 증명, 재정 관련 학사 행정을 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 영역 ===== */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ===============================
            중분류 1: 학적 · 성적
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Academic Records"
            tagColor="teal"
            title="학적 · 성적 관리"
            description="학생의 학적 상태 및 학점을 관리합니다."
            badge="Academic"
            badgeColor="teal"
          />

          <div className="space-y-3">
            <DashboardButton
              label="학점 관리"
              description="학생별 이수 학점과 성적을 관리합니다."
              onClick={() => setActiveModal(modalTypes.CREDIT_MANAGE)}
            />
            <DashboardButton
              label="학적 상태 관리"
              description="재학, 휴학, 복학, 제적 상태를 관리합니다."
              onClick={() => setActiveModal(modalTypes.STUDENT_STATUS)}
            />
            <DashboardButton
              label="졸업 요건 점검"
              description="졸업 요건 충족 여부를 확인합니다."
              onClick={() => setActiveModal(modalTypes.GRADUATION_CHECK)}
            />
          </div>
        </section>

        {/* ===============================
            중분류 2: 증명 · 기록
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Certificates"
            tagColor="lime"
            title="증명 · 기록 관리"
            description="학사 증명서 발급 및 기록 정정을 처리합니다."
            badge="Documents"
            badgeColor="lime"
          />

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
          </div>
        </section>

        {/* ===============================
            중분류 3: 일정 · 재정
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Finance & Schedule"
            tagColor="fuchsia"
            title="일정 · 재정 관리"
            description="학사 일정 및 등록금·장학금을 관리합니다."
            badge="Finance"
            badgeColor="fuchsia"
          />

          <div className="space-y-3">
            <DashboardButton
              label="학사 일정 관리"
              description="학기별 주요 학사 일정을 관리합니다."
              onClick={() => setActiveModal(modalTypes.ACADEMIC_CALENDAR)}
            />
            <DashboardButton
              label="등록금 관리"
              description="등록금 고지 및 납부 상태를 관리합니다."
              onClick={() => setActiveModal(modalTypes.TUITION_MANAGE)}
            />
            <DashboardButton
              label="장학금 관리"
              description="장학금 지급 내역을 관리합니다."
              onClick={() => setActiveModal(modalTypes.SCHOLARSHIP_MANAGE)}
            />
          </div>
        </section>
      </div>

      {/* ===== 공통 모달 ===== */}
      <DashboardModal activeModal={activeModal} onClose={closeModal} />
    </div>
  );
}
