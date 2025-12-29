export const ClassSectionDef = {
  key: "section",
  primaryKey: "sectionId",
  tableEng: "ClassSection",
  tableName: "분반내역",
  allColumns: {
    Columns: {
      sectionId: "분반 내역 아이디",
      sectionName: "분반명",
      maxCapacity: "정원",
      currentCount: "현재 수강 신청 인원수",
    },
    createColumns: {
      offeringId: "개설강의 id",
      sectionName: "분반명",
      maxCapacity: "정원",
      sectionType: "수업 유형",
      timeTables: "시간표 목록",
    },
    responseColumns: {
      sectionId: "분반 내역 아이디",
      sectionName: "분반명",
      maxCapacity: "정원",
      currentCount: "현재 인원",

      // 섹션 타입 관련
      sectionType: "수업 유형 코드", // ONLINE, OFFLINE
      sectionTypeDisplay: "수업 유형 설명", // "비대면 온라인 수업" 등

      // 계산된 필드 (백엔드 로직에 따름)
      availableSeats: "남은 정원",
      isFull: "마감 여부",
      enrollmentRate: "수강률",

      // 상위 강의 정보
      offeringId: "개설강의 id",
      courseName: "강의명",
      year: "개설년도",
      semester: "개설학기",
      professorName: "담당교수",

      // 중요: 강의실ID는 여기 없고 timeTables 안에 있음
      timeTables: "시간표 상세 정보", // List<TimeTableResponseDTO> 구조
    },
    updateColumns: {
      offeringId: "개설강의 id",
      sectionName: "분반명",
      maxCapacity: "정원",
      sectionType: "수업 유형", // 수정 시에도 타입 변경 가능
    },
  },

  excludeList: ["courseOffering"],
  color: "bg-pupple-100",
};
