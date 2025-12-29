// src/pages/academicAffairs/creditManagement/CreditManagementPage.jsx
import React, { useMemo, useState } from "react";

const TERMS = [
  { id: "2025-1", label: "2025년 1학기" },
  { id: "2024-2", label: "2024년 2학기" },
  { id: "2024-1", label: "2024년 1학기" },
];

const COURSES_BY_TERM = {
  "2025-1": [
    {
      id: 1,
      code: "CS101",
      name: "웹 프로그래밍 기초",
      type: "전필",
      credit: 3,
      grade: "A+",
      status: "이수",
    },
    {
      id: 2,
      code: "CS201",
      name: "자료구조",
      type: "전필",
      credit: 3,
      grade: "A0",
      status: "이수",
    },
    {
      id: 3,
      code: "MATH110",
      name: "공학수학",
      type: "전선",
      credit: 3,
      grade: "B+",
      status: "이수",
    },
    {
      id: 4,
      code: "GEN101",
      name: "대학생활과 진로",
      type: "교필",
      credit: 2,
      grade: "P",
      status: "이수(P/F)",
    },
  ],
  "2024-2": [
    {
      id: 5,
      code: "CS102",
      name: "프로그래밍 언어",
      type: "전필",
      credit: 3,
      grade: "B0",
      status: "이수",
    },
    {
      id: 6,
      code: "CS210",
      name: "데이터베이스",
      type: "전선",
      credit: 3,
      grade: "A0",
      status: "이수",
    },
    {
      id: 7,
      code: "GEN120",
      name: "교양 영어",
      type: "교선",
      credit: 2,
      grade: "A+",
      status: "이수",
    },
  ],
  "2024-1": [
    {
      id: 8,
      code: "CS001",
      name: "컴퓨터 개론",
      type: "전선",
      credit: 3,
      grade: "B+",
      status: "이수",
    },
    {
      id: 9,
      code: "MATH101",
      name: "미적분학",
      type: "전선",
      credit: 3,
      grade: "C+",
      status: "이수",
    },
    {
      id: 10,
      code: "GEN010",
      name: "글쓰기",
      type: "교필",
      credit: 2,
      grade: "A0",
      status: "이수",
    },
  ],
};

const GRADE_TO_POINT = {
  "A+": 4.5,
  A0: 4.0,
  "B+": 3.5,
  B0: 3.0,
  "C+": 2.5,
  C0: 2.0,
  "D+": 1.5,
  D0: 1.0,
  F: 0,
  P: null, // P/F 과목은 평점 계산에서 제외
};

function calcStats(courses) {
  const filtered = courses.filter((c) => GRADE_TO_POINT[c.grade] !== null);

  const totalCredits = filtered.reduce((sum, c) => sum + c.credit, 0);
  const totalPoints = filtered.reduce(
    (sum, c) => sum + c.credit * (GRADE_TO_POINT[c.grade] ?? 0),
    0
  );
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const majorCredits = filtered
    .filter((c) => c.type.startsWith("전"))
    .reduce((sum, c) => sum + c.credit, 0);

  const generalCredits = filtered
    .filter((c) => c.type.startsWith("교"))
    .reduce((sum, c) => sum + c.credit, 0);

  return {
    totalCredits,
    gpa: Number(gpa.toFixed(2)),
    majorCredits,
    generalCredits,
  };
}

export default function CreditManagementPage() {
  const [selectedTerm, setSelectedTerm] = useState("2025-1");

  const currentCourses = COURSES_BY_TERM[selectedTerm] || [];

  const currentStats = useMemo(
    () => calcStats(currentCourses),
    [currentCourses]
  );

  // 전체 누적 통계 (모든 학기 합산)
  const allCourses = Object.values(COURSES_BY_TERM).flat();
  const totalStats = useMemo(() => calcStats(allCourses), [allCourses]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-emerald-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 페이지 헤더 */}
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              학점 관리
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              학기별 성적과 누적 학점을 한눈에 확인할 수 있습니다.
            </p>
          </div>

          {/* 학기 선택 드롭다운 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">학기 선택</span>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              {TERMS.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* 상단 요약 카드들 */}
        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {/* 이번 학기 평점 */}
          <div className="rounded-2xl border border-emerald-100 bg-white/70 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-emerald-500">
              이번 학기 평점
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {currentStats.gpa.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              전공·교양 P/F 과목은 평점에서 제외됩니다.
            </p>
          </div>

          {/* 이번 학기 취득 학점 */}
          <div className="rounded-2xl border border-sky-100 bg-white/70 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-sky-500">
              이번 학기 취득 학점
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {currentStats.totalCredits}
              <span className="ml-1 text-base font-normal text-slate-500">
                학점
              </span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              전공 {currentStats.majorCredits}학점 · 교양{" "}
              {currentStats.generalCredits}학점
            </p>
          </div>

          {/* 누적 평점 */}
          <div className="rounded-2xl border border-indigo-100 bg-white/70 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-indigo-500">누적 평점</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalStats.gpa.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              전체 이수 학점 기준 누적 성적
            </p>
          </div>

          {/* 누적 이수 학점 */}
          <div className="rounded-2xl border border-rose-100 bg-white/70 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-rose-500">
              누적 이수 학점
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalStats.totalCredits}
              <span className="ml-1 text-base font-normal text-slate-500">
                학점
              </span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              전공 {totalStats.majorCredits} · 교양 {totalStats.generalCredits}
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          {/* 과목 상세 테이블 */}
          <section className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                {TERMS.find((t) => t.id === selectedTerm)?.label} 성적 상세
              </h2>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">
                과목 {currentCourses.length}개
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.7rem] uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2">과목 코드</th>
                    <th className="px-3 py-2">과목명</th>
                    <th className="px-3 py-2 text-center">구분</th>
                    <th className="px-3 py-2 text-center">학점</th>
                    <th className="px-3 py-2 text-center">성적</th>
                    <th className="px-3 py-2 text-center">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-emerald-50/40"
                    >
                      <td className="px-3 py-2 align-middle text-[0.8rem]">
                        <span className="rounded-full bg-slate-50 px-2 py-1 font-mono text-[0.7rem] text-slate-600">
                          {course.code}
                        </span>
                      </td>
                      <td className="px-3 py-2 align-middle text-[0.85rem]">
                        {course.name}
                      </td>
                      <td className="px-3 py-2 text-center align-middle text-[0.75rem]">
                        <span className="rounded-full bg-sky-50 px-2 py-1 text-sky-600">
                          {course.type}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center align-middle text-[0.8rem]">
                        {course.credit}
                      </td>
                      <td className="px-3 py-2 text-center align-middle text-[0.85rem] font-semibold">
                        {course.grade}
                      </td>
                      <td className="px-3 py-2 text-center align-middle text-[0.75rem]">
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {currentCourses.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-3 py-6 text-center text-xs text-slate-400"
                      >
                        해당 학기에 수강한 과목이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* 간단한 그래프/요약 영역 (막대 느낌으로 표현) */}
          <section className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur">
            <h2 className="text-sm font-semibold text-slate-900">
              학기별 평점 추이
            </h2>

            <div className="space-y-3">
              {TERMS.map((term) => {
                const stats = calcStats(COURSES_BY_TERM[term.id] || []);
                // 4.5 만점 기준으로 막대길이
                const ratio = Math.min(stats.gpa / 4.5, 1);
                return (
                  <div key={term.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[0.75rem] text-slate-600">
                      <span>{term.label}</span>
                      <span className="font-medium text-slate-800">
                        {stats.gpa.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all"
                        style={{ width: `${ratio * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 px-3 py-3 text-[0.8rem] text-slate-600">
              <p className="font-medium text-slate-800">
                목표 평점 관리 팁
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>전공 필수 과목의 평점을 우선적으로 관리해 보세요.</li>
                <li>학기별 최소 목표 평점(예: 3.5 이상)을 정해두면 좋아요.</li>
                <li>학점이 큰 과목의 성적이 전체 평점에 더 큰 영향을 줍니다.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
