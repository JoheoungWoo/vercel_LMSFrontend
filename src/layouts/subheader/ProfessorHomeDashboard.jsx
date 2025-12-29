// src/pages/professor/ProfessorHomeDashboard.jsx
import React from "react";

export default function ProfessorHomeDashboard() {
  // 더미 데이터
  const myLectures = [
    { id: 1, name: "웹 프로그래밍", time: "월 3-4교시", enrolled: 42 },
    { id: 2, name: "데이터베이스", time: "수 5-6교시", enrolled: 35 },
  ];

  const pendingSyllabus = [
    { id: 1, course: "프로그래밍 기초", submittedAt: "2025-03-01" },
    { id: 2, course: "자료구조", submittedAt: "2025-03-02" },
  ];

  const upcomingEvents = [
    { id: 1, title: "학과 세미나", date: "2025-03-10" },
    { id: 2, title: "교수 회의", date: "2025-03-12" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <header>
        <h1 className="text-2xl font-semibold">교수 대시보드</h1>
        <p className="text-sm text-gray-500 mt-1">
          담당 강의 / 강의계획서 / 학사 일정을 확인할 수 있습니다.
        </p>
      </header>

      {/* 상단 카드 3개 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500">이번 학기 담당 강의</p>
          <p className="text-2xl font-bold">{myLectures.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500">승인 대기 강의계획서</p>
          <p className="text-2xl font-bold">{pendingSyllabus.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500">다가오는 일정</p>
          <p className="text-2xl font-bold">{upcomingEvents.length}</p>
        </div>
      </section>

      {/* 주요 카드 3개 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 내 강의 */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="text-sm font-semibold mb-2">내 강의</h2>
          <ul className="text-sm divide-y">
            {myLectures.map((lec) => (
              <li key={lec.id} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium">{lec.name}</p>
                  <p className="text-xs text-gray-500">{lec.time}</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                  {lec.enrolled}명
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 강의계획서 승인 대기 */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="text-sm font-semibold mb-2">승인 대기 강의계획서</h2>
          <ul className="text-sm divide-y">
            {pendingSyllabus.map((sy) => (
              <li key={sy.id} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium">{sy.course}</p>
                  <p className="text-xs text-gray-500">
                    제출일 {sy.submittedAt}
                  </p>
                </div>
                <button className="text-xs border px-2 py-1 rounded hover:bg-gray-50">
                  수정
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 일정 */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="text-sm font-semibold mb-2">다가오는 일정</h2>
          <ul className="text-sm divide-y">
            {upcomingEvents.map((ev) => (
              <li key={ev.id} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium">{ev.title}</p>
                  <p className="text-xs text-gray-500">{ev.date}</p>
                </div>
                <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                  일정
                </span>
              </li>
            ))}
          </ul>
        </div>

      </section>
    </div>
  );
}
