// src/api/BoardApi.js
import axios from "axios";
import { createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "board";
const extraButtons = [];

let tableDefinition = tableDefinitions[tableName];
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

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

/** ✅ 커뮤니티에서 쓰는 이름 그대로 제공 */
export const getPostsByBoard = (boardType) =>
  api.get("/post/all", { params: { boardType } });

/** 게시글 전체 조회 (게시판 타입별) - 기존 함수도 유지 */
export const getBoardPosts = (boardType) => getPostsByBoard(boardType);

/** 게시글 작성 */
export const createBoardPost = (data) => api.post("/post", data);

export default { config };
