export const GradeDef = {
  key: "grade",
  primaryKey: "gradeId",
  tableEng: "Grade",
  tableName: "성적",
  allColumns: {
    columns: {
      gradeId: "성적아이디",
      totalScore: "총점",
      letterGrade: "등급",
      createAt: "생성시간",
      updateAt: "수정시간",
    },
    createColumns: {
      enrollmentId: "수강신청Id",
      totalScore: "총점",
      letterGrade: "등급",
    },
    responseColumns: {
      gradeId: "성적아이디",
      totalScore: "총점",
      letterGrade: "등급",
      createAt: "생성시간",
      updateAt: "수정시간",
      enrollmentId: "수강신청Id",
      studentName: "학생이름",
      professorName: "교수이름",
      courseName: "과목명",
      credit: "학점",
    },
    updateColumns: {
      gradeId: "성적아이디",
      totalScore: "총점",
      letterGrade: "등급",
    },
  },

  excludeList: ["enrollment", "courseName"],
  color: "bg-amber-100",
};
