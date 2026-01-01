// src/pages/adminmanagement/AdminSystemCommunityDashboard.jsx
import React, { useState } from "react";
import NoticeManage from "../../components/features/notice/NoticeManage";
import PostModeration from "../../components/features/board/PostModeration";
import CommentModeration from "../../components/features/board/CommentModeration";
import SearchHistory from "../../components/features/search/SearchHistory";

/* =========================
   Modal Types (관리자용)
========================= */
export const modalTypes = {
  NOTICE_MANAGE: "NOTICE_MANAGE",

  POST_MODERATION: "POST_MODERATION",
  COMMENT_MODERATION: "COMMENT_MODERATION",

  SEARCH_HISTORY: "SEARCH_HISTORY",
};

/* =========================
   Main Dashboard
========================= */
export default function AdminSystemCommunityDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* ===== 대분류 헤더 ===== */}
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          시스템 및 커뮤니티 관리
        </h1>
        <p className="text-sm text-slate-500">
          공지, 게시판 운영 및 검색 기록을 관리합니다.
        </p>
      </header>

      {/* ===== 중분류 카드 ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ===============================
            중분류 1: 전체 공지 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Notice"
            tagColor="teal"
            title="전체 공지 관리"
            description="학교 전체 중요 공지를 관리합니다."
            badge="System"
            badgeColor="teal"
          />

          <DashboardButton
            label="전체 공지 관리"
            description="중요 공지 작성 및 게시 기간을 설정합니다."
            onClick={() => setActiveModal(modalTypes.NOTICE_MANAGE)}
          />
        </section>

        {/* ===============================
            중분류 2: 게시판 관리
        =============================== */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SectionHeader
            tag="Moderation"
            tagColor="fuchsia"
            title="게시판 관리"
            description="부적절한 게시글과 댓글을 관리합니다."
            badge="Control"
            badgeColor="fuchsia"
          />

          <div className="space-y-3">
            <DashboardButton
              label="게시글 관리"
              description="부적절한 게시글을 삭제 처리합니다."
              onClick={() => setActiveModal(modalTypes.POST_MODERATION)}
            />
            <DashboardButton
              label="댓글 관리"
              description="부적절한 댓글을 삭제 처리합니다."
              onClick={() => setActiveModal(modalTypes.COMMENT_MODERATION)}
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
    amber: "text-amber-500",
  };

  const badgeColorMap = {
    teal: "text-teal-500 bg-teal-50",
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
    case modalTypes.NOTICE_MANAGE:
      return {
        title: "전체 공지 관리",
        subtitle: "Notice",
        // hint: "중요 공지 여부, 게시 기간 설정 및 상단 고정 처리 UI를 추천합니다.",
        content: <NoticeManage />,
      };

    case modalTypes.POST_MODERATION:
      return {
        title: "게시글 관리",
        subtitle: "Post",
        // hint: "신고 횟수 표시 + 삭제 사유 기록 UI를 추천합니다.",
        content: <PostModeration />,
      };

    case modalTypes.COMMENT_MODERATION:
      return {
        title: "댓글 관리",
        subtitle: "Comment",
        // hint: "부적절 댓글 필터링 및 삭제 로그 관리 UI를 추천합니다.",
        content: <CommentModeration />,
      };

    default:
      return {
        title: "시스템 및 커뮤니티",
        subtitle: "",
        hint: "",
      };
  }
}
