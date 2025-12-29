import axios from "axios";
import { API_SERVER_HOST, createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "gradeItem";
const extraButtons = [];

var tableDefinition = tableDefinitions[tableName];

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

// 🔥 [추가] 커스텀 API: 특정 강의(Offering)의 평가 항목 목록 조회
// Hook(useGradeManagement)에서 사용
config.funcs.findByOffering = async (offeringId) => {
  console.log(`[GradeItemApi] 강의별 평가항목 조회: ${offeringId}`);
  return axios
    .get(`${API_SERVER_HOST}/api/${tableName}/offering/${offeringId}`)
    .then((r) => r.data);
};

export default { config };
