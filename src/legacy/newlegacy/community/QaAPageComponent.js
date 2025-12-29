// src/pages/community/QnaPage.js
import React, { useMemo, useState } from "react";

/** 날짜 포맷 */
const fmt = (iso) =>
  new Date(iso).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

/** 더미 데이터 */
const SEED = [
  {
    id: 1,
    title: "JPA 지연로딩(N+1) 문제 어떻게 줄이나요?",
    author: "dev1",
    content:
      "게시글 상세 조회 시 연관 엔티티에서 N+1 발생합니다. fetch join과 @EntityGraph 중 어떤 게 더 적합할까요?",
    tags: ["JPA", "성능", "Spring"],
    createdAt: new Date(Date.now() - 36e5 * 20).toISOString(),
    views: 221,
    votes: 5,
    solved: false,
    answers: [
      {
        id: 11,
        author: "backend99",
        content:
          "리스트 화면은 DTO + fetch join, 상세는 batch-size + EntityGraph를 권장합니다. 컬렉션 fetch join 다중은 주의!",
        createdAt: new Date(Date.now() - 36e5 * 18).toISOString(),
        accepted: false,
      },
    ],
  },
  {
    id: 2,
    title: "Tailwind에서 모바일 우선으로 레이아웃 잡는 베스트 프랙티스?",
    author: "uiux",
    content:
      "grid와 flex를 혼용할 때 유의점이나, 추천 브레이크포인트 조합이 있으면 알려주세요.",
    tags: ["Tailwind", "CSS", "Responsive"],
    createdAt: new Date(Date.now() - 36e5 * 6).toISOString(),
    views: 140,
    votes: 3,
    solved: true,
    answers: [
      {
        id: 21,
        author: "css-owl",
        content:
          "모바일 기본 → md: 그리드 2열, lg: 3~4열. gap과 rounded의 일관성 유지, 컨테이너 max-w 기준 잡는 게 좋아요.",
        createdAt: new Date(Date.now() - 36e5 * 5).toISOString(),
        accepted: true,
      },
    ],
  },
  {
    id: 3,
    title: "React 상태관리: Context vs Redux Toolkit 무엇을 쓸까요?",
    author: "front",
    content:
      "페이지 규모가 커지는 중인데 API 캐싱과 비동기 핸들링을 깔끔하게 하고 싶습니다.",
    tags: ["React", "Redux", "State"],
    createdAt: new Date(Date.now() - 36e5 * 3).toISOString(),
    views: 88,
    votes: 6,
    solved: false,
    answers: [],
  },
];

const EMPTY_FORM_Q = { title: "", author: "", content: "", tags: [] };
const EMPTY_FORM_A = { author: "", content: "" };

export default function QaAPageComponent() {
  const [items, setItems] = useState(SEED);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest"); // latest | votes | views | unanswered
  const [filter, setFilter] = useState("all"); // all | solved | unsolved
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // 질문 수정 대상
  const [formQ, setFormQ] = useState(EMPTY_FORM_Q);

  // 답변 모달
  const [ansModal, setAnsModal] = useState({ open: false, qid: null });
  const [formA, setFormA] = useState(EMPTY_FORM_A);

  // 펼침(아코디언)
  const [expanded, setExpanded] = useState({}); // { [id]: boolean }

  const setQField = (k, v) => setFormQ((p) => ({ ...p, [k]: v }));
  const setAField = (k, v) => setFormA((p) => ({ ...p, [k]: v }));

  /** 검색/정렬/필터 */
  const processed = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = items.filter((it) => {
      if (filter === "solved" && !it.solved) return false;
      if (filter === "unsolved" && it.solved) return false;
      if (!q) return true;
      return (
        it.title.toLowerCase().includes(q) ||
        it.author.toLowerCase().includes(q) ||
        it.content.toLowerCase().includes(q) ||
        (it.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });

    arr.sort((a, b) => {
      if (sort === "votes") return b.votes - a.votes;
      if (sort === "views") return b.views - a.views;
      if (sort === "unanswered") {
        // 미해결 & 답변 없는 항목 먼저
        const aScore = (a.answers?.length || 0) + (a.solved ? 1000 : 0);
        const bScore = (b.answers?.length || 0) + (b.solved ? 1000 : 0);
        return aScore - bScore || new Date(b.createdAt) - new Date(a.createdAt);
      }
      // latest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return arr;
  }, [items, query, sort, filter]);

  /** 페이징 */
  const total = processed.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = processed.slice((page - 1) * pageSize, page * pageSize);

  /** 질문 작성/수정 모달 열기 */
  const openCreate = () => {
    setEditing(null);
    setFormQ(EMPTY_FORM_Q);
    setModalOpen(true);
  };
  const openEdit = (q) => {
    setEditing(q);
    setFormQ({
      title: q.title,
      author: q.author,
      content: q.content,
      tags: q.tags || [],
    });
    setModalOpen(true);
  };

  /** 질문 저장 */
  const saveQuestion = () => {
    const { title, author, content } = formQ;
    if (!title.trim() || !author.trim() || !content.trim()) {
      window.alert("제목/작성자/내용은 필수입니다.");
      return;
    }
    if (editing) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === editing.id
            ? {
                ...it,
                title: formQ.title.trim(),
                author: formQ.author.trim(),
                content: formQ.content.trim(),
                tags: (formQ.tags || []).map((t) => t.trim()).filter(Boolean),
              }
            : it
        )
      );
    } else {
      const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
      setItems((prev) => [
        {
          id: nextId,
          title: formQ.title.trim(),
          author: formQ.author.trim(),
          content: formQ.content.trim(),
          tags: (formQ.tags || []).map((t) => t.trim()).filter(Boolean),
          createdAt: new Date().toISOString(),
          views: 0,
          votes: 0,
          solved: false,
          answers: [],
        },
        ...prev,
      ]);
      setPage(1);
    }
    setModalOpen(false);
  };

  /** 질문 삭제 */
  const removeQuestion = (id) => {
    const q = items.find((i) => i.id === id);
    if (!q) return;
    if (window.confirm(`정말 삭제할까요?\n\n[${q.title}]`)) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  /** 질문 투표 */
  const vote = (id, delta) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, votes: Math.max(0, i.votes + delta) } : i
      )
    );

  /** 해결됨 토글 (답변이 있을 때만 허용) */
  const toggleSolved = (id) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, solved: i.answers?.length ? !i.solved : i.solved }
          : i
      )
    );

  /** 답변 모달 열기/저장 */
  const openAnswer = (qid) => {
    setAnsModal({ open: true, qid });
    setFormA(EMPTY_FORM_A);
  };
  const saveAnswer = () => {
    const { author, content } = formA;
    if (!author.trim() || !content.trim()) {
      window.alert("작성자/내용은 필수입니다.");
      return;
    }
    const qid = ansModal.qid;
    setItems((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              answers: [
                ...q.answers,
                {
                  id: Date.now(),
                  author: author.trim(),
                  content: content.trim(),
                  createdAt: new Date().toISOString(),
                  accepted: false,
                },
              ],
            }
          : q
      )
    );
    setAnsModal({ open: false, qid: null });
  };

  /** 답변 채택/해제 */
  const toggleAccept = (qid, aid) => {
    setItems((prev) =>
      prev.map((q) => {
        if (q.id !== qid) return q;
        const updatedAnswers = q.answers.map((a) =>
          a.id === aid
            ? { ...a, accepted: !a.accepted }
            : { ...a, accepted: false }
        );
        const anyAccepted = updatedAnswers.some((a) => a.accepted);
        return { ...q, answers: updatedAnswers, solved: anyAccepted };
      })
    );
  };

  /** 뷰 증가(상세 토글 시) */
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    // 펼칠 때만 view 카운트 증가
    if (!expanded[id]) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, views: i.views + 1 } : i))
      );
    }
  };

  /** 태그 Pill */
  const Tag = ({ t }) => (
    <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700">
      #{t}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 border-b border-sky-100 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-sky-800">Q&A</h1>
            <p className="text-sky-600 mt-1">
              질문하고 답변받는 지식 공유 공간
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            {/* 검색 */}
            <div className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-white px-3 py-2 shadow-sm">
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="size-5 text-sky-500"
                fill="currentColor"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l3.39 3.39a1 1 0 0 1-1.42 1.42l-3.38-3.4ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z" />
              </svg>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="제목/내용/태그/작성자 검색…"
                className="w-72 max-w-[68vw] bg-transparent outline-none placeholder:text-sky-400/80 text-sky-900"
                aria-label="질문 검색"
              />
            </div>

            {/* 필터 */}
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sky-800 font-medium"
              aria-label="필터"
            >
              <option value="all">전체</option>
              <option value="solved">해결됨</option>
              <option value="unsolved">미해결</option>
            </select>

            {/* 정렬 */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sky-800 font-medium"
              aria-label="정렬"
            >
              <option value="latest">최신순</option>
              <option value="votes">추천순</option>
              <option value="views">조회순</option>
              <option value="unanswered">미답변 우선</option>
            </select>

            {/* 질문하기 */}
            <button
              onClick={openCreate}
              className="rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              질문하기
            </button>
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {pageData.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center text-sky-700">
            표시할 질문이 없습니다.
          </div>
        ) : (
          <ul className="space-y-4">
            {pageData.map((q) => (
              <li
                key={q.id}
                className="rounded-2xl border border-sky-100 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <article className="p-5 sm:p-6">
                  <header className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2
                        className="text-lg sm:text-xl font-bold text-sky-800 hover:text-sky-900 cursor-pointer line-clamp-2"
                        onClick={() => toggleExpand(q.id)}
                        title="열기/닫기"
                      >
                        {q.title}
                      </h2>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sky-600">
                        <span className="font-medium">{q.author}</span>
                        <span className="opacity-50">•</span>
                        <time dateTime={q.createdAt}>{fmt(q.createdAt)}</time>
                        <span className="opacity-50">•</span>
                        <span>조회 {q.views.toLocaleString()}</span>
                        <span className="opacity-50">•</span>
                        <span>답변 {q.answers.length}</span>
                      </div>
                      {q.tags?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {q.tags.map((t, i) => (
                            <Tag key={i} t={t} />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 우측 상태/액션 */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => vote(q.id, +1)}
                          className="rounded-xl border border-sky-200 bg-sky-50 px-2 py-1 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                          aria-label="추천"
                          title="추천"
                        >
                          ▲
                        </button>
                        <span className="text-sky-800 font-bold w-6 text-center">
                          {q.votes}
                        </span>
                        <button
                          onClick={() => vote(q.id, -1)}
                          className="rounded-xl border border-sky-200 bg-sky-50 px-2 py-1 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                          aria-label="비추천"
                          title="비추천"
                        >
                          ▼
                        </button>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                          q.solved
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {q.solved ? "해결됨" : "미해결"}
                      </span>
                    </div>
                  </header>

                  {/* 펼침 내용 */}
                  {expanded[q.id] && (
                    <div className="mt-4">
                      <p className="text-sky-900/90 leading-relaxed whitespace-pre-wrap">
                        {q.content}
                      </p>

                      {/* 답변 리스트 */}
                      <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
                        <div className="mb-3 font-bold text-sky-800">
                          답변 {q.answers.length}개
                        </div>
                        {q.answers.length === 0 ? (
                          <div className="text-sky-700 text-sm">
                            아직 답변이 없습니다. 첫 답변을 남겨보세요!
                          </div>
                        ) : (
                          <ul className="space-y-3">
                            {q.answers.map((a) => (
                              <li
                                key={a.id}
                                className={`rounded-xl border p-3 ${
                                  a.accepted
                                    ? "bg-emerald-50 border-emerald-200"
                                    : "bg-white border-sky-100"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="text-sm text-sky-600">
                                    <span className="font-semibold">
                                      {a.author}
                                    </span>{" "}
                                    <span className="opacity-60">·</span>{" "}
                                    <time dateTime={a.createdAt}>
                                      {fmt(a.createdAt)}
                                    </time>
                                  </div>
                                  <button
                                    onClick={() => toggleAccept(q.id, a.id)}
                                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold border ${
                                      a.accepted
                                        ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200"
                                        : "bg-white text-sky-700 border-sky-200 hover:bg-sky-50"
                                    }`}
                                  >
                                    {a.accepted ? "채택 취소" : "답변 채택"}
                                  </button>
                                </div>
                                <div className="mt-2 text-sky-900/90 whitespace-pre-wrap">
                                  {a.content}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-4 text-right">
                          <button
                            onClick={() => openAnswer(q.id)}
                            className="rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                          >
                            답변 작성
                          </button>
                        </div>
                      </div>

                      {/* 하단 버튼들 */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleSolved(q.id)}
                          className={`rounded-xl px-3.5 py-2 text-sm font-semibold border ${
                            q.answers.length === 0
                              ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                              : q.solved
                              ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200"
                              : "bg-white text-sky-700 border-sky-200 hover:bg-sky-50"
                          }`}
                          disabled={q.answers.length === 0}
                        >
                          {q.solved ? "해결 해제" : "해결 표시"}
                        </button>
                        <button
                          onClick={() => openEdit(q)}
                          className="rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                        >
                          질문 수정
                        </button>
                        <button
                          onClick={() => removeQuestion(q.id)}
                          className="rounded-xl bg-sky-100 px-3.5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-200 border border-sky-200"
                        >
                          질문 삭제
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              </li>
            ))}
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

      {/* 질문 모달 */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-sky-900/20 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative z-30 w-full max-w-2xl rounded-2xl border border-sky-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
              <h3 className="text-lg font-bold text-sky-800">
                {editing ? "질문 수정" : "새 질문"}
              </h3>
              <button
                className="rounded-xl px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-50"
                onClick={() => setModalOpen(false)}
              >
                닫기
              </button>
            </div>

            <div className="px-5 py-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-sky-700">
                    제목
                  </span>
                  <input
                    value={formQ.title}
                    onChange={(e) => setQField("title", e.target.value)}
                    className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                    placeholder="질문 제목을 입력하세요"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-sky-700">
                    작성자
                  </span>
                  <input
                    value={formQ.author}
                    onChange={(e) => setQField("author", e.target.value)}
                    className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                    placeholder="이름"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-sky-700">내용</span>
                <textarea
                  value={formQ.content}
                  onChange={(e) => setQField("content", e.target.value)}
                  className="min-h-32 rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="문제 상황, 기대 결과, 시도한 방법 등을 자세히 적어주세요"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-sky-700">
                  태그 (쉼표로 구분)
                </span>
                <input
                  value={(formQ.tags || []).join(", ")}
                  onChange={(e) =>
                    setQField(
                      "tags",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="예) React, JPA, Tailwind"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 border-t border-sky-100 px-5 py-4">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-50"
              >
                취소
              </button>
              <button
                onClick={saveQuestion}
                className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 답변 모달 */}
      {ansModal.open && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-sky-900/20 backdrop-blur-sm"
            onClick={() => setAnsModal({ open: false, qid: null })}
          />
          <div className="relative z-30 w-full max-w-xl rounded-2xl border border-sky-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
              <h3 className="text-lg font-bold text-sky-800">답변 작성</h3>
              <button
                className="rounded-xl px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-50"
                onClick={() => setAnsModal({ open: false, qid: null })}
              >
                닫기
              </button>
            </div>

            <div className="px-5 py-4 space-y-3">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-sky-700">
                  작성자
                </span>
                <input
                  value={formA.author}
                  onChange={(e) => setAField("author", e.target.value)}
                  className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="이름"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-sky-700">내용</span>
                <textarea
                  value={formA.content}
                  onChange={(e) => setAField("content", e.target.value)}
                  className="min-h-32 rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="해결 방법, 참고 링크 등을 포함해주세요"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 border-t border-sky-100 px-5 py-4">
              <button
                onClick={() => setAnsModal({ open: false, qid: null })}
                className="rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-50"
              >
                취소
              </button>
              <button
                onClick={saveAnswer}
                className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-sm text-sky-600/80">
        © {new Date().getFullYear()} Q&A Board
      </footer>
    </div>
  );
}
