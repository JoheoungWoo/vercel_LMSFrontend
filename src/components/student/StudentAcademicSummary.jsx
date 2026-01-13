import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import EnrollmentApi from "../../api/EnrollmentApi";
import { useStudentAttendance } from "../../hook/attendance/useStudentAttendance";

const StudentAcademicSummary = () => {
  const userEmail =
    useSelector((state) => state.loginSlice?.email) || "student@aaa.com";

  /* 1️⃣ 수강 신청 과목 수 */
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [loadingEnrollment, setLoadingEnrollment] = useState(true);

  /* 2️⃣ 출석 데이터 */
  const {
    data: attendances = [],
    loading: loadingAttendance,
    fetchAttendance,
  } = useStudentAttendance(userEmail);

  /* ✅ 출석 데이터 최초 로드 (🔥 핵심) */
  useEffect(() => {
    if (userEmail) {
      fetchAttendance("my", userEmail);
    }
  }, [userEmail, fetchAttendance]);

  /* 수강 신청 수 */
  useEffect(() => {
    setLoadingEnrollment(true);
    EnrollmentApi.config.funcs
      .findByKeywordHttp("myenroll", null, userEmail, "get")
      .then((result) => {
        setEnrollmentCount(result?.length || 0);
      })
      .catch(console.error)
      .finally(() => setLoadingEnrollment(false));
  }, [userEmail]);

  /* 출석률 계산 */
  const attendanceRate = useMemo(() => {
    if (attendances.length === 0) return 0;
    const presentCount = attendances.filter(
      (a) => a.status === "PRESENT"
    ).length;
    return Math.round((presentCount / attendances.length) * 100);
  }, [attendances]);

  const loading = loadingEnrollment || loadingAttendance;

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border p-6 animate-pulse"
          >
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
            <div className="h-10 bg-slate-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 📚 수강 과목 */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <p className="text-sm font-semibold text-blue-700 mb-2">📚 수강 과목</p>
        <p className="text-4xl font-bold text-blue-900">{enrollmentCount}</p>
        <p className="text-xs text-slate-600 mt-1">개 수강 중</p>
      </div>

      {/* ✅ 출석률 */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <p className="text-sm font-semibold text-emerald-700 mb-2">✅ 출석률</p>
        <p
          className={`text-4xl font-bold ${
            attendanceRate >= 90
              ? "text-emerald-900"
              : attendanceRate >= 70
              ? "text-amber-600"
              : "text-rose-600"
          }`}
        >
          {attendanceRate}%
        </p>
        <p className="text-xs text-slate-600 mt-1">
          {attendances.length}회 중{" "}
          {attendances.filter((a) => a.status === "PRESENT").length}회 출석
        </p>
      </div>
    </div>
  );
};

export default StudentAcademicSummary;
