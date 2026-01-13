// ProfessorGradeLmsSummary.jsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useAttendanceManage } from "../../hook/attendance/useAttendanceManage";

const ProfessorGradeLmsSummary = ({ selectedOfferingId }) => {
  const userEmail =
    useSelector((state) => state.loginSlice?.email) || "professor@aaa.com";

  const { attendances, loading: attendanceLoading } = useAttendanceManage(
    selectedOfferingId,
    userEmail
  );

  const attendanceRate = useMemo(() => {
    if (!attendances || attendances.length === 0) return 0;

    const presentCount = attendances.filter(
      (a) => a.status === "PRESENT"
    ).length;

    return Math.round((presentCount / attendances.length) * 100);
  }, [attendances]);

  const recentAttendances = useMemo(() => {
    if (!attendances) return [];
    return [...attendances]
      .sort(
        (a, b) =>
          new Date(b.sessionDate || b.attendanceDate) -
          new Date(a.sessionDate || a.attendanceDate)
      )
      .slice(0, 5);
  }, [attendances]);

  if (attendanceLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full">
        <div className="text-center text-slate-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm border border-blue-200 p-6 h-full">
      {/* 전체 출결률 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-blue-700 mb-2">
            📊 전체 출결률
          </p>
          <p
            className={`text-4xl font-bold ${
              attendanceRate >= 90
                ? "text-emerald-600"
                : attendanceRate >= 70
                ? "text-amber-600"
                : "text-rose-600"
            }`}
          >
            {attendanceRate}%
          </p>
        </div>
        <div className="w-14 h-14 bg-blue-200/50 rounded-full flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
      </div>

      {/* 출석 항목 (최근 5명, 스크롤 없음) */}
      <div className="bg-white rounded-xl border border-blue-200 p-4">
        <p className="text-sm font-semibold text-slate-700 mb-2">
          최근 출석 기록
        </p>

        {recentAttendances.length === 0 ? (
          <p className="text-sm text-slate-400 text-center">
            출석 기록이 없습니다
          </p>
        ) : (
          <ul className="space-y-2">
            {recentAttendances.map((a, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-sm border-b last:border-b-0 pb-1"
              >
                <span className="text-slate-700">
                  {a.studentNickName || "이름 없음"}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    a.status === "PRESENT"
                      ? "text-emerald-600"
                      : a.status === "LATE"
                      ? "text-amber-600"
                      : "text-rose-600"
                  }`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfessorGradeLmsSummary;
