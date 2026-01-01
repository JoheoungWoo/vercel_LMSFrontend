import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAttendanceManagement } from "../../../hook/attendance/useAttendanceManagement";

// 출석 상태에 따른 뱃지 컴포넌트
const StatusBadge = ({ status }) => {
  let colorClass = "bg-slate-100 text-slate-600"; // 기본 (미처리)

  switch (status) {
    case "PRESENT": // 출석
    case "ATTENDANCE":
      colorClass = "bg-green-100 text-green-700 ring-1 ring-green-600/20";
      break;
    case "LATE": // 지각
      colorClass = "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/20";
      break;
    case "ABSENT": // 결석
      colorClass = "bg-red-100 text-red-700 ring-1 ring-red-600/20";
      break;
    case "EXCUSED": // 공결
      colorClass = "bg-blue-100 text-blue-700 ring-1 ring-blue-600/20";
      break;
    default:
      break;
  }

  // 한글 매핑 (필요시 수정)
  const labelMap = {
    PRESENT: "출석",
    ATTENDANCE: "출석",
    LATE: "지각",
    ABSENT: "결석",
    EXCUSED: "공결",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${colorClass}`}
    >
      {labelMap[status] || status || "미처리"}
    </span>
  );
};

export default function AttendanceView() {
  // 1. 로그인 정보 가져오기
  const userEmail =
    useSelector((state) => state.loginSlice?.email) || "student@aaa.com"; // 테스트용 기본값

  // 2. Hook 연결
  const { data, loading, fetchAttendance } = useAttendanceManagement(userEmail);

  // 3. 초기 데이터 로드 (내 출석 전체 조회)
  useEffect(() => {
    if (userEmail) {
      fetchAttendance("my", userEmail);
    }
  }, [userEmail, fetchAttendance]);

  // 날짜 포맷팅 헬퍼
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  return (
    <div className="w-full">
      {/* 상단 요약 (선택 사항) */}
      <div className="mb-4 flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
        <div>
          <h3 className="font-bold text-slate-800">나의 출석 현황</h3>
          <p className="text-xs text-slate-500">
            {userEmail} 님의 전체 기록입니다.
          </p>
        </div>
        <button
          onClick={() => {
            fetchAttendance("my", userEmail);
            console.log(fetchAttendance);
          }}
          className="text-xs bg-white border px-3 py-1 rounded hover:bg-slate-50"
        >
          새로고침
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading ? (
        <div className="py-10 text-center text-slate-500">
          데이터를 불러오는 중...
        </div>
      ) : data.length === 0 ? (
        <div className="py-10 text-center text-slate-500 border-dashed border rounded-xl">
          출석 기록이 없습니다.
        </div>
      ) : (
        /* 테이블 영역 */
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  과목명
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  주차/회차
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  날짜
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data.map((item, index) => (
                <tr
                  key={item.attendanceId || index}
                  className="hover:bg-slate-50 transition"
                >
                  {/* 과목명 (DTO 구조에 따라 필드명 수정 필요) */}
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-800">
                    {/* 만약 item.courseName이 없다면 enrollment 객체 안을 확인해야 함 */}
                    {item.courseName ||
                      item.enrollment?.classSection?.courseOffering
                        ?.courseName ||
                      "과목 정보 없음"}
                  </td>

                  {/* 주차 정보 */}
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                    {item.week}주차
                  </td>

                  {/* 날짜 */}
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                    {formatDate(item.attendanceDate)}
                  </td>

                  {/* 상태 뱃지 */}
                  <td className="px-4 py-3 whitespace-nowrap text-center">
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
