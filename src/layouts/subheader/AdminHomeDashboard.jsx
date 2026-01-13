// src/pages/admin/dashboard/AdminHomeDashboard.jsx
import React, { useEffect, useState } from "react";
import TermApi from "../../api/TermApi";
import CourseOfferingApi from "../../api/CourseOfferingApi";
import TimeTableApi from "../../api/TimeTableApi";

import AdminSummary from "../../components/admin/AdminSummary";
import AdminFinanceSummary from "../../components/admin/AdminFinanceSummary";
import AdminSystemCommunitySummary from "../../components/admin/AdminSystemCommunitySummary";
import AdminUserSummary from "../../components/admin/AdminUserSummary";

export default function AdminHomeDashboard() {
  const [terms, setTerms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    TermApi.config.funcs.readAll().then(setTerms);
    CourseOfferingApi.config.funcs.readAll().then(setCourses);
    TimeTableApi.config.funcs.readAll().then(setTimetables);
  }, []);

  const Summary = ({ title, value, icon, gradient }) => (
    <div
      className={`bg-gradient-to-br ${gradient} border-2 border-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
          <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
        <span className="text-5xl opacity-20">{icon}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
      {/* 헤더 */}
      <header className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              관리자 대시보드
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              학사 운영 현황을 한눈에 확인하세요
            </p>
          </div>
        </div>
      </header>

      {/* 요약 카드 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Summary
          title="등록된 학기"
          value={terms.length}
          icon="📅"
          gradient="from-blue-100 to-blue-200"
        />
        <Summary
          title="개설된 강의"
          value={courses.length}
          icon="📚"
          gradient="from-green-100 to-green-200"
        />
        <Summary
          title="등록된 시간표"
          value={timetables.length}
          icon="🕐"
          gradient="from-purple-100 to-purple-200"
        />
      </section>

      {/* 4열 레이아웃 */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 1열: 학사 운영 */}
        <div className="space-y-6">
          <AdminSummary
            terms={terms}
            courses={courses}
            timetables={timetables}
          />
        </div>

        {/* 2열: 재무 */}
        {/* <AdminFinanceSummary /> */}

        {/* 3열: 커뮤니티 */}
        <AdminSystemCommunitySummary />

        {/* 4열: 사용자 */}
        <AdminUserSummary />
      </section>
    </div>
  );
}
