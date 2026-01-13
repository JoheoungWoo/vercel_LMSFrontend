import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

// 1. 커스텀 훅 & API
import { useAttendanceManage } from "../../../hook/attendance/useAttendanceManage";

// 2. 유틸 & 컴포넌트
import {
  ATTENDANCE_STATUS,
  STATUS_OPTIONS,
} from "../../../constants/attendanceStatus";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { formatDateKorean } from "../../../util/dateUtils";

export default function AttendanceManage({ offeringId }) {
  // 로그인한 교수님 이메일
  const userEmail =
    useSelector((state) => state.loginSlice?.email) || "professor@aaa.com";

  // 훅 사용 (데이터 및 액션 함수들)
  const {
    attendances,
    studentList,
    loading,
    createAttendance,
    updateAttendance,
    refresh,
  } = useAttendanceManage(offeringId, userEmail);

  // ─────────────────────────────────────────────────────────────
  // 1. 신규 등록(Create)을 위한 입력 상태
  // ─────────────────────────────────────────────────────────────
  const [newItem, setNewItem] = useState({
    enrollmentId: "",
    week: "1",
    sessionDate: new Date().toISOString().split("T")[0],
    status: ATTENDANCE_STATUS.PRESENT,
  });

  // ─────────────────────────────────────────────────────────────
  // 2. 조회용 검색 필터 상태 (Client-side Filtering)
  // ─────────────────────────────────────────────────────────────
  const [filterCondition, setFilterCondition] = useState({
    studentId: "", // 특정 학생 ID (없으면 전체)
    week: "", // 특정 주차 (없으면 전체)
  });

  // 필터링된 데이터 계산 (useMemo로 성능 최적화)
  const filteredAttendances = useMemo(() => {
    return attendances.filter((item) => {
      // 1. 학생 필터 확인
      const matchStudent = filterCondition.studentId
        ? Number(item.enrollmentId) === Number(filterCondition.studentId)
        : true;

      // 2. 주차 필터 확인
      const matchWeek = filterCondition.week
        ? Number(item.week) === Number(filterCondition.week)
        : true;

      return matchStudent && matchWeek;
    });
  }, [attendances, filterCondition]);

  // ─────────────────────────────────────────────────────────────
  // 핸들러 함수들
  // ─────────────────────────────────────────────────────────────

  // 신규 등록
  const handleCreate = async () => {
    if (!newItem.enrollmentId) {
      alert("학생 정보를 선택해주세요");
      return;
    }
    const success = await createAttendance(newItem);
    if (success) {
      setNewItem({ ...newItem, enrollmentId: "" }); // 성공 시 학생만 초기화
    }
  };

  // 상태 수정
  const handleStatusChange = async (item, newStatus) => {
    if (!item || !item.attendanceId) return;
    await updateAttendance(item, newStatus);
  };

  // 필터 초기화
  const resetFilter = () => {
    setFilterCondition({ studentId: "", week: "" });
  };

  return (
    <div className="w-full space-y-4 p-6">
      {/* ──────────────── 1. 신규 등록 섹션 (필터바와 디자인 통일 - Toolbar 형태) ──────────────── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        {/* 좌측: 타이틀 */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            출결 신규 등록
          </h3>
        </div>

        {/* 우측: 입력 컨트롤 (가로 배치) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* ① 학생 선택 */}
          <select
            value={newItem.enrollmentId}
            onChange={(e) =>
              setNewItem({ ...newItem, enrollmentId: e.target.value })
            }
            className="h-10 pl-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[150px]"
          >
            <option value="">-- 학생 선택 --</option>
            {studentList.map((s) => (
              <option key={s.enrollmentId} value={s.enrollmentId}>
                {s.studentName} ({s.studentNumber})
              </option>
            ))}
          </select>

          {/* ② 주차 선택 */}
          <select
            value={newItem.week}
            onChange={(e) => setNewItem({ ...newItem, week: e.target.value })}
            className="h-10 pl-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[100px]"
          >
            {[...Array(16)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}주차
              </option>
            ))}
          </select>

          {/* ③ 날짜 선택 */}
          <input
            type="date"
            value={newItem.sessionDate}
            onChange={(e) =>
              setNewItem({ ...newItem, sessionDate: e.target.value })
            }
            className="h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          />

          {/* ④ 상태 선택 */}
          <select
            value={newItem.status}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            className="h-10 pl-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[100px]"
          >
            {STATUS_OPTIONS.filter((opt) => opt.value !== "ALL").map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* ⑤ 등록 버튼 */}
          <button
            onClick={handleCreate}
            className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            + 등록
          </button>
        </div>
      </div>

      {/* ──────────────── 2. 검색 필터 & 출결 목록 ──────────────── */}
      <div className="space-y-4">
        {/* 검색 필터 바 (신규 등록 섹션과 디자인 일치) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          {/* 좌측: 타이틀 & 카운트 */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              출결 현황 수정
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-sm font-medium text-slate-600">
                {filteredAttendances.length} / {attendances.length}
              </span>
            </h3>
          </div>

          {/* 우측: 필터 컨트롤 */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 학생 필터 */}
            <select
              value={filterCondition.studentId}
              onChange={(e) =>
                setFilterCondition({
                  ...filterCondition,
                  studentId: e.target.value,
                })
              }
              className="h-10 pl-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[150px]"
            >
              <option value="">전체 학생</option>
              {studentList.map((s) => (
                <option key={s.enrollmentId} value={s.enrollmentId}>
                  {s.studentName}
                </option>
              ))}
            </select>

            {/* 주차 필터 */}
            <select
              value={filterCondition.week}
              onChange={(e) =>
                setFilterCondition({ ...filterCondition, week: e.target.value })
              }
              className="h-10 pl-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[100px]"
            >
              <option value="">전체 주차</option>
              {[...Array(16)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}주차
                </option>
              ))}
            </select>

            {/* 초기화 & 새로고침 버튼 */}
            <button
              onClick={resetFilter}
              className="h-10 px-4 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
            >
              초기화
            </button>
            <button
              onClick={refresh}
              className="h-10 px-4 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition"
            >
              ↻ 새로고침
            </button>
          </div>
        </div>

        {/* ──────────────── 출결 목록 테이블 (수정 기능 포함) - 요청하신 원본 코드 유지 ──────────────── */}
        <div className="flex items-center justify-between">
          {/* (참고) 위의 필터바와 중복되는 타이틀/새로고침 버튼이 있지만 요청하신 대로 원본 코드를 유지합니다. */}
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">
            데이터 로딩 중...
          </div>
        ) : filteredAttendances.length === 0 ? (
          <div className="py-20 text-center text-slate-500 border border-dashed rounded-xl">
            {/* 필터링 결과가 없을 때도 메시지를 띄우기 위해 조건 수정 */}
            {attendances.length === 0
              ? "등록된 출결 데이터가 없습니다."
              : "조건에 맞는 데이터가 없습니다."}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    주차
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    학생명 (ID)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    날짜
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                    현재 상태
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                    상태 변경
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {/* 🔥 여기서 attendances 대신 filteredAttendances를 사용해야 필터링이 먹힙니다! */}
                {filteredAttendances.map((item) => (
                  <tr
                    key={item.attendanceId}
                    className="hover:bg-slate-50 transition"
                  >
                    {/* 1. 주차 */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {item.week}주차
                    </td>

                    {/* 2. 학생 정보 */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <span className="font-bold text-slate-800">
                        {item.studentNickName}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        ({item.enrollmentId})
                      </span>
                    </td>

                    {/* 3. 날짜 (공통 유틸 사용) */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {formatDateKorean(
                        item.sessionDate || item.attendanceDate
                      )}
                    </td>

                    {/* 4. 현재 상태 뱃지 (공통 컴포넌트 사용) */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* 5. 상태 변경 드롭다운 (즉시 수정) */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item, e.target.value)
                        }
                        className="text-sm border-slate-300 rounded px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer hover:bg-slate-50"
                      >
                        {/* 공통 상수 활용하여 옵션 생성 */}
                        {STATUS_OPTIONS.filter(
                          (opt) => opt.value !== "ALL"
                        ).map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
