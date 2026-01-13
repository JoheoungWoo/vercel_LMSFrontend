// src/components/admin/AdminSummary.jsx
import React from "react";

const AdminSummary = ({ terms, courses, timetables }) => {
  const InfoCard = ({ title, icon, items, render, empty, color }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-2xl ${color}`}>{icon}</span>
        <h2 className="font-bold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-2">
        {items.slice(0, 3).map((v, i) => (
          <div
            key={i}
            className="text-xs text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200"
          >
            <span className="font-medium">• {render(v)}</span>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-gray-400 italic text-center py-4">
            {empty}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <InfoCard
        title="학기 정보"
        icon="📅"
        color="text-blue-500"
        items={terms}
        empty="등록된 학기가 없습니다"
        render={(t) => `${t.year}년 ${t.semester}`}
      />
      <InfoCard
        title="강의 현황"
        icon="📚"
        color="text-green-500"
        items={courses}
        empty="개설된 강의가 없습니다"
        render={(c) => c.courseName}
      />
      <InfoCard
        title="시간표"
        icon="🕐"
        color="text-purple-500"
        items={timetables}
        empty="등록된 시간표가 없습니다"
        render={(tt) => `${tt.dayOfWeek}요일 ${tt.startTime}~${tt.endTime}`}
      />
    </>
  );
};

export default AdminSummary;
