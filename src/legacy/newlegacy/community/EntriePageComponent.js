// src/pages/community/BoardsHubPage.js
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/** 날짜 포맷 */
const fmt = (iso) =>
  new Date(iso).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });

/** 더미 데이터 (최신글 3개씩) */
const SEED = {
  notice: [
    { id: 1, title: "학사 일정 공지(1학기)", author: "교무처", createdAt: new Date(Date.now()-864e5*2).toISOString() },
    { id: 2, title: "도서관 리모델링 안내", author: "도서관", createdAt: new Date(Date.now()-864e5*5).toISOString() },
    { id: 3, title: "기숙사 점검 일정", author: "학생처", createdAt: new Date(Date.now()-864e5*7).toISOString() },
  ],
  free: [
    { id: 11, title: "벼룩시장 할 사람~", author: "BLUE", createdAt: new Date(Date.now()-36e5*6).toISOString() },
    { id: 12, title: "밤 러닝 크루 모집", author: "RUN_9PM", createdAt: new Date(Date.now()-36e5*10).toISOString() },
    { id: 13, title: "운영체제 노트 공유", author: "유라", createdAt: new Date(Date.now()-36e5*15).toISOString() },
  ],
  club: [
    { id: 21, title: "밴드부 신입 모집", author: "푸른하늘 밴드", createdAt: new Date(Date.now()-36e5*2).toISOString() },
    { id: 22, title: "농구 번개 공지", author: "블루스톰", createdAt: new Date(Date.now()-36e5*8).toISOString() },
    { id: 23, title: "프엔 스터디 2기", author: "코딩마당", createdAt: new Date(Date.now()-36e5*20).toISOString() },
  ],
  department: [
    { id: 31, title: "기계과 캡스톤 OT", author: "기계", createdAt: new Date(Date.now()-864e5).toISOString() },
    { id: 32, title: "화학과 실험실 안전교육", author: "화학", createdAt: new Date(Date.now()-864e5*3).toISOString() },
    { id: 33, title: "생명과학 세미나", author: "생명과학", createdAt: new Date(Date.now()-864e5*6).toISOString() },
  ],
  qna: [
    { id: 41, title: "JPA 지연로딩 질문", author: "dev1", createdAt: new Date(Date.now()-36e5*4).toISOString() },
    { id: 42, title: "Tailwind 반응형 팁?", author: "uiux", createdAt: new Date(Date.now()-36e5*12).toISOString() },
    { id: 43, title: "리액트 상태관리 추천", author: "front", createdAt: new Date(Date.now()-36e5*30).toISOString() },
  ],
  files: [
    { id: 51, title: "자료구조 요약 PDF", author: "스터디A", createdAt: new Date(Date.now()-864e5*2).toISOString() },
    { id: 52, title: "네트워크 정리 PPT", author: "스터디B", createdAt: new Date(Date.now()-864e5*9).toISOString() },
    { id: 53, title: "DB 쿼리 치트시트", author: "스터디C", createdAt: new Date(Date.now()-864e5*10).toISOString() },
  ],
};

/** 보드 메타 (링크 경로/색) */
const BOARDS = [
  { key: "notice", name: "공지사항", path: "/notice", color: "from-sky-500 to-blue-600" },
  { key: "free", name: "자유게시판", path: "/free", color: "from-sky-400 to-sky-600" },
  { key: "club", name: "동아리 게시판", path: "/club", color: "from-cyan-400 to-sky-500" },
  { key: "department", name: "학과 게시판", path: "/department", color: "from-blue-400 to-blue-700" },
  { key: "qna", name: "Q&A", path: "/qna", color: "from-indigo-400 to-sky-600" },
  { key: "files", name: "자료실", path: "/files", color: "from-sky-300 to-blue-500" },
];

export default function EntriePageComponent() {
  const nav = useNavigate();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest"); // latest | alpha

  /** 전역 검색(모든 보드의 최신글 타이틀/작성자 대상) */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const arr = BOARDS.flatMap((b) =>
      (SEED[b.key] || []).map((p) => ({ ...p, boardKey: b.key, boardName: b.name, path: b.path }))
    ).filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.boardName.toLowerCase().includes(q)
    );

    if (sort === "alpha") {
      arr.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    } else {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return arr.slice(0, 8); // 상위 8개만 노출
  }, [query, sort]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      {/* 상단 헤더/검색/요약 */}
      <div className="sticky top-0 z-10 border-b border-sky-100 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-sky-800">전체 게시판</h1>
              <p className="text-sky-600 mt-1">모든 게시판을 한 곳에서 빠르게 탐색하세요.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              {/* 검색 */}
              <div className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-white px-3 py-2 shadow-sm">
                <svg aria-hidden viewBox="0 0 20 20" className="size-5 text-sky-500" fill="currentColor">
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l3.39 3.39a1 1 0 0 1-1.42 1.42l-3.38-3.4ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="게시판/제목/작성자 통합 검색…"
                  className="w-72 max-w-[68vw] bg-transparent outline-none placeholder:text-sky-400/80 text-sky-900"
                  aria-label="통합 검색"
                />
              </div>

              {/* 정렬 */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sky-800 font-medium"
                aria-label="정렬"
              >
                <option value="latest">최신순</option>
                <option value="alpha">제목순</option>
              </select>
            </div>
          </div>

          {/* 검색 결과 바 */}
          {query && (
            <div className="mt-4 rounded-3xl border border-sky-100 bg-white p-3">
              {results.length === 0 ? (
                <div className="text-sky-700 text-sm px-2 py-1">검색 결과가 없습니다.</div>
              ) : (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {results.map((r) => (
                    <li
                      key={`${r.boardKey}-${r.id}`}
                      className="flex items-center justify-between rounded-2xl bg-sky-50 border border-sky-100 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-sky-800 truncate">
                          [{r.boardName}] {r.title}
                        </div>
                        <div className="text-xs text-sky-600">
                          {r.author} · <time dateTime={r.createdAt}>{fmt(r.createdAt)}</time>
                        </div>
                      </div>
                      <button
                        onClick={() => nav(r.path)}
                        className="ml-3 shrink-0 rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50"
                      >
                        이동
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 보드 카드 그리드 */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BOARDS.map((b) => (
            <article
              key={b.key}
              className={`group rounded-3xl border border-sky-100 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden`}
            >
              {/* 상단 색 띠 + 라벨 */}
              <div className={`h-2 w-full bg-gradient-to-r ${b.color}`} />
              <div className="p-5">
                <header className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-sky-800">{b.name}</h2>
                  <span className="rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold px-3 py-1">
                    최신 {SEED[b.key]?.length ?? 0}건
                  </span>
                </header>

                {/* 최신글 미리보기 */}
                <ul className="space-y-2">
                  {(SEED[b.key] || []).slice(0, 3).map((p) => (
                    <li
                      key={p.id}
                      className="rounded-2xl border border-sky-100 bg-sky-50/70 px-3 py-2 hover:bg-sky-50"
                    >
                      <div className="text-sm font-semibold text-sky-900 truncate">
                        {p.title}
                      </div>
                      <div className="text-xs text-sky-600">
                        {p.author} · <time dateTime={p.createdAt}>{fmt(p.createdAt)}</time>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* 액션 */}
                <div className="mt-5 flex items-center justify-between">
                  <button
                    onClick={() => nav(b.path)}
                    className="rounded-xl border border-sky-200 bg-white px-3.5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50"
                    aria-label={`${b.name} 바로가기`}
                  >
                    바로가기
                  </button>
                  <button
                    onClick={() => {
                      // 보드별 글쓰기 페이지가 분리되어 있지 않다면, 해당 보드로 이동 후 모달 열기 방식을 추천
                      nav(b.path);
                      // 전역 상태/컨텍스트로 "글쓰기 모달 열기" 이벤트를 쏘는 구조를 붙이면 좋음.
                      // 여기서는 데모라 안내만:
                      setTimeout(() => window.alert(`${b.name}에서 글쓰기 UI를 열도록 연결하세요.`), 50);
                    }}
                    className="rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    aria-label={`${b.name} 글쓰기`}
                  >
                    글쓰기
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* 하단 안내 카드 (옵션) */}
        <section className="mt-8">
          <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6">
            <h3 className="text-lg font-bold text-sky-800">팁</h3>
            <p className="mt-2 text-sky-700">
              게시판별 상세 페이지에서 라우팅/CRUD/댓글/페이지네이션을 붙이면 완성도 있는 포털이 됩니다.
              전역 검색은 알림/읽음표시/권한(학생/교직원)과도 쉽게 연동할 수 있어요.
            </p>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-sm text-sky-600/80">
        © {new Date().getFullYear()} Boards Hub
      </footer>
    </div>
  );
}
