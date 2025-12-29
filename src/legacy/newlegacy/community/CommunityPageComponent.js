// src/pages/community/CommunityHomePage.js
import React, { useMemo, useState } from "react";

/** 더미 커뮤니티/이벤트/포토 데이터 */
const COMMUNITIES = [
  {
    id: 1,
    name: "블루러너스",
    desc: "밤 러닝 크루 • 초보 환영",
    img: "https://images.unsplash.com/photo-1520975693416-35a2aeac9d4d?q=80&w=1200&auto=format&fit=crop",
    color: "from-sky-400 to-blue-600",
    members: 186,
  },
  {
    id: 2,
    name: "코딩마당",
    desc: "프론트/백엔드 스터디",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    color: "from-indigo-400 to-sky-500",
    members: 342,
  },
  {
    id: 3,
    name: "아트클럽",
    desc: "드로잉 & 전시 관람",
    img: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=1200&auto=format&fit=crop",
    color: "from-fuchsia-400 to-pink-500",
    members: 129,
  },
  {
    id: 4,
    name: "보드게임연합",
    desc: "전략•파티게임 매주 모임",
    img: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?q=80&w=1200&auto=format&fit=crop",
    color: "from-emerald-400 to-teal-500",
    members: 208,
  },
  {
    id: 5,
    name: "사진동아리",
    desc: "필름/디지털 출사",
    img: "https://images.unsplash.com/photo-1542000551622-5e5c0c3f07de?q=80&w=1200&auto=format&fit=crop",
    color: "from-amber-400 to-orange-500",
    members: 97,
  },
  {
    id: 6,
    name: "뮤지션스",
    desc: "버스킹 & 밴드 합주",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    color: "from-rose-400 to-red-500",
    members: 155,
  },
];

const EVENTS = [
  { id: 1, title: "캠퍼스 플리마켓", when: "12/02 Sat 13:00", where: "학생회관 앞", cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, title: "오픈마이크 버스킹", when: "12/06 Fri 19:00", where: "중앙광장", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, title: "해커톤 24h", when: "12/14 Sat 10:00", where: "IT관 301", cover: "https://images.unsplash.com/photo-1532619675605-1ede6f9a1f52?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, title: "보드게임 나이트", when: "12/20 Fri 18:00", where: "동아리 라운지", cover: "https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=1200&auto=format&fit=crop" },
];

const PHOTOS = [
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508606572321-901ea443707f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
];

/** 텍스트 줄임 */
const clamp = (s, n = 70) => (s.length > n ? s.slice(0, n) + "…" : s);

export default function CommunityPageComponent() {
  const [likes, setLikes] = useState(() => Object.fromEntries(COMMUNITIES.map(c => [c.id, 0])));
  const tagCloud = useMemo(
    () => ["#러닝", "#코딩", "#전시", "#플리마켓", "#보드게임", "#버스킹", "#스터디", "#사진", "#취미", "#크루", "#친구", "#FUN"],
    []
  );

  const incLike = (id) => setLikes((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* 배경 블롭 */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 pt-12 pb-10">
          <div className="rounded-3xl border border-sky-100 bg-white/70 backdrop-blur-sm p-6 sm:p-10 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-sky-900">
                  커뮤니티의 커뮤니티 🎉
                </h1>
                <p className="mt-3 text-sky-700">
                  동아리 • 스터디 • 모임 • 이벤트—모든 즐거움이 한 곳에!
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-sky-600 px-5 py-3 text-white font-semibold shadow hover:bg-sky-700">
                    지금 참여하기
                  </button>
                  <button className="rounded-2xl border border-sky-200 bg-white px-5 py-3 text-sky-800 font-semibold hover:bg-sky-50">
                    만들기(새 커뮤니티)
                  </button>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop"
                  alt="커뮤니티 활동"
                  className="h-64 w-full object-cover rounded-2xl shadow-md"
                />
                <div className="absolute -bottom-4 -left-4 rotate-[-2deg] rounded-2xl bg-white shadow p-3">
                  <div className="text-xs font-semibold text-sky-600">지금 활성 커뮤니티</div>
                  <div className="text-lg font-extrabold text-sky-900">+{COMMUNITIES.length} clubs</div>
                </div>
              </div>
            </div>

            {/* 태그 마키 */}
            <div className="mt-8 overflow-hidden">
              <div className="flex gap-3 animate-[marquee_18s_linear_infinite] whitespace-nowrap will-change-transform">
                {tagCloud.concat(tagCloud).map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP COMMUNITIES */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-sky-900">인기 커뮤니티</h2>
          <button className="text-sky-700 hover:underline">전체 보기</button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITIES.map((c) => (
            <article key={c.id} className="group overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={c.img} alt={c.name} className="h-40 w-full object-cover" />
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.color}`} />
                <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
                  {c.members.toLocaleString()} members
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-sky-900">{c.name}</h3>
                <p className="mt-1 text-sky-700">{clamp(c.desc, 60)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50">
                    참여하기
                  </button>
                  <button
                    onClick={() => incLike(c.id)}
                    className="rounded-xl bg-pink-500/90 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-600"
                  >
                    ❤ {likes[c.id]}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EVENTS SCROLLER */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-sky-900">다가오는 이벤트</h2>
          <button className="text-sky-700 hover:underline">캘린더</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {EVENTS.map((e) => (
            <div key={e.id} className="min-w-[280px] max-w-sm flex-1 rounded-3xl border border-sky-100 bg-white shadow-sm overflow-hidden">
              <div className="relative">
                <img src={e.cover} alt={e.title} className="h-40 w-full object-cover" />
                <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
                  {e.when}
                </div>
              </div>
              <div className="p-4">
                <div className="text-lg font-bold text-sky-900">{e.title}</div>
                <div className="mt-1 text-sky-700 text-sm">📍 {e.where}</div>
                <div className="mt-3 flex justify-end">
                  <button className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                    참가 신청
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-sky-900">포토 갤러리</h2>
          <button className="text-sky-700 hover:underline">더 보기</button>
        </div>
        <div className="columns-2 sm:columns-3 gap-4 [column-fill:balance]">
          {PHOTOS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`community-${i}`}
              className="mb-4 w-full break-inside-avoid rounded-2xl shadow-sm hover:opacity-90"
            />
          ))}
        </div>
      </section>

      {/* TESTIMONIAL + CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-sky-600">후기</div>
            <blockquote className="mt-3 text-xl font-bold text-sky-900">
              “친구도 생기고, 하고 싶던 걸 마음껏 해봤어요.  
              주말마다 일정이 꽉 차는 게 이렇게 즐거운지 몰랐죠!”
            </blockquote>
            <div className="mt-3 text-sky-700">— 커뮤니티 회원 BLUE</div>
          </div>

          <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 p-6 text-white shadow-sm">
            <h3 className="text-xl font-extrabold">지금 당신의 FUN을 시작하세요!</h3>
            <p className="mt-2 text-white/90">
              버튼 하나로 커뮤니티 가입 · 이벤트 참가 · 새로운 모임 만들기까지.
            </p>
            <div className="mt-4 flex gap-3">
              <button className="rounded-2xl bg-white/90 px-4 py-2 font-semibold text-sky-700 hover:bg-white">
                커뮤니티 가입
              </button>
              <button className="rounded-2xl border border-white/70 px-4 py-2 font-semibold hover:bg-white/10">
                모임 만들기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-sm text-sky-600/80">
        © {new Date().getFullYear()} Community Hub
      </footer>

      {/* marquee keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
