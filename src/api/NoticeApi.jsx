// src/api/NoticeApi.js
import axios from "axios";
import { createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "notice";
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

/* ✅ axios 인스턴스 */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

/** ✅ 전체 공지 조회 */
export const getNotices = () => api.get("/notice/all");

/** ✅ 단일 공지 조회 */
export const getNoticeById = (noticeId) =>
  api.get(`/notice/one/${noticeId}`);

/** ✅ 공지 생성 */
export const createNotice = (data) =>
  api.post("/notice/create", data);

/** ✅ 공지 수정 */
export const updateNotice = (noticeId, data) =>
  api.put("/notice/update", { noticeId, ...data });

/** ✅ 공지 삭제 */
export const deleteNotice = (noticeId) =>
  api.delete(`/notice/delete/${noticeId}`);

/** (옵션) 고정 토글 */
export const toggleNoticePin = (noticeId) =>
  api.patch(`/notice/${noticeId}/pin`);

/** config 생성 */
const config = createTableConfig(tableDefinition, extraButtons);

/** funcs 주입 */
config.funcs = {
  // 전체 조회
  all: getNotices,
  readAll: getNotices,
  getAll: getNotices,
  list: getNotices,

  // 단일 조회
  one: getNoticeById,
  readOne: getNoticeById,

  // CUD
  create: createNotice,
  update: updateNotice,
  remove: deleteNotice,
  delete: deleteNotice,

  // pin
  togglePin: toggleNoticePin,
  pin: toggleNoticePin,
};

export default { config };
