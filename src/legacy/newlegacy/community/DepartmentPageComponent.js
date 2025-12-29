// src/pages/community/DepartmentPage.js
import React, { useMemo, useState } from "react";

/** 네가 준 학과 목록 */
const DEPT_NAMES = [
  "기계",
  "화학",
  "생명과학",
  "환경공학",
  "건축",
  "산업디자인",
  "경영",
  "경제",
  "심리학",
  "체육",
];

/** 학과 설명/공지 더미 생성기 */
const buildDepartments = () => {
  const colors = [
    "from-sky-400 to-sky-600",
    "from-blue-400 to-blue-600",
    "from-cyan-400 to-sky-500",
    "from-sky-500 to-blue-700",
  ];
  const notices = [
    "📌 신입생 오리엔테이션: 3월 첫째 주 학과 세미나실",
    "🧪 캡스톤 디자인 설명회: 이번 주 수요일 16:00",
    "📣 비교과 프로그램 접수 마감 D-3",
    "📝 전공트랙 상담 주간 운영(사전 예약)",
  ];
  const descs = {
    기계: "역학, 제어, 제조 등 기계 시스템을 탐구합니다.",
    화학: "반응공학, 재료화학 등 화학 전반을 다룹니다.",
    생명과학: "분자·세포·생태 수준의 생명 현상을 연구합니다.",
    환경공학: "수질·대기·폐기물 등 지속가능 환경기술을 다룹니다.",
    건축: "건축 설계와 구조, 공간 경험을 통합적으로 배웁니다.",
    산업디자인: "제품·UX·브랜딩 등 사용성 중심의 디자인을 연구합니다.",
    경영: "전략·마케팅·회계·인사 전반의 비즈니스 역량을 키웁니다.",
    경제: "거시·미시·계량경제를 통해 경제 현상을 분석합니다.",
    심리학: "인지·발달·상담 등 인간 심리를 과학적으로 이해합니다.",
    체육: "스포츠 과학과 코칭·건강증진을 체계적으로 학습합니다.",
  };

  return DEPT_NAMES.map((name, i) => ({
    id: i + 1,
    name,
    desc: descs[name] ?? "학과 소개가 준비 중입니다.",
    color: colors[i % colors.length],
    notice: notices[i % notices.length],
  }));
};

export default function DepartmentPageComponent() {
  const [selected, setSelected] = useState(null);
  const [q, setQ] = useState("");
  const departments = useMemo(buildDepartments, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return departments;
    return departments.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        d.desc.toLowerCase().includes(s) ||
        d.notice.toLowerCase().includes(s)
    );
  }, [q, departments]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-800">
            학과 게시판
          </h1>
          <p className="mt-2 text-sky-600">
            학과별 주요 소식과 공지를 한눈에 확인하세요.
          </p>
          <div className="mt-4 w-24 h-1 bg-sky-400 rounded-full mx-auto" />
        </header>

        {/* 검색바 */}
        <div className="max-w-xl mx-auto mb-8">
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
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="학과, 설명, 공지 검색…"
              className="w-full bg-transparent outline-none placeholder:text-sky-400/80 text-sky-900"
              aria-label="학과 검색"
            />
          </div>
        </div>

        {/* 학과 카드 리스트 */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center text-sky-700">
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((dept) => (
              <div
                key={dept.id}
                onClick={() => setSelected(dept)}
                className={`relative cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br ${dept.color} text-white p-6 overflow-hidden`}
              >
                {/* 포인트 1: 코너 리본 */}
                <div className="absolute -right-8 -top-8 rotate-45 bg-white/25 text-xs font-semibold px-8 py-2">
                  HOT
                </div>

                {/* 포인트 2: hover 글로우 */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300" />

                <h2 className="text-xl font-bold mb-2 drop-shadow-sm">{dept.name}</h2>
                <p className="text-sm text-white/90 leading-relaxed">
                  {dept.desc}
                </p>

                {/* 포인트 3: 하단 하이라이트 라인 */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/40 rounded-b-2xl" />
              </div>
            ))}
          </div>
        )}

        {/* 모달 */}
        {selected && (
          <div
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md text-sky-800">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-sky-600 hover:text-sky-800 text-xl"
                aria-label="닫기"
              >
                ×
              </button>

              <div className="rounded-t-2xl bg-gradient-to-r from-sky-500 to-blue-600 h-3" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-sky-700">
                  {selected.name}
                </h3>
                <p className="text-sky-600 mb-4">{selected.desc}</p>

                <div className="bg-sky-50 rounded-xl border border-sky-100 p-4 text-sky-800">
                  <strong className="block text-sky-700 mb-1">📢 최근 공지</strong>
                  <span>{selected.notice}</span>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-50"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 푸터 */}
        <footer className="text-center text-sm text-sky-600/80 mt-10">
          © {new Date().getFullYear()} Department Board
        </footer>
      </div>
    </div>
  );
}
