// src/pages/adminmanagement/UserRoleDashboard.jsx
import React, { useState } from "react";

const modalTypes = {
  USER_CREATE: "USER_CREATE",
  USER_EDIT: "USER_EDIT",
  USER_DEACTIVATE: "USER_DEACTIVATE",
  ROLE_GROUP: "ROLE_GROUP",
  ROLE_MENU_ACCESS: "ROLE_MENU_ACCESS",
  ACTIVITY_LOG: "ACTIVITY_LOG",
};

export default function UserRoleDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* 상단 헤더 */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          User & Role Management
        </h1>
        <p className="text-sm text-slate-500">
          사용자 계정, 권한 그룹, 활동 로그를 한 곳에서 관리합니다.
        </p>
      </header>

      {/* 메인 그리드 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 사용자 계정 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                User Accounts
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                사용자 계정 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                관리자, 교수, 학생 등 시스템 사용자의 계정을 관리합니다.
              </p>
            </div>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
              Identity
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="사용자 등록"
              description="신규 사용자 계정을 생성하고 초기 비밀번호를 설정합니다."
              onClick={() => setActiveModal(modalTypes.USER_CREATE)}
            />
            <DashboardButton
              label="사용자 수정"
              description="이름, 소속, 역할 등 사용자 정보를 수정합니다."
              onClick={() => setActiveModal(modalTypes.USER_EDIT)}
            />
            <DashboardButton
              label="계정 비활성화"
              description="퇴사자, 휴학자 등의 계정을 비활성화하거나 잠금 처리합니다."
              onClick={() => setActiveModal(modalTypes.USER_DEACTIVATE)}
            />
          </div>
        </section>

        {/* 권한 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-500">
                Roles & Permissions
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                권한 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                권한 그룹을 생성하고 메뉴 접근 권한을 설정합니다.
              </p>
            </div>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
              Access Control
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="권한 그룹 생성"
              description="관리자, 조교, 교수 등 역할별 권한 그룹을 생성합니다."
              onClick={() => setActiveModal(modalTypes.ROLE_GROUP)}
            />
            <DashboardButton
              label="메뉴 접근 설정"
              description="각 권한 그룹별로 접근 가능한 메뉴와 기능을 설정합니다."
              onClick={() => setActiveModal(modalTypes.ROLE_MENU_ACCESS)}
            />

            <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-3 text-xs text-slate-500">
              <p className="font-medium text-slate-600">운영 팁</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>
                  권한은 사용자 개별이 아니라 &quot;그룹&quot; 기준으로 관리하면
                  좋아요.
                </li>
                <li>
                  중요 메뉴는 &quot;2인 이상 승인&quot; 정책을 고려해볼 수
                  있습니다.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 사용자 활동 로그 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                Audit & Logs
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                사용자 활동 로그
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                로그인, 주요 기능 사용, 설정 변경 등 활동 이력을 조회합니다.
              </p>
            </div>
            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
              Monitoring
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="활동 로그 조회"
              description="사용자별, 기간별, 기능별로 필터링하여 로그를 조회합니다."
              onClick={() => setActiveModal(modalTypes.ACTIVITY_LOG)}
            />

            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
              <p className="font-medium text-slate-600">권장 정책</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>
                  중요 메뉴(권한 변경, 계정 비활성화 등)는 반드시 로그를
                  남기세요.
                </li>
                <li>
                  로그 보관 기간(예: 1년, 3년)을 정책으로 정해두면 좋습니다.
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

/** 공통 모달 – 실제 폼/테이블은 여기 안에 붙이면 됨 */
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

        {/* 여기부터 실제 UI 붙이는 영역 */}
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
    case modalTypes.USER_CREATE:
      return {
        title: "사용자 등록",
        subtitle: "신규 사용자 계정을 생성합니다.",
        hint: "아이디, 이름, 이메일, 소속, 기본 역할, 초기 비밀번호 입력 필드를 포함하세요.",
      };
    case modalTypes.USER_EDIT:
      return {
        title: "사용자 수정",
        subtitle: "기존 사용자 정보를 수정합니다.",
        hint: "좌측 사용자 목록 + 우측 상세 패널 형태로 구성하면 관리자가 보기 편합니다.",
      };
    case modalTypes.USER_DEACTIVATE:
      return {
        title: "계정 비활성화",
        subtitle: "더 이상 사용하지 않는 계정을 잠그거나 비활성화합니다.",
        hint: "비활성화 사유, 처리자, 처리일자 기록 필드를 추가하는 것을 추천합니다.",
      };
    case modalTypes.ROLE_GROUP:
      return {
        title: "권한 그룹 생성",
        subtitle: "역할 기반 권한 그룹을 생성합니다.",
        hint: "그룹 이름, 설명, 기본 적용 대상(예: 전체 교수, 전체 관리자)을 설정하세요.",
      };
    case modalTypes.ROLE_MENU_ACCESS:
      return {
        title: "메뉴 접근 설정",
        subtitle: "권한 그룹별로 접근 가능한 메뉴를 설정합니다.",
        hint: "좌측: 메뉴 트리, 우측: 읽기/쓰기/삭제 체크박스를 두면 직관적인 UI가 됩니다.",
      };
    case modalTypes.ACTIVITY_LOG:
      return {
        title: "사용자 활동 로그",
        subtitle: "로그인/로그아웃, 주요 작업 이력을 조회합니다.",
        hint: "기간, 사용자, 기능(메뉴) 필터 + 테이블(시간, 사용자, 작업, IP)을 권장합니다.",
      };
    default:
      return {
        title: "관리 기능",
        subtitle: "",
        hint: "",
      };
  }
}
