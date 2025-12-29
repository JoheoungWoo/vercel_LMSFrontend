import axios from "axios";
import { API_SERVER_HOST, createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "studentScore"; // tablesConfig의 key와 일치해야 함

const extraButtons = [];

var tableDefinition = tableDefinitions[tableName];

// 검색 및 테이블 설정 오버라이드
tableDefinition = {
  ...tableDefinition,
  allColumns: {
    ...tableDefinition.allColumns,
    searchColumns: {
      one: tableDefinition.allColumns.responseColumns,
    },
  },
};

const config = createTableConfig(tableDefinition, extraButtons);

// 🔥 [추가] 커스텀 API 모음

// 1. [교수용] 특정 강의(Offering)의 전체 학생 점수 조회 (성적기입부용)
config.funcs.findByOffering = async (offeringId) => {
  console.log(`[StudentScoreApi] 강의별 점수 전체 조회: ${offeringId}`);
  return axios
    .get(`${API_SERVER_HOST}/api/${tableName}/offering/${offeringId}`)
    .then((r) => r.data);
};

// 2. [학생용] 나의 성적 조회
config.funcs.findMyScores = async (email) => {
  console.log(`[StudentScoreApi] 내 성적 조회: ${email}`);
  return axios
    .get(`${API_SERVER_HOST}/api/${tableName}/my/${email}`)
    .then((r) => r.data);
};

// 3. [교수용] 점수 저장 (기존 updateOne을 써도 되지만, 전용 엔드포인트가 있다면 사용)
// 만약 백엔드 Controller에 /save 엔드포인트가 따로 없다면, 기본 config.funcs.updateOne을 사용하면 됩니다.
config.funcs.saveScore = async (dto, userEmail) => {
  return axios
    .post(`${API_SERVER_HOST}/api/${tableName}/save`, dto, {
      headers: { "X-User-Email": userEmail },
    })
    .then((r) => r.data);
};

export default { config };
