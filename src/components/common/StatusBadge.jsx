import React from "react";
import {
  ATTENDANCE_STATUS,
  STATUS_LABEL,
} from "../../constants/attendanceStatus";

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
