export const TimeTableDef = {
  key: "time",
  primaryKey: "timetableId",
  tableEng: "TimeTable",
  tableName: "시간표",
  allColumns: {
    columns: {
      timetableId: "시간표아이디",
      dayOfWeek: "요일",
      startTime: "수업시작시간",
      endTime: "수업종료시간",
      location: "위치",
      courseName: "강의명",
      nickName: "학생이름",
    },
    createColumns: {
      sectionId: "분반Id",
      classroomId: "강의실 ID",
      dayOfWeek: "요일",
      startTime: "시작시간",
      endTime: "종료시간",
    },
    responseColumns: {
      timetableId: "시간표 ID",
      dayOfWeek: "요일",
      startTime: "시작 시간",
      endTime: "종료 시간",

      // 강의실 정보
      classroomId: "강의실 ID",
      classroomName: "강의실 위치", // 예: "공학관 301호"

      // 분반 및 강의 정보
      sectionId: "분반 ID",
      sectionName: "분반명", // 예: "A반"
      courseName: "강의명", // 예: "자바 프로그래밍"

      //교수정보
      professorName: "교수이름",
    },
    updateColumns: {
      timetableId: "시간표 Id",
      classroomId: "강의실 ID", // 수정 시 강의실 변경 가능
      dayOfWeek: "요일",
      startTime: "시간시간",
      endTime: "종료시간",
    },
  },
  excludeList: ["courseOffering"],
  color: "bg-emerald-100",
};
