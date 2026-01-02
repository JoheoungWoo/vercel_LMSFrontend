import { createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

// 1. tablesConfig.js에서 정의한 객체 키 이름 (GradeItemDef가 할당된 키)
const tableName = "gradeItem";
const tableDefinition = tableDefinitions[tableName];

// 2. 기본 CRUD 설정 생성
// (이미 tableDefinition.key가 "grade-item"이므로, API 주소는 자동으로 "/api/grade-item"이 됩니다!)
const config = createTableConfig(tableDefinition, []);

// 3. 커스텀 API 추가: 특정 강의의 평가 항목 목록 조회
// 백엔드 엔드포인트: GET /api/grade-item/offering/{offeringId}
config.funcs.findByOffering = async (offeringId) => {
  // commonApi의 findByKeywordHttp를 재활용하여 구현
  // 결과적으로 GET /api/grade-item/offering/{offeringId} 요청이 전송됨
  return config.funcs.findByKeywordHttp(
    "offering", // URL 중간 경로
    offeringId, // URL 마지막 파라미터
    null, // email (필요하면 전달, 없으면 null)
    "get"
  );
};

export default { config };
