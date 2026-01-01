import axios from "axios";
import { createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";


/* =========================
   axios instance
========================= */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

/* =========================
   API FUNCTIONS
========================= */

/** 관리자 댓글 전체 조회 */
export const getAllComments = () => api.get("/comment/all");

/** 댓글 숨김 */
export const hideComment = (commentId) =>
  api.patch(`/comment/${commentId}/hide`);

/** 댓글 복구 */
export const restoreComment = (commentId) =>
  api.patch(`/comment/${commentId}/restore`);

/** 댓글 삭제 */
export const deleteComment = (commentId) =>
  api.delete(`/comment/delete/${commentId}`);

/** 게시글별 댓글 조회 */
export const getCommentsByPost = (postId) =>
  api.get(`/post/${postId}/comment`);

/** 댓글 등록 */
// 주의: 서버 컨트롤러의 @PostMapping 경로가 /posts/{postId}/comments 인지 확인 필요
export const createComment = (postId, data) =>{
  console.log( data)
  api.post(`/comment/create`, data);

}
  
/** 댓글 수정 */
export const updateComment = (commentId, data) =>
  api.put(`/comment/update`, data);

/* =========================
   table config
========================= */

const tableName = "comment";

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

const extraButtons = [];

/* =========================
   config 생성 및 funcs 할당
========================= */
const config = createTableConfig(tableDefinition, extraButtons);

config.funcs = {
  // 목록 조회
  all: getAllComments,
  list: getAllComments,
  
  // ✅ 특정 게시글의 댓글 조회 (CommunityBoard에서 사용)
  listByPost: getCommentsByPost, 

  // ✅ 댓글 등록 (CommunityBoard에서 사용)
  create: createComment, 

  // 상태 관리
  hide: hideComment,
  restore: restoreComment,

  // 삭제 관리
  delete: deleteComment,
  remove: deleteComment,
  
  // 수정 관리
  update: updateComment,
};

/* =========================
   Export
========================= */
// config 객체와 개별 함수들을 함께 내보내어 어디서든 쓰기 편하게 설정
export default { 
  config,
  create: createComment,
  listByPost: getCommentsByPost,
  getAll: getAllComments,
  remove: deleteComment
};