import axios from "axios";
import { createTableConfig, excludeColumns } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "search";

const extraButtons =
  [

  ];

var tableDefinition = tableDefinitions[tableName];
tableDefinition = {
  ...tableDefinition,
  allColumns: {
    ...tableDefinition.allColumns,
    searchColumns: {
      "one": tableDefinition.allColumns.responseColumns
    }
  }
}
const config = createTableConfig(tableDefinition, extraButtons);

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

/** 검색 기록 조회 */
export const getSearchHistory = () =>
  api.get("/search-history");

/** 검색어 저장 */
export const createSearchHistory = (keyword) =>
  api.post("/search-history", { keyword });

/** 개별 삭제 */
export const deleteSearchHistory = (id) =>
  api.delete(`/search-history/${id}`);

/** 전체 삭제 */
export const clearSearchHistory = () =>
  api.delete("/search-history");

export default { config };  