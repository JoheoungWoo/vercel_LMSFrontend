import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStudentAttendance } from "../../../hook/attendance/useStudentAttendance";

import { STATUS_OPTIONS } from "../../../constants/attendanceStatus"; // 경로 맞춰주세요
import { StatusBadge } from "../../../components/common/StatusBadge";
import { formatDateKorean } from "../../../util/dateUtils"; // 경로 맞춰주세요

export default function AttendanceView() {
  // 1. 로그인 정보
  const userEmail =
    useSelector((state) => state.loginSlice?.email) || "student@aaa.com";

  // 2. Hook 연결
  const { data, loading, fetchAttendance } = useStudentAttendance(userEmail);

  // 3. 상태 관리
  const [courseList, setCourseList] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState("ALL");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // 4. 초기 로드
  useEffect(() => {
    if (userEmail) fetchAttendance("my", userEmail);
  }, [userEmail, fetchAttendance]);

  // 5. 과목 목록 추출
  useEffect(() => {
    if (selectedEnrollment === "ALL" && data.length > 0) {
      const uniqueCourses = [];
      const map = new Map();

      data.forEach((item) => {
        const enrollmentId = item.enrollmentId || item.enrollment?.enrollmentId;
        const courseName =
          item.courseName ||
          item.enrollment?.classSection?.courseOffering?.courseName ||
          "과목명 없음";

        if (enrollmentId && !map.has(enrollmentId)) {
          map.set(enrollmentId, true);
          uniqueCourses.push({ id: enrollmentId, name: courseName });
        }
      });
      if (uniqueCourses.length > 0) setCourseList(uniqueCourses);
    }
  }, [data, selectedEnrollment]);

  // 6. 핸들러
  const handleCourseChange = (e) => {
    const val = e.target.value;
    setSelectedEnrollment(val);
    val === "ALL"
      ? fetchAttendance("my", userEmail)
      : fetchAttendance("enrollment", val);
  };

  const handleReset = () => {
    setSelectedEnrollment("ALL");
    setSelectedDate("");
    setSelectedWeek("ALL");
    setSelectedStatus("ALL");
    fetchAttendance("my", userEmail);
  };

  // 7. 필터링 로직
  const filteredData = data.filter((item) => {
    // 날짜
    if (selectedDate) {
      const raw = item.attendanceDate || item.sessionDate;
      if (!raw) return false;
      if (!String(raw).startsWith(selectedDate)) {
        try {
          const d = new Date(raw);
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          if (`${y}-${m}-${day}` !== selectedDate) return false;
        } catch (e) {
          return false;
        }
      }
    }
    // 주차
    if (selectedWeek !== "ALL" && Number(item.week) !== Number(selectedWeek))
      return false;
    // 상태
    if (selectedStatus !== "ALL" && item.status !== selectedStatus)
      return false;

    return true;
  });

  return (
    <div className="w-full space-y-4">
      {/* 헤더 & 필터 영역 */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 rounded-lg bg-slate-50 p-4 border border-slate-200">
        <div>
          <h3 className="font-bold text-slate-800">나의 출석 현황</h3>
          <p className="text-xs text-slate-500">
            {userEmail} 님의 기록{" "}
            <span className="font-bold text-indigo-600">
              {filteredData.length}
            </span>
            건
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* 과목 */}
          <select
            value={selectedEnrollment}
            onChange={handleCourseChange}
            className="filter-select"
          >
            <option value="ALL">전체 과목</option>
            {courseList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {/* 주차 */}
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">전체 주차</option>
            {[...Array(16)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}주차
              </option>
            ))}
          </select>
          {/* 상태 (공통 상수 사용) */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* 날짜 */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="filter-input cursor-pointer"
          />
          {/* 초기화 */}
          <button onClick={handleReset} className="reset-btn">
            ↻ 초기화
          </button>
        </div>
      </div>

      {/* 테이블 영역 */}
      {loading ? (
        <div className="py-10 text-center text-slate-500">로딩 중...</div>
      ) : filteredData.length === 0 ? (
        <div className="py-10 text-center text-slate-500 border border-dashed rounded-xl">
          데이터가 없습니다.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  과목명
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  주차
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  날짜
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredData.map((item, idx) => (
                <tr
                  key={item.attendanceId || idx}
                  className="hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {item.courseName ||
                      item.enrollment?.classSection?.courseOffering
                        ?.courseName ||
                      "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {item.week}주차
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {/* 공통 함수 사용 */}
                    {formatDateKorean(item.attendanceDate || item.sessionDate)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {/* 공통 컴포넌트 사용 */}
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
