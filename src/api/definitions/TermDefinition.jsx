export const TermDef = {
  key: "term",
  primaryKey: "termId",
  tableEng: "Term",
  tableName: "학기내역",
  allColumns: {
    columns: {
      attendanceId: "이름",
      localDateTime: "출석일",
      status: "상태",
      enrollment: "수강내역",
    },
    createColumns: {
      year: "년도",
      semester: "학기",
      registrationStart: "수강신청 시작 일자",
      registrationEnd: "수강신청 종료 일자",
      isCurrent: "현재 학기 여부",
    },
    responseColumns: {
      termId: "학기 아이디",
      year: "년도",
      semester: "학기",
      registrationStart: "수강신청 시작 일자",
      registrationEnd: "수강신청 종료 일자",
      isCurrent: "현재 학기 여부",
    },
    updateColumns: {
      termId: "학기 아이디",
      year: "년도",
      semester: "학기",
      registrationStart: "수강신청 시작 일자",
      registrationEnd: "수강신청 종료 일자",
      isCurrent: "현재 학기 여부",
    },
  },
  excludeList: ["enrollment"],
  color: "bg-gray-100",
};
