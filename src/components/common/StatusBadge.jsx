import React from "react";
// import {
//   ATTENDANCE_STATUS,
//   STATUS_LABEL,
// } from "../../constants/attendanceStatus";

// ../../constants/attendanceStatus.js

// 1. 상태 상수 (로직용 영문 코드)
export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  LATE: "LATE",
  ABSENT: "ABSENT",
  EXCUSED: "EXCUSED",
};

export const STATUS_OPTIONS = [
  { value: "ALL", label: "전체" }, // 필터용 (Create에서는 제외됨)
  { value: ATTENDANCE_STATUS.PRESENT, label: "출석" },
  { value: ATTENDANCE_STATUS.LATE, label: "지각" },
  { value: ATTENDANCE_STATUS.ABSENT, label: "결석" },
  { value: ATTENDANCE_STATUS.EXCUSED, label: "공결" },
];

// 2. 상태 라벨 (화면 표시용 한글 텍스트)
// 🔥 질문하신 STATUS_LABEL의 원형입니다.
export const STATUS_LABEL = {
  [ATTENDANCE_STATUS.PRESENT]: "출석",
  [ATTENDANCE_STATUS.LATE]: "지각",
  [ATTENDANCE_STATUS.ABSENT]: "결석",
  [ATTENDANCE_STATUS.EXCUSED]: "공결", // 또는 '인정 결석'
  // 만약 코드에서 "ATTENDANCE"라는 문자열도 들어온다면 아래 줄 추가
  ATTENDANCE: "출석",
};

// 🔥 [수정] const 앞에 'export'를 붙여주세요!
export const StatusBadge = ({ status }) => {
  let colorClass = "bg-slate-100 text-slate-600";

  switch (status) {
    case ATTENDANCE_STATUS.PRESENT:
    case "ATTENDANCE":
      colorClass = "bg-green-100 text-green-700 ring-1 ring-green-600/20";
      break;
    case ATTENDANCE_STATUS.LATE:
      colorClass = "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/20";
      break;
    case ATTENDANCE_STATUS.ABSENT:
      colorClass = "bg-red-100 text-red-700 ring-1 ring-red-600/20";
      break;
    case ATTENDANCE_STATUS.EXCUSED:
      colorClass = "bg-blue-100 text-blue-700 ring-1 ring-blue-600/20";
      break;
    default:
      break;
  }

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${colorClass}`}
    >
      {STATUS_LABEL[status] || status || "미처리"}
    </span>
  );
};

// 🔥 [삭제] 맨 아래에 있던 'export default StatusBadge;' 줄은 지워버리세요!
