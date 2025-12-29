export const StudentScoreDef = {
  key: "studentScore",
  primaryKey: "scoreId",
  tableEng: "StudentScore",
  tableName: "학생 상세 점수",

  allColumns: {
    columns: {
      scoreId: "점수 ID",
      scoreObtained: "획득 점수",
      createdAt: "입력일",
      updatedAt: "수정일",
      itemId: "평가항목 ID",
      itemName: "평가 항목명",
      maxScore: "만점 기준",
      weightPercent: "반영 비율(%)",
      studentName: "학생 이름",
      enrollmentId: "수강신청 ID",
      weightedScore: "환산 점수",
    },
    createColumns: {
      enrollmentId: "수강신청 ID",
      itemId: "평가항목 ID",
      scoreObtained: "획득 점수",
    },

    responseColumns: {
      scoreId: "ID",
      studentName: "학생 이름",
      itemName: "평가 항목",
      scoreObtained: "획득 점수",
      maxScore: "만점",
      weightPercent: "비율(%)",
      weightedScore: "환산 점수",
      // updatedAt: "최근 수정일", // 필요 시 주석 해제
    },
    updateColumns: {
      scoreId: "점수 ID",
      scoreObtained: "획득 점수",
    },
  },

  excludeList: ["enrollmentId", "itemId", "createdAt"],

  color: "bg-green-100",
};
