export const GradeItemDef = {
  key: "grade-item",
  primaryKey: "itemId", // 백엔드 DTO 기준 (ResponseDTO.itemId)
  tableEng: "GradeItem",
  tableName: "평가 항목", // 중간고사, 과제 등

  allColumns: {
    // 1. 전체 컬럼 정의 (한글 매핑)
    columns: {
      itemId: "평가항목 ID",
      offeringId: "개설강의 ID",
      courseName: "과목명",
      itemName: "평가 항목명", // 중간고사, 기말고사...
      itemType: "평가 유형", // EXAM, ASSIGNMENT...
      maxScore: "만점 기준", // 100
      weightPercent: "반영 비율(%)", // 30
      description: "설명",
      studentCount: "대상 인원",
      createdAt: "생성일",
      updatedAt: "수정일",
    },

    // 2. 생성 시 필요한 컬럼 (GradeItemCreateDTO 기준)
    createColumns: {
      offeringId: "개설강의 ID", // (보통 자동주입 되지만 폼에 필요하다면 유지)
      itemName: "평가 항목명", // 필수
      itemType: "평가 유형", // 필수 (드롭다운 필요: EXAM, ASSIGNMENT...)
      maxScore: "만점", // 필수
      weightPercent: "반영 비율(%)", // 필수
      description: "설명", // 선택
    },

    // 3. 조회 시 보여줄 컬럼 (GradeItemResponseDTO 기준)
    responseColumns: {
      itemId: "ID",
      courseName: "과목명",
      itemName: "항목명",
      itemType: "유형",
      maxScore: "만점",
      weightPercent: "비율(%)",
      studentCount: "인원",
      // createdAt: "생성일", // 필요하면 주석 해제
    },

    // 4. 수정 시 필요한 컬럼 (GradeItemUpdateDTO 기준)
    // 주의: itemType과 offeringId는 수정 DTO에 없으므로 제외했습니다.
    updateColumns: {
      itemId: "평가항목 ID", // (Hidden으로 처리됨)
      itemName: "평가 항목명",
      maxScore: "만점",
      weightPercent: "반영 비율(%)",
      description: "설명",
    },
  },

  // 리스트에서 굳이 안 보여줘도 되는 컬럼들
  excludeList: ["offeringId", "description", "createdAt", "updatedAt"],

  // UI 색상 테마
  color: "bg-indigo-100",
};
