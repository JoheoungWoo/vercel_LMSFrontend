import axios from "axios";
import { createTableConfig, excludeColumns } from "./commonApi";
import DepartmentApi from "./DepartmentApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "enrollment";

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
/**
 * 특정 강의(Offering)의 수강생 목록을 조회합니다.
 * @param {number} offeringId - 강의 ID
 * @param {string} userEmail - 교수 이메일 (헤더용)
 */
config.funcs.getStudentsByOffering = async (offeringId, userEmail) => {
  return config.funcs.findByKeywordHttp(
    "offering",
    offeringId,
    userEmail,
    "get"
  );
};

export default { config };
