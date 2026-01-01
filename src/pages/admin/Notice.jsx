// src/pages/admin/NoticeBoardDashboard.jsx
import React, { useState } from "react";
import AdminNotice from "./admin/AdminNotice";
import AdminNoticeEdit from "./admin/AdminNoticeEdit";

const modalTypes = {
  CREATE_NOTICE: "CREATE_NOTICE",
  EDIT_NOTICE: "EDIT_NOTICE",
  SET_PERIOD: "SET_PERIOD",
  DEPT_NEWS: "DEPT_NEWS",
  RESOURCE_CATEGORY: "RESOURCE_CATEGORY",
  RESOURCE_FILES: "RESOURCE_FILES",
};

export default function Notice() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* 상단 헤더 */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          Notices & Board Management
        </h1>
        <p className="text-sm text-slate-500">
          공지사항, 학과 소식, 자료실을 한 곳에서 관리합니다.
        </p>
      </header>

      {/* 메인 그리드 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 공지사항 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                Notice Management
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                공지사항 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                학교/학과 공지, 시스템 공지를 등록하고 게시 기간을 설정합니다.
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              Admin Only
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="공지 등록"
              description="새 공지사항 작성 및 중요도, 대상 설정"
              onClick={() => setActiveModal(modalTypes.CREATE_NOTICE)}
            />

            <DashboardButton
              label="공지 수정 / 삭제"
              description="기존 공지 목록 조회 및 내용 수정, 비활성화"
              onClick={() => setActiveModal(modalTypes.EDIT_NOTICE)}
            />

            <DashboardButton
              label="게시 기간 설정"
              description="공지 게시 시작/종료일, 상시 게시 여부 설정"
              onClick={() => setActiveModal(modalTypes.SET_PERIOD)}
            />
          </div>
        </section>

        {/* 학과 소식 / 뉴스 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                Department News
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                학과 소식 / 뉴스 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                학과별 소식, 언론 보도, 행사 리뷰 등을 관리합니다.
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              Department / Admin
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="학과 소식 / 뉴스 관리"
              description="학과별 카드 뉴스, 썸네일, 태그, 노출 여부 설정"
              onClick={() => setActiveModal(modalTypes.DEPT_NEWS)}
            />

            <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-3 text-xs text-slate-500">
              <p className="font-medium text-slate-600">운영 팁</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>메인 화면 노출 여부를 태그로 구분하면 편합니다.</li>
                <li>학과별 필터(전공, 학년)를 미리 정의해두면 좋아요.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 자료실 관리 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
                Resources
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                자료실 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                강의 자료, 양식 파일, 안내문 등의 카테고리와 파일을 관리합니다.
              </p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
              Files & Categories
            </span>
          </div>

          <div className="space-y-3">
            <DashboardButton
              label="카테고리 관리"
              description="자료실 상위/하위 카테고리, 정렬 순서 설정"
              onClick={() => setActiveModal(modalTypes.RESOURCE_CATEGORY)}
            />

            <DashboardButton
              label="파일 업로드 / 다운로드 관리"
              description="파일 등록, 버전 관리, 다운로드 로그 확인"
              onClick={() => setActiveModal(modalTypes.RESOURCE_FILES)}
            />

            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
              <p className="font-medium text-slate-600">권장 정책</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>
                  파일 이름 규칙(예: [학과]_[과목]_[주차].pdf)을 통일하세요.
                </li>
                <li>중요 문서는 다운로드 로그를 활성화해두면 좋습니다.</li>
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

/**
 * 공통 버튼 컴포넌트
 */
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

/**
 * 공통 모달 컴포넌트 (내용은 개발자가 붙여넣기 쉽게 placeholder로 구성)
 */
function DashboardModal({ activeModal, onClose }) {
  if (!activeModal) return null;

  const renderModalContent = () => {
    switch (activeModal) {
      case modalTypes.CREATE_NOTICE:
        return {
          title: "공지 등록",
          subtitle: "새 공지사항을 등록합니다.",
          content: <AdminNotice />,
        };
      case modalTypes.EDIT_NOTICE:
        return {
          title: "공지 수정 / 삭제",
          subtitle: "기존 공지사항을 조회하고 수정 또는 비활성화합니다.",
          hint: "좌측 리스트에서 공지를 선택 후 우측 패널에서 내용을 수정하도록 구성하면 좋습니다.",
          content: <AdminNoticeEdit />,
        };
    }
  };

  const { title, subtitle, content } = renderModalContent();

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

        {/* 여기부터 실제 폼/테이블을 붙이면 됨 */}
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
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            닫기
          </button>
          {/* 실제 저장/적용 버튼은 각 기능 구현 시 활성화 */}
          <button
            type="button"
            className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white opacity-60"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
