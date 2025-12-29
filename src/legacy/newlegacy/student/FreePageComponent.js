// src/pages/community/FreeBoardPage.js
import React, { useMemo, useState } from "react";

/** 날짜 포맷 */
const fmt = (iso) =>
  new Date(iso).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });

/** 더미 데이터 */
const SEED = [
  {
    id: 1,
    title: "캠퍼스 벼룩시장 열까요?",
    author: "BLUE",
    content:
      "중고 교재/전자기기 교환하는 플리마켓 어떠세요? 장소는 학생회관 앞 광장 생각중!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    views: 301,
    likes: 12,
    tags: ["플리", "행사"],
    pinned: true, // 공지 고정
  },
  {
    id: 2,
    title: "야간 러닝 크루 모집",
    author: "RUN_9PM",
    content: "화·목 저녁 9시, 운동장 트랙에서 5km 러닝! 초보 환영합니다.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    views: 122,
    likes: 5,
    tags: ["운동"],
    pinned: false,
  },
  {
    id: 3,
    title: "노트 쉐어 합니다 (자료 링크)",
    author: "유라",
    content:
      "자료구조/운영체제 정리 노트 공유해요. 구글 드라이브 링크 댓글로 드릴게요!",
    createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    views: 98,
    likes: 7,
    tags: ["공부", "자료"],
    pinned: false,
  },
];

const EMPTY_FORM = { title: "", author: "", content: "", tags: [] };

export default function FreePageComponent() {
  const [posts, setPosts] = useState(SEED);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest"); // latest | views | likes
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  /** 정렬/검색 결과 */
  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const arr = posts
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      )
      .sort((a, b) => {
        // pinned(공지)는 항상 위
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        if (sort === "views") return b.views - a.views;
        if (sort === "likes") return b.likes - a.likes;
        // latest
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

    return arr;
  }, [posts, query, sort]);

  /** 페이징 */
  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = filteredSorted.slice((page - 1) * pageSize, page * pageSize);

  /** 폼 핸들러 */
  const setField = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  /** 글쓰기 열기 */
  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  /** 수정 열기 */
  const openEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title,
      author: p.author,
      content: p.content,
      tags: p.tags || [],
    });
    setModalOpen(true);
  };

  /** 저장 (생성/수정) */
  const save = () => {
    const { title, author, content } = form;
    if (!title.trim() || !author.trim() || !content.trim()) {
      alert("제목/작성자/내용은 필수입니다.");
      return;
    }

    if (editing) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? {
                ...p,
                title: form.title.trim(),
                author: form.author.trim(),
                content: form.content.trim(),
                tags: (form.tags || []).map((t) => t.trim()).filter(Boolean),
              }
            : p
        )
      );
    } else {
      const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
      setPosts((prev) => [
        {
          id: nextId,
          title: form.title.trim(),
          author: form.author.trim(),
          content: form.content.trim(),
          tags: (form.tags || []).map((t) => t.trim()).filter(Boolean),
          createdAt: new Date().toISOString(),
          views: 0,
          likes: 0,
          pinned: false,
        },
        ...prev,
      ]);
      setPage(1);
    }
    setModalOpen(false);
  };

  /** 삭제 */
  const remove = (id) => {
    const target = posts.find((p) => p.id === id);
    if (!target) return;
    if (window.confirm(`정말 삭제할까요?\n\n[${target.title}]`)) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  /** 좋아요 */
  const like = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  /** 공지 고정 토글 */
  const togglePin = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p))
    );
  };

  /** 태그 Pill */
  const Tag = ({ t }) => (
    <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700">
      #{t}
    </span>
  );

  return (
    <div className="w-full max-w-[80%] max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b border-sky-100">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-sky-800">
            자유게시판
          </h1>

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
                placeholder="제목/작성자/내용/태그 검색…"
                className="w-full bg-transparent outline-none placeholder:text-sky-400/80 text-sky-900"
                aria-label="게시글 검색"
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
              <option value="views">조회순</option>
              <option value="likes">좋아요순</option>
            </select>

            {/* 글쓰기 */}
            <button
              onClick={openCreate}
              className="rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {pageData.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center text-sky-700">
            검색 결과가 없습니다.
          </div>
        ) : (
          <ul className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {pageData.map((p) => (
              <li
                key={p.id}
                className="group rounded-2xl border border-sky-100 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <article className="p-5 sm:p-6">
                  <header className="mb-3">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg sm:text-xl font-bold text-sky-800 group-hover:text-sky-900 line-clamp-2">
                        {p.title}
                      </h2>
                      <div className="flex items-center gap-2">
                        {p.pinned && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                            공지
                          </span>
                        )}
                        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-200">
                          조회 {p.views.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sky-600">
                      <span className="font-medium">{p.author}</span>
                      <span className="opacity-50">•</span>
                      <time dateTime={p.createdAt}>{fmt(p.createdAt)}</time>
                      <span className="opacity-50">•</span>
                      <button
                        onClick={() => like(p.id)}
                        className="rounded-lg border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                        aria-label={`${p.title} 좋아요`}
                      >
                        ❤️ {p.likes}
                      </button>
                    </div>

                    {p.tags?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.map((t, i) => (
                          <Tag key={i} t={t} />
                        ))}
                      </div>
                    )}
                  </header>

                  <p className="text-sky-900/90 leading-relaxed">
                    {p.content.length > 160 ? p.content.slice(0, 160) + "…" : p.content}
                  </p>

                  <footer className="mt-5 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert("상세 페이지 라우팅을 연결하세요.")}
                        className="rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                      >
                        자세히
                      </button>
                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="rounded-xl bg-sky-100 px-3.5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-200 border border-sky-200"
                      >
                        삭제
                      </button>
                    </div>

                    <button
                      onClick={() => togglePin(p.id)}
                      className={`rounded-xl px-3.5 py-2 text-sm font-semibold border ${
                        p.pinned
                          ? "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
                          : "bg-white text-sky-700 border-sky-200 hover:bg-sky-50"
                      }`}
                    >
                      {p.pinned ? "공지 해제" : "공지 고정"}
                    </button>
                  </footer>
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

      {/* 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-sky-900/20 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative z-30 w-full max-w-2xl rounded-2xl border border-sky-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
              <h3 className="text-lg font-bold text-sky-800">{editing ? "게시글 수정" : "새 게시글"}</h3>
              <button className="rounded-xl px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-50" onClick={() => setModalOpen(false)}>
                닫기
              </button>
            </div>

            <div className="px-5 py-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-sky-700">제목</span>
                  <input
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                    placeholder="제목을 입력하세요"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-sky-700">작성자</span>
                  <input
                    value={form.author}
                    onChange={(e) => setField("author", e.target.value)}
                    className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                    placeholder="이름"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-sky-700">내용</span>
                <textarea
                  value={form.content}
                  onChange={(e) => setField("content", e.target.value)}
                  className="min-h-32 rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="내용을 입력하세요"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-sky-700">태그 (쉼표로 구분)</span>
                <input
                  value={(form.tags || []).join(", ")}
                  onChange={(e) =>
                    setField(
                      "tags",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="예) 플리, 행사"
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
                onClick={save}
                className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-sm text-sky-600/80">
        © {new Date().getFullYear()} Free Board
      </footer>
    </div>
  );
}
