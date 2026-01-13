// 출결 상태 상수 정의
export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  LATE: "LATE",
  EXCUSED: "EXCUSED",
};

// 화면 표시용 라벨 맵
export const STATUS_LABEL = {
  [ATTENDANCE_STATUS.PRESENT]: "출석",
  [ATTENDANCE_STATUS.ABSENT]: "결석",
  [ATTENDANCE_STATUS.LATE]: "지각",
  [ATTENDANCE_STATUS.EXCUSED]: "공결",
};

// 드롭다운 옵션 (필터용)
export const STATUS_OPTIONS = [
  { label: "전체 상태", value: "ALL" },
  { label: "출석", value: "PRESENT" },
  { label: "결석", value: "ABSENT" },
  { label: "지각", value: "LATE" },
  { label: "공결", value: "EXCUSED" },
];
