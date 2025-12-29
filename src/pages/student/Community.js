// src/pages/studentmanagement/StudentCommunityDashboard.jsx
import React, { useState } from "react";
import NoticeList from "../../components/features/notice/NoticeList";
import DepartmentNotice from "../../components/features/notice/DepartmentNotice";
import FreeBoard from "../../components/features/board/FreeBoard";
import PostWrite from "../../components/features/board/PostWrite";
import CommunityBoard from "../../components/features/board/CommunityBoard";

/* =========================
   Modal Types (학생용)
========================= */
const modalTypes = {
  NOTICE_LIST: "NOTICE_LIST",
  DEPARTMENT_NOTICE: "DEPARTMENT_NOTICE",

  FREE_BOARD: "FREE_BOARD",
  POST_WRITE: "POST_WRITE",
};

/* =========================
   Main Dashboard
========================= */
export default function StudentCommunityDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          커뮤니티 · 소통
        </h1>
        <p className="text-sm text-slate-500">
          학교 공지사항과 자유 게시판을 통해 소통합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===============================
            중분류 1: 공지사항
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Notice"
            tagColor="teal"
            title="공지사항"
            description="학교 및 학과 공지사항을 확인합니다."
            badge="Official"
            badgeColor="teal"
          />

          <div className="space-y-3">
            <DashboardButton
              label="학교 전체 공지"
              description="학교 전체 공지사항을 확인합니다."
              onClick={() => setActiveModal(modalTypes.NOTICE_LIST)}
            />
          </div>
        </section>

        {/* ===============================
            중분류 2: 자유 게시판
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Community"
            tagColor="fuchsia"
            title="자유 게시판"
            description="학생 간 자유롭게 소통합니다."
            badge="Board"
            badgeColor="fuchsia"
          />

          <div className="space-y-3">
            <DashboardButton
              label="자유 게시판 보기"
              description="게시글을 조회하고 댓글을 작성합니다."
              onClick={() => setActiveModal(modalTypes.FREE_BOARD)}
            />
            <DashboardButton
              label="게시글 작성"
              description="자유 게시판에 글을 작성합니다."
              onClick={() => setActiveModal(modalTypes.POST_WRITE)}
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
  };

  const badgeColorMap = {
    teal: "text-teal-500 bg-teal-50",
    fuchsia: "text-fuchsia-500 bg-fuchsia-50",
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
    case modalTypes.NOTICE_LIST:
      return {
        title: "학교 전체 공지",
        subtitle: "Notice",
        // hint: "공지 유형(일반/중요), 게시 기간, 조회수 표시를 추천합니다.",
        content: <NoticeList />,
      };

    case modalTypes.FREE_BOARD:
      return {
        title: "자유 게시판",
        subtitle: "Board · Post · Comment",
        // hint: "게시글 목록 + 댓글 수 + 최신순 정렬 UI를 추천합니다.",
        content: <CommunityBoard />,
      };

    case modalTypes.POST_WRITE:
      return {
        title: "게시글 작성",
        subtitle: "Post",
        // hint: "제목, 내용 입력 + 수정/삭제 권한 체크 UI를 추천합니다.",
        content: <PostWrite />,
      };
  }
}
