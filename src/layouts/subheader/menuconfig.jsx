export const menus = {
  // ───────────────────────── ADMIN ─────────────────────────
  ADMIN: [
    // ───────── 학사 관리 ─────────
    {
      label: "학사 관리",
      to: "/admin/academic",
    },

    // ───────── 재정 관리 ─────────
    {
      label: "재정 관리",
      to: "/admin/finance",
    },

    // ───────── 시스템 관리 ─────────
    {
      label: "시스템 관리",
      to: "/admin/system",
    },

    // ───────── 사용자 · 권한 관리 ─────────
    {
      label: "사용자 관리",
      to: "/admin/user",
    },
  ],

  // ─────────────────────── PROFESSOR ───────────────────────
  PROFESSOR: [
    // ───────── 강의 · 수업 관리 ─────────
    {
      label: "강의 관리",
      to: "/professor/academic",
    },

    // ───────── 성적 관리 ─────────
    {
      label: "성적 관리",
      to: "/professor/grade",
    },

    // ───────── 강의 평가 · 리뷰 ─────────
    {
      label: "강의 평가",
      to: "/professor/review",
    },
  ],

  // ──────────────────────── STUDENT ────────────────────────
  STUDENT: [
    // ───────── 수업 · 수강 관리 ─────────
    {
      label: "수강 관리",
      to: "/student/academic",
    },

    // ───────── 커뮤니티 · 게시판 ─────────
    {
      label: "커뮤니티",
      to: "/student/community",
    },

    // ───────── 등록금 · 재정 ─────────
    {
      label: "재정 정보",
      to: "/student/finance",
    },

    // ───────── 성적 조회 ─────────
    {
      label: "성적 조회",
      to: "/student/grade",
    },

    // ───────── 마이페이지 · 사용자 ─────────
    {
      label: "내 정보",
      to: "/student/user",
    },
  ],
};
