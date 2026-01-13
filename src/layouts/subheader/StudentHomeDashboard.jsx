// src/pages/student/StudentHomeDashboard.jsx
import React from "react";
import StudentAcademicSummary from "../../components/student/StudentAcademicSummary";
import StudentUserSummary from "../../components/student/StudentUserSummary";
import StudentEtcSummary from "../../components/student/StudentEtcSummary";

export default function StudentHomeDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6 space-y-8">
      {/* 헤더 */}
      <header className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              학생 대시보드
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              수강 과목, 성적, 출석, 공지사항을 한눈에 확인하세요
            </p>
          </div>
        </div>
      </header>

      {/* 5열 레이아웃 */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 1열: 학사 (수강 과목) */}
        <StudentAcademicSummary />

        {/* 2열: 사용자 (할 일, 프로필) */}
        <StudentUserSummary />

        {/* 3열: 성적, 정보, 학적 내역 */}
        <StudentEtcSummary />
      </section>
    </div>
  );
}
