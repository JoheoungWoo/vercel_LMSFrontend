export const SSHDef = {
  key: "sshistory",
  primaryKey: "statusHistoryId",
  tableEng: "SSHistory",
  tableName: "학적변동내역",
  allColumns: {
    columns: {
      attendanceId: "이름",
      localDateTime: "출석일",
      status: "상태",
      enrollment: "수강내역",
    },
    createColumns: {
      changeType: "휴학,복학등 상태",
      reason: "사유",
      userId: "처리 일자",
    },
    responseColumns: {
      statusHistoryId: "이력 아이디",
      changeType: "휴학, 복학등 상태",
      changeDate: "처리 일자",
      reason: "사유",
      userId: "유저 아이디",
    },
    updateColumns: {
      statusHistoryId: "이력 아이디",
      changeType: "휴학, 복학등 상태",
      changeDate: "처리 일자",
      reason: "사유",
      userId: "유저 아이디",
    },
  },
  excludeList: ["enrollment"],
  color: "bg-gray-100",
};
