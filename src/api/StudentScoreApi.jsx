// src/api/StudentScoreApi.js
import { createExtraApi, createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "studentScore"; // 백엔드 @RequestMapping("/api/student-scores")
const tableDefinition = tableDefinitions[tableName];
const config = createTableConfig(tableDefinition, []);

// 커스텀 함수: 특정 수강신청(Enrollment)의 점수 목록 조회
config.funcs.findByEnrollment = async (enrollmentId) => {
  // 백엔드 StudentScoreRepository.findByEnrollmentId 대응
  // 백엔드 컨트롤러에 해당 엔드포인트가 없다면 /all 조회 후 필터링하거나 추가 필요
  // 여기서는 commonApi의 findByKeyword를 활용하여 구현한다고 가정
  // 또는 StudentScoreController의 getItemScores 등을 응용

  // *백엔드 StudentScoreController에 /enrollments/{enrollmentId} 가 있다고 가정*
  // 없다면 commonApi의 findByKeyword('enrollment', enrollmentId) 사용
  return config.funcs.findByKeyword("enrollments", enrollmentId);
};

export default { config };
