// src/pages/adminmanagement/DeptScheduleEventDashboard.jsx
import React, { useState } from "react";

import Academicschedule from "./admin/Academicschedule";

const modalTypes = {
  ACADEMIC_SCHEDULE: "ACADEMIC_SCHEDULE",
  RECURRING_SCHEDULE: "RECURRING_SCHEDULE",
  CALENDAR_SYNC: "CALENDAR_SYNC",
  EVENT_CREATE: "EVENT_CREATE",
  EVENT_ATTENDEE: "EVENT_ATTENDEE",
  EVENT_REPORT: "EVENT_REPORT",
  ROOM_RESERVATION: "ROOM_RESERVATION",
  NOTICE_BANNER_LINK: "NOTICE_BANNER_LINK",
  REMINDER_ALARM: "REMINDER_ALARM",
};

export default function DeptScheduleEventDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* 상단 헤더 */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          Department Schedule & Event Management
        </h1>
        <p className="text-sm text-slate-500">
          학과 일정, 세미나·행사, 공간 예약과 알림을 한 곳에서 관리합니다.
        </p>
      </header>

      {/* 메인 그리드 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 학과 일정 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-500">
                Department Calendar
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                학과 일정 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                학사 일정, 정기 회의, 세미나 등 학과 일정을 캘린더로 관리합니다.
              </p>
            </div>
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-600">
              Calendar
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="학사 · 학과 일정 등록 / 관리"
              description="개강, 수강정정, 시험 기간, 전공 설명회 등의 일정을 등록·수정합니다."
              onClick={() => setActiveModal(modalTypes.ACADEMIC_SCHEDULE)}
            />
            <DashboardButton
              label="정기 일정(회의 · 세미나) 관리"
              description="교수 회의, 연구실 세미나 등 반복 일정을 관리합니다."
              onClick={() => setActiveModal(modalTypes.RECURRING_SCHEDULE)}
            />
            <DashboardButton
              label="캘린더 연동 설정"
              description="Google/Outlook 캘린더와 연동하여 일정 구독 기능을 제공합니다."
              onClick={() => setActiveModal(modalTypes.CALENDAR_SYNC)}
            />
          </div>
        </section>

        {/* 학과 행사 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                Events
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                학과 행사 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                설명회, 특강, 공모전, MT 등 학과 행사를 기획·운영합니다.
              </p>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Programs
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="행사 등록 / 수정"
              description="행사 기본 정보, 일정, 대상, 신청 기간, 모집 인원 등을 설정합니다."
              onClick={() => setActiveModal(modalTypes.EVENT_CREATE)}
            />
            <DashboardButton
              label="참가자 · 신청자 관리"
              description="신청자 명단, 참석 여부, 대기자, 알림 발송 등을 관리합니다."
              onClick={() => setActiveModal(modalTypes.EVENT_ATTENDEE)}
            />
            <DashboardButton
              label="행사 결과 · 리포트 관리"
              description="참가 인원, 만족도, 설문 결과를 기록하고 리포트로 정리합니다."
              onClick={() => setActiveModal(modalTypes.EVENT_REPORT)}
            />

            <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-3 text-xs text-slate-500">
              <p className="font-medium text-slate-600">운영 팁</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>
                  행사별 만족도 설문 링크를 함께 관리하면 추적에 도움이 됩니다.
                </li>
                <li>
                  행사 유형(설명회, 특강, 네트워킹 등)을 태그로 관리해보세요.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 공간/자원 예약 & 공지 연동 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                Resources & Promotion
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                공간/자원 예약 & 공지 연동
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                행사에 필요한 강의실, 세미나실, 장비 예약과 공지/알림을
                관리합니다.
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              Operations
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="장소 / 공간 예약 관리"
              description="세미나실, 실습실, 대형 강의실 등 행사 장소 예약을 관리합니다."
              onClick={() => setActiveModal(modalTypes.ROOM_RESERVATION)}
            />
            <DashboardButton
              label="공지 · 배너 연동 설정"
              description="메인 페이지 공지, 배너, 팝업과 행사 정보를 연동합니다."
              onClick={() => setActiveModal(modalTypes.NOTICE_BANNER_LINK)}
            />
            <DashboardButton
              label="알림 · 리마인더 설정"
              description="행사 전/후 이메일, 문자, 앱 푸시 알림을 예약 발송합니다."
              onClick={() => setActiveModal(modalTypes.REMINDER_ALARM)}
            />

            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
              <p className="font-medium text-slate-600">권장 정책</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>
                  공간 예약은 시간·수용 인원·장비 기준으로 충돌 검사를 꼭
                  두세요.
                </li>
                <li>
                  행사 전날, 행사 1시간 전 리마인더 알림을 기본 템플릿으로 두면
                  좋습니다.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* 모달 */}
      <DashboardModal activeModal={activeModal} onClose={closeModal} />
    </div>
  );
}

/** 공통 버튼 */
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

/** 공통 모달 – 여기 안에 폼/테이블 붙이면 됨 */
function DashboardModal({ activeModal, onClose }) {
  if (!activeModal) return null;

  const { title, subtitle, hint, content } = renderModalContent(activeModal);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25 px-4">
      <div className="w-full max-w-[80%] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <span className="sr-only">Close</span>✕
          </button>
        </div>

        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
          {content ? (
            content
          ) : (
            <>
              {/* 기본 placeholder */}
              <p className="mb-2 font-medium text-slate-700">
                🔧 개발자용 placeholder 영역
              </p>
              <p className="leading-relaxed">
                이 영역에 실제 폼(Form), 테이블(Table), 검색 필터 등을 넣으면
                됩니다.
                <br />
                예: 강의 검색 필터, 강의계획 입력 폼, 분반/정원 테이블, 시간표
                매트릭스 등.
              </p>
            </>
          )}
          {hint && (
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              <span className="font-semibold text-slate-600">UI 힌트: </span>
              {hint}
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            닫기
          </button>
          <button
            type="button"
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-60"
            disabled
          >
            저장 (폼 연결 후 활성화)
          </button>
        </div>
      </div>
    </div>
  );
}

function renderModalContent(activeModal) {
  switch (activeModal) {
    case modalTypes.ACADEMIC_SCHEDULE:
      return {
        title: "학사 · 학과 일정 등록 / 관리",
        subtitle: "학사 및 학과 공통 일정을 등록·수정합니다.",
        hint: "일정 유형(학사/학과/행사), 대상, 표시 색상, 반복 여부 필드를 포함하세요.",
        content: <Academicschedule />,
      };
    case modalTypes.RECURRING_SCHEDULE:
      return {
        title: "정기 일정(회의 · 세미나) 관리",
        subtitle: "반복되는 회의/세미나 일정을 관리합니다.",
        hint: "반복 주기(매주/격주/매월), 요일, 시간, 참석 대상을 설정하는 폼을 추천합니다.",
        content: "",
      };
    case modalTypes.CALENDAR_SYNC:
      return {
        title: "캘린더 연동 설정",
        subtitle: "외부 캘린더와 일정 연동을 설정합니다.",
        hint: "구독용 URL, 공개 범위, 동기화 주기 설정 등 옵션을 둘 수 있습니다.",
        content: "",
      };
    case modalTypes.EVENT_CREATE:
      return {
        title: "행사 등록 / 수정",
        subtitle: "학과 행사를 등록·수정합니다.",
        hint: "행사 제목, 유형, 일정, 장소, 대상, 신청 기간, 모집 인원 필드를 포함하세요.",
        content: "",
      };
    case modalTypes.EVENT_ATTENDEE:
      return {
        title: "참가자 · 신청자 관리",
        subtitle: "행사 신청자와 참석자를 관리합니다.",
        hint: "상태(신청/대기/확정/취소), 출석 체크, 일괄 알림 발송 기능을 고려해보세요.",
        content: "",
      };
    case modalTypes.EVENT_REPORT:
      return {
        title: "행사 결과 · 리포트 관리",
        subtitle: "행사 종료 후 결과 리포트를 관리합니다.",
        hint: "참가 인원, 출석률, 만족도, 주요 피드백을 요약하는 리포트 레이아웃을 추천합니다.",
        content: "",
      };
    case modalTypes.ROOM_RESERVATION:
      return {
        title: "장소 / 공간 예약 관리",
        subtitle: "행사에 필요한 공간을 예약합니다.",
        hint: "공간(건물/호수), 시간, 수용 인원, 장비, 담당자 정보를 함께 관리하세요.",
        content: "",
      };
    case modalTypes.NOTICE_BANNER_LINK:
      return {
        title: "공지 · 배너 연동 설정",
        subtitle: "행사 정보를 공지/배너와 연동합니다.",
        hint: "메인 배너, 팝업 공지, 학과 페이지 섹션과의 연결 여부를 설정할 수 있습니다.",
        content: "",
      };
    case modalTypes.REMINDER_ALARM:
      return {
        title: "알림 · 리마인더 설정",
        subtitle: "행사 관련 알림 발송을 예약합니다.",
        hint: "알림 채널(메일/SMS/푸시), 발송 시점(전날, 1시간 전 등), 대상 그룹을 설정하세요.",
        content: "",
      };
    default:
      return {
        title: "관리 기능",
        subtitle: "",
        hint: "",
        content: "",
      };
  }
}
