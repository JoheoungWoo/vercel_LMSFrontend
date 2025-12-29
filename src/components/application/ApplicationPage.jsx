// src/pages/community/ExtracurricularProgramsPage.js
import React, { useMemo, useState } from "react";

/** 날짜/시간 포맷 */
const dt = (iso) =>
  new Date(iso).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });

/** 더미 데이터 */
const SEED = [
  {
    id: 1,
    title: "리더십 캠프 1기",
    dept: "학생처",
    category: "리더십",
    cover: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop",
    startAt: new Date(Date.now() + 864e5 * 3).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 4).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 2).toISOString(),
    quota: 60,
    applied: 41,
    place: "체육관 세미나홀",
    point: 20,
    desc: "팀 빌딩 / 문제 해결 / 퍼실리테이션 실습 중심 집중 과정.",
  },
  {
    id: 2,
    title: "현직자 취업 멘토링",
    dept: "취업지원센터",
    category: "취업",
    cover: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    startAt: new Date(Date.now() + 864e5 * 7).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 7 + 36e5 * 3).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 6).toISOString(),
    quota: 30,
    applied: 28,
    place: "IT관 302",
    point: 5,
    desc: "개인 이력서/포트폴리오 1:1 피드백 및 커리어 Q&A.",
  },
  {
    id: 3,
    title: "교내 봉사데이",
    dept: "사회봉사센터",
    category: "봉사",
    cover: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    startAt: new Date(Date.now() + 864e5 * 1).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 1 + 36e5 * 5).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 1 - 36e5 * 12).toISOString(),
    quota: 120,
    applied: 120,
    place: "중앙광장",
    point: 10,
    desc: "캠퍼스 정화/기부 플리 등 함께 하는 하루 봉사.",
  },
  {
    id: 4,
    title: "창업 아이디어톤",
    dept: "창업지원단",
    category: "창업",
    cover: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
    startAt: new Date(Date.now() + 864e5 * 11).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 12).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 10).toISOString(),
    quota: 80,
    applied: 52,
    place: "메이커스페이스",
    point: 15,
    desc: "48시간 내 문제정의→솔루션→피칭까지 완주!",
  },
  {
    id: 5,
    title: "영어 스피킹 부트캠프",
    dept: "국제교류센터",
    category: "어학",
    cover: "https://images.unsplash.com/photo-1558021211-6d1403321394?q=80&w=1200&auto=format&fit=crop",
    startAt: new Date(Date.now() + 864e5 * 5).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 6).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 4).toISOString(),
    quota: 40,
    applied: 19,
    place: "어학원 201",
    point: 8,
    desc: "롤플레이/발표 위주 집중 스피킹 트레이닝.",
  },
  {
    id: 6,
    title: "컬처 나잇(전시·공연 관람)",
    dept: "학생문화원",
    category: "문화",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop",
    startAt: new Date(Date.now() + 36e5 * 60).toISOString(),
    endAt: new Date(Date.now() + 36e5 * 66).toISOString(),
    applyUntil: new Date(Date.now() + 36e5 * 48).toISOString(),
    quota: 50,
    applied: 50,
    place: "시내 아트센터",
    point: 4,
    desc: "야간 문화생활! 전시/공연 단체 관람과 간단한 리뷰 활동.",
  },
];

const CATEGORIES = ["전체", "리더십", "취업", "봉사", "창업", "어학", "문화"];

/** 진행 상태 계산 */
const getStatus = (p) => {
  const now = Date.now();
  if (new Date(p.applyUntil).getTime() < now || p.applied >= p.quota) return "마감";
  const left = new Date(p.applyUntil).getTime() - now;
  if (left < 1000 * 60 * 60 * 24 * 2) return "마감임박";
  return "모집중";
};

export default function ExtracurricularProgramsPage() {
  const [items, setItems] = useState(SEED);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("전체");
  const [sort, setSort] = useState("latest"); // latest | popular | closing
  const [bookmarks, setBookmarks] = useState(() => new Set());
  const [detail, setDetail] = useState(null); // 상세 모달
  const [applyModal, setApplyModal] = useState({ open: false, target: null }); // 신청 모달
  const [page, setPage] = useState(1);
  const pageSize = 6;

  /** 검색/필터/정렬 */
  const processed = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = items.filter((p) => (cat === "전체" ? true : p.category === cat));
    if (q) {
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.dept.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    arr.sort((a, b) => {
      if (sort === "popular") {
        const aRate = a.applied / a.quota;
        const bRate = b.applied / b.quota;
        return bRate - aRate;
      }
      if (sort === "closing") {
        return new Date(a.applyUntil) - new Date(b.applyUntil);
      }
      // latest: 시작일 빠른 순(최신 공개 느낌)
      return new Date(a.startAt) - new Date(b.startAt);
    });
    return arr;
  }, [items, cat, query, sort]);

  /** 페이징 */
  const total = processed.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = processed.slice((page - 1) * pageSize, page * pageSize);

  /** 북마크 토글 */
  const toggleBm = (id) =>
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  /** 신청 버튼 액션 (모달로 처리) */
  const openApply = (p) => setApplyModal({ open: true, target: p });
  const doApply = (name) => {
    const target = applyModal.target;
    if (!target) return;
    setItems((prev) =>
      prev.map((p) =>
        p.id === target.id && p.applied < p.quota
          ? { ...p, applied: p.applied + 1 }
          : p
      )
    );
    setApplyModal({ open: false, target: null });
    alert(`${name}님, 신청이 접수되었습니다.`);
  };

  /** 상태 뱃지 */
  const StatusBadge = ({ status }) => {
    const cls =
      status === "모집중"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : status === "마감임박"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-slate-100 text-slate-600 border-slate-200";
    return (
      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
        {status}
      </span>
    );
  };

  /** 진행률 바 */
  const Progress = ({ applied, quota }) => {
    const pct = Math.min(100, Math.round((applied / quota) * 100));
    return (
      <div className="mt-2">
        <div className="h-2 rounded-full bg-sky-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-600"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-sky-700">
          {applied} / {quota} ({pct}%)
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      {/* 헤더/검색/필터 바 */}
      <div className="sticky top-0 z-10 border-b border-sky-100 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-sky-800">비교과 프로그램</h1>
            <p className="text-sky-600 mt-1">리더십·취업·봉사·창업·어학·문화 프로그램을 한눈에!</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            {/* 검색 */}
            <div className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-white px-3 py-2 shadow-sm">
              <svg aria-hidden viewBox="0 0 20 20" className="size-5 text-sky-500" fill="currentColor">
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l3.39 3.39a1 1 0 0 1-1.42 1.42l-3.38-3.4ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z" />
              </svg>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="제목/부서/내용 검색…"
                className="w-72 max-w-[68vw] bg-transparent outline-none placeholder:text-sky-400/80 text-sky-900"
                aria-label="프로그램 검색"
              />
            </div>

            {/* 카테고리 */}
            <select
              value={cat}
              onChange={(e) => {
                setCat(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sky-800 font-medium"
              aria-label="카테고리"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* 정렬 */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sky-800 font-medium"
              aria-label="정렬"
            >
              <option value="latest">시작일순</option>
              <option value="popular">인기순</option>
              <option value="closing">마감 임박순</option>
            </select>
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {pageData.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center text-sky-700">
            표시할 프로그램이 없습니다.
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageData.map((p) => {
              const status = getStatus(p);
              return (
                <li
                  key={p.id}
                  className="group overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img src={p.cover} alt={p.title} className="h-40 w-full object-cover" />
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-blue-600" />
                    <div className="absolute left-2 top-2 flex gap-2">
                      <StatusBadge status={status} />
                      <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white">
                        {p.category}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleBm(p.id)}
                      aria-label="관심 등록"
                      className={`absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow ${
                        bookmarks.has(p.id) ? "text-pink-600" : "text-sky-700"
                      }`}
                      title="관심 등록"
                    >
                      {bookmarks.has(p.id) ? "❤" : "♡"}
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-sky-900 line-clamp-2">{p.title}</h3>
                    <div className="mt-1 text-sm text-sky-700 flex flex-wrap gap-x-2 gap-y-1">
                      <span className="font-semibold">{p.dept}</span>
                      <span className="opacity-50">•</span>
                      <span>{p.place}</span>
                    </div>
                    <div className="mt-1 text-sm text-sky-700">
                      <span className="opacity-70">🗓</span>{" "}
                      {dt(p.startAt)} ~ {dt(p.endAt)}
                    </div>

                    <Progress applied={p.applied} quota={p.quota} />

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={() => setDetail(p)}
                        className="rounded-xl border border-sky-200 bg-white px-3.5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50"
                      >
                        상세 보기
                      </button>
                      <button
                        onClick={() => openApply(p)}
                        disabled={status === "마감"}
                        className={`rounded-xl px-3.5 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                          status === "마감"
                            ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed"
                            : "bg-sky-600 text-white hover:bg-sky-700"
                        }`}
                      >
                        신청하기 (+{p.point}p)
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* 페이지네이션 */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-sm text-sky-700 disabled:opacity-40"
          >
            이전
          </button>
          <div className="text-sky-700 text-sm">
            {page} / {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-sm text-sky-700 disabled:opacity-40"
          >
            다음
          </button>
        </div>
      </main>

      {/* 상세 모달 */}
      {detail && (
        <div className="fixed inset-0 z-20 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-sky-900/20 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <div className="relative z-30 w-full max-w-2xl overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
              <h3 className="text-lg font-bold text-sky-800">{detail.title}</h3>
              <button className="rounded-xl px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-50" onClick={() => setDetail(null)}>
                닫기
              </button>
            </div>

            <div className="max-h-[72vh] overflow-y-auto">
              <img src={detail.cover} alt={detail.title} className="h-52 w-full object-cover" />
              <div className="p-5 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={getStatus(detail)} />
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-200">
                    {detail.category}
                  </span>
                  <span className="text-sky-700 text-sm font-semibold">{detail.dept}</span>
                </div>
                <div className="text-sky-900/90 leading-relaxed whitespace-pre-wrap">
                  {detail.desc}
                </div>
                <div className="grid gap-2 sm:grid-cols-2 text-sm text-sky-800">
                  <div>🗓 기간: {dt(detail.startAt)} ~ {dt(detail.endAt)}</div>
                  <div>⏰ 신청 마감: {dt(detail.applyUntil)}</div>
                  <div>📍 장소: {detail.place}</div>
                  <div>🎁 비교과 포인트: {detail.point}p</div>
                  <div>👥 정원: {detail.applied} / {detail.quota}</div>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setDetail(null)}
                    className="rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-50"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => openApply(detail)}
                    disabled={getStatus(detail) === "마감"}
                    className={`rounded-xl px-4 py-2 font-semibold ${
                      getStatus(detail) === "마감"
                        ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed"
                        : "bg-sky-600 text-white hover:bg-sky-700"
                    }`}
                  >
                    신청하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 신청 모달 */}
      {applyModal.open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-sky-900/20 backdrop-blur-sm" onClick={() => setApplyModal({ open: false, target: null })} />
          <div className="relative z-40 w-full max-w-md rounded-2xl border border-sky-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
              <h3 className="text-lg font-bold text-sky-800">신청서</h3>
              <button
                className="rounded-xl px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-50"
                onClick={() => setApplyModal({ open: false, target: null })}
              >
                닫기
              </button>
            </div>

            <ApplyForm
              target={applyModal.target}
              onCancel={() => setApplyModal({ open: false, target: null })}
              onSubmit={(name) => doApply(name)}
            />
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-sm text-sky-600/80">
        © {new Date().getFullYear()} Extracurricular Programs
      </footer>
    </div>
  );
}

/** 신청서 폼 (간단 검증) */
function ApplyForm({ target, onCancel, onSubmit }) {
  const [name, setName] = useState("");
  const [sid, setSid] = useState("");
  const [memo, setMemo] = useState("");

  const valid = name.trim() && /^[0-9]{8}$/.test(sid); // 학번 8자리 예시

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        onSubmit(name.trim());
      }}
      className="px-5 py-4 space-y-3"
    >
      <div className="text-sky-700 text-sm">프로그램: <span className="font-semibold text-sky-900">{target?.title}</span></div>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-sky-700">이름</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="홍길동"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-sky-700">학번 (8자리)</span>
        <input
          value={sid}
          onChange={(e) => setSid(e.target.value.replace(/\D/g, "").slice(0, 8))}
          className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="20251234"
          inputMode="numeric"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-sky-700">메모 (선택)</span>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="min-h-24 rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="팀원과 함께 신청합니다 등"
        />
      </label>

      <div className="flex justify-end gap-2 pt-2 border-t border-sky-100">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!valid}
          className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
        >
          신청하기
        </button>
      </div>
    </form>
  );
}
