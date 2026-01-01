// src/api/GradeApi.js
import { createExtraApi, createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "grade"; // 백엔드 @RequestMapping("/api/grade")
const extraButtons = [];
const tableDefinition = tableDefinitions[tableName];
const config = createTableConfig(tableDefinition, extraButtons);

// 커스텀 함수 추가
config.funcs.findMyGrades = async (studentEmail) => {
  return config.funcs.findMy(studentEmail); // /api/grade/my/{email} (또는 백엔드 구현에 따라 /student/{email})
};

// 백엔드 GradeController에 "/student/{email}"이 있다면 아래처럼 오버라이딩
config.funcs.findStudentGrades = async (email, requesterEmail) => {
  // commonApi의 기본 findMyByEmail을 활용하거나 커스텀 호출
  // 예: axios.get(`/api/grade/student/${email}`, { headers: ... })
  return config.funcs.findMyByEmail(email);
};

export default { config };
