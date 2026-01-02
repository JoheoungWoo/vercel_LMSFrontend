import React, { useState } from "react";
import { useSelector } from "react-redux";

// 1. 교수용 커스텀 훅 (API 연동)
import { useAttendanceManage } from "../../../hook/attendance/useAttendanceManage";

// 2. 🔥 [공통 로직 재활용] 분리해둔 파일들 import
import {
  ATTENDANCE_STATUS,
  STATUS_OPTIONS,
} from "../../../constants/attendanceStatus";
import { StatusBadge } from "../../../components/common/StatusBadge"; // Named Import ({ })
import { formatDateKorean } from "../../../util/dateUtils"; // 폴더명 util 확인!

export default function AttendanceManage({ offeringId }) {
  // 로그인한 교수님 이메일 가져오기
  const userEmail =
    useSelector((state) => state.loginSlice?.email) || "professor@aaa.com";

  // 교수용 훅 사용 (조회, 생성, 수정 기능 포함)
  const { attendances, loading, createAttendance, updateAttendance, refresh } =
    useAttendanceManage(offeringId, userEmail);

  // ─────────────────────────────────────────────────────────────
  // 신규 등록(Create)을 위한 입력 상태 관리
  // ─────────────────────────────────────────────────────────────
  const [newItem, setNewItem] = useState({
    enrollmentId: "",
    week: "1",
    sessionDate: new Date().toISOString().split("T")[0], // 오늘 날짜 기본
    status: ATTENDANCE_STATUS.PRESENT,
  });

  // 신규 등록 핸들러
  const handleCreate = async () => {
    if (!newItem.enrollmentId) {
      alert("수강생 ID(Enrollment ID)를 입력해주세요.");
      return;
    }
    const success = await createAttendance(newItem);
    if (success) {
      // 성공 시 입력창 초기화
      setNewItem({ ...newItem, enrollmentId: "" });
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 상태 수정(Update) 핸들러
  // ─────────────────────────────────────────────────────────────
  const handleStatusChange = async (item, newStatus) => {
    // item이 없거나 item 안에 attendanceId가 없으면 중단
    if (!item || !item.attendanceId) {
      console.error("오류: attendanceId가 없습니다.", item);
      return;
    }

    // 훅 함수에 item 통째로 전달
    await updateAttendance(item, newStatus);
  };

  return (
    <div className="w-full space-y-6 p-4">
      {/* ──────────────── 상단 헤더 & 신규 등록 폼 ──────────────── */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 1. 수강생 ID 입력 */}
            <div>
              <label className="block text-xs font-bold text-indigo-900 mb-1">
                수강생 ID (Enrollment)
              </label>
              <input
                type="number"
                value={newItem.enrollmentId}
                onChange={(e) =>
                  setNewItem({ ...newItem, enrollmentId: e.target.value })
                }
                placeholder="예: 101"
                className="w-full text-sm border-indigo-200 rounded-md focus:ring-indigo-500"
              />
            </div>

            {/* 2. 주차 선택 */}
            <div>
              <label className="block text-xs font-bold text-indigo-900 mb-1">
                주차
              </label>
              <select
                value={newItem.week}
                onChange={(e) =>
                  setNewItem({ ...newItem, week: e.target.value })
                }
                className="w-full text-sm border-indigo-200 rounded-md focus:ring-indigo-500"
              >
                {[...Array(16)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}주차
                  </option>
                ))}
              </select>
            </div>

            {/* 3. 날짜 선택 */}
            <div>
              <label className="block text-xs font-bold text-indigo-900 mb-1">
                수업 날짜
              </label>
              <input
                type="date"
                value={newItem.sessionDate}
                onChange={(e) =>
                  setNewItem({ ...newItem, sessionDate: e.target.value })
                }
                className="w-full text-sm border-indigo-200 rounded-md focus:ring-indigo-500"
              />
            </div>

            {/* 4. 초기 상태 선택 (공통 상수 활용) */}
            <div>
              <label className="block text-xs font-bold text-indigo-900 mb-1">
                상태
              </label>
              <select
                value={newItem.status}
                onChange={(e) =>
                  setNewItem({ ...newItem, status: e.target.value })
                }
                className="w-full text-sm border-indigo-200 rounded-md focus:ring-indigo-500"
              >
                {STATUS_OPTIONS.filter((opt) => opt.value !== "ALL").map(
                  (opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* 등록 버튼 */}
          <button
            onClick={handleCreate}
            className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-md shadow transition"
          >
            + 등록하기
          </button>
        </div>
      </div>

      {/* ──────────────── 출결 목록 테이블 (수정 기능 포함) ──────────────── */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">
          출결 현황{" "}
          <span className="text-sm font-normal text-slate-500">
            ({attendances.length}건)
          </span>
        </h3>
        <button
          onClick={refresh}
          className="text-sm text-slate-500 hover:text-indigo-600 underline"
        >
          새로고침
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">
          데이터 로딩 중...
        </div>
      ) : attendances.length === 0 ? (
        <div className="py-20 text-center text-slate-500 border border-dashed rounded-xl">
          등록된 출결 데이터가 없습니다.
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
              {attendances.map((item) => (
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
                    {formatDateKorean(item.sessionDate || item.attendanceDate)}
                  </td>

                  {/* 4. 현재 상태 뱃지 (공통 컴포넌트 사용) */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* 5. 상태 변경 드롭다운 (즉시 수정) */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item, e.target.value)}
                      className="text-sm border-slate-300 rounded px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer hover:bg-slate-50"
                    >
                      {/* 공통 상수 활용하여 옵션 생성 */}
                      {STATUS_OPTIONS.filter((opt) => opt.value !== "ALL").map(
                        (opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        )
                      )}
                    </select>
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
