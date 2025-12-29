// src/pages/community/ExtracurricularAboutPage.js
import React from "react";

export default function ExtracurricularAboutPage() {
  const bullets = [
    { title: "역량 강화", desc: "리더십 · 협업 · 문제해결 등 핵심 소프트스킬 향상", icon: "⭐" },
    { title: "진로 탐색", desc: "현직자 특강/멘토링으로 진로·취업 로드맵 설계", icon: "🧭" },
    { title: "학내 네트워킹", desc: "학과/학년을 넘나드는 커뮤니티 활동", icon: "🤝" },
    { title: "포인트/인증", desc: "비교과 포인트·이수 인증으로 역량지수 관리", icon: "🎓" },
  ];

  const categories = [
    { name: "리더십", desc: "캠프·퍼실리테이션·팀빌딩" },
    { name: "취업", desc: "이력서/포폴·면접·현직자 멘토링" },
    { name: "봉사", desc: "교내/지역사회 봉사활동" },
    { name: "창업", desc: "아이디어톤·메이킹·피칭" },
    { name: "어학", desc: "스피킹 부트캠프·토론" },
    { name: "문화", desc: "전시/공연 관람·동아리 연계" },
  ];

  const steps = [
    { n: 1, t: "프로그램 탐색", d: "카테고리/검색으로 관심 프로그램 찾기" },
    { n: 2, t: "상세 확인", d: "일정·정원·장소·포인트·유의사항 확인" },
    { n: 3, t: "참여 & 기록", d: "참여 후 출석·활동보고로 이수 인정" },
    { n: 4, t: "포인트 관리", d: "누적 포인트·역량지수 대시보드 확인" },
  ];

  const faqs = [
    {
      q: "비교과 포인트는 어디에 사용되나요?",
      a: "졸업요건, 장학·우수인증, 마일리지 제도 등 학교 정책에 따라 반영될 수 있습니다. 자세한 기준은 학사 공지/포털을 확인하세요.",
    },
    {
      q: "수업(정규과목)과 무엇이 다른가요?",
      a: "성적 대신 역량/경험 중심의 활동입니다. 정규과목을 보완하며 실제 문제 해결과 협업 경험을 제공합니다.",
    },
    {
      q: "출석/인증은 어떻게 하나요?",
      a: "행사별 안내에 따라 QR체크/서명/과제 제출 등으로 인증합니다. 미이행 시 포인트가 반영되지 않습니다.",
    },
    {
      q: "중복 참여도 가능한가요?",
      a: "가능합니다. 다만 시간 중복/정원 제한이 있는 경우 선발 기준이 적용될 수 있습니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-10">
          <div className="rounded-3xl border border-sky-100 bg-white/70 backdrop-blur p-6 sm:p-10 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-sky-900">
                  비교과 프로그램 안내
                </h1>
                <p className="mt-3 text-sky-700">
                  수업 밖에서 확장되는 당신의 역량. 활동으로 성장하고 기록으로 증명하세요.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop"
                  alt="활동 이미지"
                  className="h-64 w-full object-cover rounded-2xl shadow-md"
                />
                <div className="absolute -bottom-4 -left-4 rotate-[-2deg] rounded-2xl bg-white shadow p-3">
                  <div className="text-xs font-semibold text-sky-600">누적 포인트</div>
                  <div className="text-lg font-extrabold text-sky-900">개인 대시보드로 관리</div>
                </div>
              </div>
            </div>

            {/* 요약 배지 */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {bullets.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-sky-100 bg-sky-50/40 px-4 py-3 flex items-start gap-3"
                >
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <div className="font-bold text-sky-900">{b.title}</div>
                    <div className="text-sm text-sky-700">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-extrabold text-sky-900 mb-4">카테고리</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.name}
              className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-sky-900">{c.name}</div>
                <span className="rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  GUIDE
                </span>
              </div>
              <p className="mt-1 text-sky-700">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 진행 방식 */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-extrabold text-sky-900 mb-4">어떻게 진행되나요?</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-sky-600 text-white font-bold">
                  {s.n}
                </span>
                <div className="text-lg font-bold text-sky-900">{s.t}</div>
              </div>
              <p className="mt-2 text-sky-700">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 포인트/인증 */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-sky-900">포인트 & 이수 인증</h3>
            <ul className="mt-3 list-disc pl-5 text-sky-700 space-y-1">
              <li>프로그램 난이도·시간에 따라 포인트 부여</li>
              <li>출석/과제/보고서 등 요건 충족 시 이수</li>
              <li>대시보드에서 누적 포인트/인증서 조회</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-sky-100 bg-sky-50/50 p-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-sky-900">유의 사항</h3>
            <ul className="mt-3 list-disc pl-5 text-sky-700 space-y-1">
              <li>마감 시간 준수(지각·결석 시 불인정 가능)</li>
              <li>동일 시간대 중복 신청 제한될 수 있음</li>
              <li>학사 공지의 세부 규정을 반드시 확인</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-extrabold text-sky-900 mb-4">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((f, i) => (
            <details key={i} className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer list-none font-semibold text-sky-900">
                {f.q}
              </summary>
              <p className="mt-2 text-sky-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 문의 */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white shadow-sm">
          <h3 className="text-xl font-extrabold">문의</h3>
          <p className="mt-1 text-white/90">
            비교과 운영(학생처/취업지원/창업지원 등) 관련 문의는 각 부서 공지 연락처로 문의하세요.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-3">
              학생처: 02-000-0000 / student@univ.ac.kr
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              취업지원센터: 02-000-0001 / career@univ.ac.kr
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              창업지원단: 02-000-0002 / startup@univ.ac.kr
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-sm text-sky-600/80">
        © {new Date().getFullYear()} Extracurricular Programs — About
      </footer>
    </div>
  );
}
