import React, { useMemo, useState } from "react";

// ClubPage — JS + React + TailwindCSS
// 파란 톤/rounded/가독성/반응형 + 글쓰기·수정·삭제 + 더미데이터 포함

const fmt = (iso) =>
  new Date(iso).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const SEED = [
  {
    id: 1,
    title: "신입 부원 모집 공고",
    author: "홍길동",
    club: "푸른하늘 밴드",
    content:
      "3월 정기공연을 함께할 신입 부원을 모집합니다! 악기 경험 없어도 환영해요. 매주 수/금 18:30 동아리방에서 만나요.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    views: 128,
    tags: ["모집", "공연"],
  },
  {
    id: 2,
    title: "주간 번개 농구 모임",
    author: "이서준",
    club: "블루스톰 농구",
    content:
      "이번 주 토요일 오전 10시 체육관 B코트 예약 완료! 초보/경험자 모두 참여 가능. 물 꼭 챙겨오세요.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    views: 76,
    tags: ["번개", "체육"],
  },
  {
    id: 3,
    title: "프론트엔드 스터디 2기",
    author: "김유라",
    club: "코딩마당",
    content:
      "React + Tailwind 기초 스터디 6주 과정. 매주 화 19:00, 과제 리뷰 & 미니 프로젝트 진행합니다.",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    views: 42,
    tags: ["스터디", "IT"],
  },
];

const EMPTY_FORM = {
  title: "",
  author: "",
  club: "",
  content: "",
  tags: [],
};

export default function ClubPageComponent() {
  const [posts, setPosts] = useState(SEED);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // 현재 수정 중인 post 또는 null
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.club.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, query]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title,
      author: p.author,
      club: p.club,
      content: p.content,
      tags: p.tags || [],
    });
    setModalOpen(true);
  };

  const remove = (id) => {
    const target = posts.find((p) => p.id === id);
    if (!target) return;
    if (window.confirm(`정말 삭제할까요?\n\n[${target.title}]`)) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const save = () => {
    const { title, author, club, content } = form;
    if (!title.trim() || !author.trim() || !club.trim() || !content.trim()) {
      alert("제목/작성자/동아리/내용은 필수입니다.");
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
                club: form.club.trim(),
                content: form.content.trim(),
                tags: (form.tags || []).map((t) => t.trim()).filter(Boolean),
              }
            : p
        )
      );
    } else {
      const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
      const newPost = {
        id: nextId,
        title: form.title.trim(),
        author: form.author.trim(),
        club: form.club.trim(),
        content: form.content.trim(),
        tags: (form.tags || []).map((t) => t.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
        views: 0,
      };
      setPosts((prev) => [newPost, ...prev]);
    }

    setModalOpen(false);
  };

  const setField = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-sky-50 to-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b border-sky-100">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-sky-800">
            동아리 게시판
          </h1>
          <div className="flex gap-2">
            <button
              onClick={openCreate}
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              글쓰기
            </button>
          </div>
        </div>

        {/* 검색바 */}
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <div className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-white px-4 py-2 shadow-sm">
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="size-5 text-sky-500 shrink-0"
              fill="currentColor"
            >
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l3.39 3.39a1 1 0 0 1-1.42 1.42l-3.38-3.4ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="제목, 작성자, 동아리, 태그 검색…"
              className="w-full bg-transparent outline-none placeholder:text-sky-400/80 text-sky-900"
              aria-label="게시글 검색"
            />
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center text-sky-700">
            검색 결과가 없습니다.
          </div>
        ) : (
          <ul className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {filtered.map((p) => (
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
                      <span className="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-200">
                        {p.club}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sky-600">
                      <span className="font-medium">{p.author}</span>
                      <span className="opacity-50">•</span>
                      <time dateTime={p.createdAt}>{fmt(p.createdAt)}</time>
                      <span className="opacity-50">•</span>
                      <span>조회 {p.views.toLocaleString()}</span>
                    </div>
                    {p.tags && p.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.map((t, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </header>

                  <p className="text-sky-900/90 leading-relaxed">
                    {p.content.length > 140 ? p.content.slice(0, 140) + "…" : p.content}
                  </p>

                  <footer className="mt-5 flex items-center justify-between">
                    <button
                      onClick={() => alert("상세 페이지로 이동하도록 라우팅 연결하세요.")}
                      className="rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                    >
                      자세히
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        aria-label={`${p.title} 수정`}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="rounded-xl bg-sky-100 px-3.5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-200 border border-sky-200"
                        aria-label={`${p.title} 삭제`}
                      >
                        삭제
                      </button>
                    </div>
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        )}
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
                <span className="text-sm font-semibold text-sky-700">동아리</span>
                <input
                  value={form.club}
                  onChange={(e) => setField("club", e.target.value)}
                  className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="예) 푸른하늘 밴드"
                />
              </label>

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
                  placeholder="예) 모집, 공연"
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
        © {new Date().getFullYear()} Club Board
      </footer>
    </div>
  );
}
