// src/pages/student/StudentHomeDashboard.jsx
import React from "react";

export default function StudentHomeDashboard() {
  const myLectures = [
    { id: 1, name: "웹 프로그래밍", time: "월·수 3-4교시", professor: "김교수" },
    { id: 2, name: "데이터베이스", time: "화·목 5-6교시", professor: "이교수" },
    { id: 3, name: "자료구조", time: "금 3-4교시", professor: "박교수" },
  ];

  const todos = [
    { id: 1, title: "웹 프로그래밍 과제 1", due: "2025-03-05", course: "웹 프로그래밍" },
    { id: 2, title: "DB ERD 설계 제출", due: "2025-03-07", course: "데이터베이스" },
    { id: 3, title: "자료구조 퀴즈", due: "2025-03-08", course: "자료구조" },
  ];

  const todaySchedule = [
    { id: 1, time: "09:00 ~ 10:00", course: "웹 프로그래밍", room: "A동 301" },
    { id: 2, time: "11:00 ~ 12:00", course: "데이터베이스", room: "B동 204" },
    { id: 3, time: "14:00 ~ 15:00", course: "자료구조", room: "온라인" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <header>
        <h1 className="text-2xl font-semibold">학생 대시보드</h1>
        <p className="text-sm text-gray-500 mt-1">
          수강 중인 강의, 과제·시험 일정, 오늘 시간표를 한눈에 볼 수 있습니다.
        </p>
      </header>

      {/* 상단 KPI */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500 mb-1">이번 학기 수강 과목</p>
          <p className="text-2xl font-bold">{myLectures.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500 mb-1">다가오는 과제/시험</p>
          <p className="text-2xl font-bold">{todos.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500 mb-1">오늘 수업</p>
          <p className="text-2xl font-bold">{todaySchedule.length}</p>
        </div>
      </section>

      {/* 메인 3컬럼 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 내 수강 과목 */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="text-sm font-semibold mb-2">내 수강 과목</h2>
          <ul className="text-sm divide-y">
            {myLectures.map((lec) => (
              <li key={lec.id} className="py-2">
                <p className="font-medium">{lec.name}</p>
                <p className="text-xs text-gray-500">
                  {lec.time} · {lec.professor}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* 과제 / 시험 일정 */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="text-sm font-semibold mb-2">과제 · 시험 일정</h2>
          <ul className="text-sm divide-y">
            {todos.map((t) => (
              <li key={t.id} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium truncate max-w-[160px]">{t.title}</p>
                  <p className="text-xs text-gray-500">
                    마감 {t.due} · {t.course}
                  </p>
                </div>
                <button className="text-xs border px-2 py-1 rounded hover:bg-gray-50">
                  상세
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 오늘 시간표 */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="text-sm font-semibold mb-2">오늘 시간표</h2>
          <ul className="text-sm divide-y">
            {todaySchedule.map((s) => (
              <li key={s.id} className="py-2">
                <p className="font-medium">{s.course}</p>
                <p className="text-xs text-gray-500">
                  {s.time} · {s.room}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
