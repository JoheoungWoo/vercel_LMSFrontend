export const SubmissionDef = {
  key: "submission",
  primaryKey: "submissionId",
  tableEng: "Submission",
  tableName: "제출내역",
  allColumns: {
    columns: {
      submissionId: "ID",
      assignment: "과제 정보",
      student: "학생 이름",
      submittedAt: "제출일시",
      score: "점수",
      fileUrl: "파일 경로",
    },
    createColumns: {
      assignment: "과제 ID",
      fileUrl: "파일 URL",
      // 학생은 로그인 세션에서 따오므로 보통 생성 폼에는 안 넣지만,
      // 관리자 모드라면 'student' 입력이 필요할 수 있습니다.
    },
    responseColumns: {
      submissionId: "ID",
      assignmentTitle: "과제 정보",
      studentName: "학생 정보",
      submittedAt: "제출일시",
      score: "점수",
      fileUrl: "파일 다운로드",
    },
    updateColumns: {
      fileUrl: "파일 수정", // 학생: 재제출 용도
      score: "점수(채점)", // 교수: 채점 용도
    },
  },
  // assignment와 student는 객체 정보라 테이블 리스트에서 깨질 수 있고,
  // fileUrl은 링크가 너무 길어서 목록에서는 가리는 게 깔끔합니다.
  excludeList: ["assignment", "student", "fileUrl"],
  color: "bg-green-100", // 제출/성공의 의미로 초록색 계열 추천
};
