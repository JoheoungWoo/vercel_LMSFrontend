import React, { useState } from "react";

const mockPosts = [
  {
    id: 1,
    title: "2025 상반기 수강신청 통계 데이터",
    author: "컴공 3-1",
    tag: "CSV",
    createdAt: "2025-11-10",
    description: "학과/학년별 수강신청 패턴 정리본입니다.",
    downloads: 42,
  },
  {
    id: 2,
    title: "알고리즘 스터디 문제 난이도 분포",
    author: "알고리즘 스터디 A",
    tag: "JSON",
    createdAt: "2025-11-08",
    description: "주차별 문제 난이도 & 풀이율 데이터셋.",
    downloads: 31,
  },
  {
    id: 3,
    title: "그린대 학사 관리 시스템 더미 데이터",
    author: "Green Univ 팀",
    tag: "Excel",
    createdAt: "2025-11-05",
    description: "테스트용 학생/강의/수강 데이터 샘플입니다.",
    downloads: 57,
  },
];

const tagStyles = {
  CSV: "bg-emerald-100 text-emerald-700",
  JSON: "bg-sky-100 text-sky-700",
  Excel: "bg-amber-100 text-amber-700",
};

export default function DataSharingPageComponent() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  const filteredPosts = mockPosts.filter((post) => {
    const matchText =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === "ALL" || post.tag === selectedTag;
    return matchText && matchTag;
  });

  return (
    <div className="min-h-[calc(100vh-68px)] w-full bg-gradient-to-br from-sky-50 via-slate-50 to-emerald-50 px-4 py-8 md:px-10 lg:px-16">
      {/* 상단 헤더 */}
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 rounded-3xl border border-sky-100 bg-white/70 p-6 shadow-sm backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
              DATA HUB · GREEN UNIV
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">
              데이터 공유 게시판
            </h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              프로젝트, 과제, 스터디에 쓰이는 데이터셋을 서로 공유하고,
              <br className="hidden md:block" />
              다시 꺼내 쓸 수 있는 작은 데이터 라이브러리 공간이에요 📂
            </p>
          </div>

          {/* 업로드 버튼 카드 느낌 */}
          <div className="mt-4 w-full md:mt-0 md:w-auto">
            <button className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-sky-200 bg-sky-500/90 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lg md:px-6">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-lg">
                ⬆
              </span>
              데이터셋 업로드하기
              <span className="text-xs font-normal opacity-80">
                (추후 API 연동)
              </span>
            </button>
          </div>
        </div>

        {/* 검색 + 필터 바 */}
        <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur-md md:flex-row md:items-center md:justify-between">
          {/* 검색창 */}
          <div className="flex w-full items-center gap-2 md:w-2/3">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="제목이나 설명으로 검색해보세요"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-9 py-2 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* 태그 필터 */}
          <div className="flex flex-wrap items-center gap-2 md:w-1/3 md:justify-end">
            {["ALL", "CSV", "JSON", "Excel"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  selectedTag === tag
                    ? "bg-sky-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {tag === "ALL" ? "전체" : tag}
              </button>
            ))}
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr,1.1fr]">
          {/* 리스트 카드 */}
          <section className="rounded-3xl border border-slate-100 bg-white/90 p-4 shadow-sm backdrop-blur-md md:p-5">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h2 className="text-base font-semibold text-slate-900 md:text-lg">
                공유된 데이터셋
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                총 {filteredPosts.length}개
              </span>
            </div>

            {/* 테이블 비슷한 리스트 */}
            <div className="mt-3 space-y-2">
              {filteredPosts.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center text-sm text-slate-400">
                  <span className="text-xl">🪄</span>
                  <p>조건에 맞는 데이터셋이 없어요.</p>
                  <p>검색어를 바꾸거나 새로 업로드해볼까요?</p>
                </div>
              )}

              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/40 px-4 py-3 text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">
                        #{post.id.toString().padStart(3, "0")}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-900 md:text-base">
                        {post.title}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        tagStyles[post.tag] || "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {post.tag}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-xs text-slate-500 md:text-sm">
                    {post.description}
                  </p>

                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 md:text-xs">
                    <div className="flex items-center gap-3">
                      <span>작성자 · {post.author}</span>
                      <span>등록일 · {post.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        ⬇ <span>{post.downloads}</span>
                      </span>
                      <button className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700 transition group-hover:bg-sky-500 group-hover:text-white">
                        다운로드
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 오른쪽 사이드 박스들 */}
          <aside className="space-y-4">
            {/* 가이드 카드 */}
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-900 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                📌 업로드 가이드
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed">
                <li>개인정보(이름, 연락처 등)는 반드시 제거하고 업로드하기.</li>
                <li>파일명에 과목/주제/연도를 간단히 포함해 주면 좋아요.</li>
                <li>가능하면 컬럼 설명이 담긴 README도 같이 올리면 최고 ✨</li>
              </ul>
            </div>

            {/* 작은 통계 카드 */}
            <div className="rounded-3xl border border-slate-100 bg-white/90 p-4 text-sm text-slate-900 shadow-sm">
              <h2 className="text-sm font-semibold">이번 주 데이터 현황</h2>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-2xl bg-slate-50 px-2 py-3">
                  <p className="text-[11px] text-slate-400">업로드</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    7
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-2 py-3">
                  <p className="text-[11px] text-slate-400">다운로드</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    132
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-2 py-3">
                  <p className="text-[11px] text-slate-400">참여자</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    18
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
              </p>
            </div>

            {/* 공지/메모 카드 */}
            <div className="rounded-3xl border border-sky-100 bg-sky-50/80 p-4 text-xs text-slate-700 shadow-sm">
              <h2 className="mb-2 text-sm font-semibold text-slate-900">
                💬 한 줄 메모
              </h2>
              <p className="leading-relaxed">
                이 게시판은
                <br />
                <span className="font-semibold text-sky-700">
                  “데이터 재사용 + 협업”
                </span>
                을 위한 공간이에요.
                <br />
                한 번 만들어둔 데이터셋, 여기다가 잘 모아두고
                <br />
                프로젝트 끝나도 계속 써먹자! 🙌
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
