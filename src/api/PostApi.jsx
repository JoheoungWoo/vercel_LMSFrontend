// src/api/postApi.js
import axios from "axios";
import { createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "post";

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

// ✅ 문자열이 아니라 axios 인스턴스여야 함
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // 필요 없으면 false로
});

// ✅ (백엔드) GET /api/post
export const getPosts = async () => {
  const res = await api.get("/post");
  return res.data; // List<PostDTO>
};

// ✅ (백엔드) GET /api/one/{postId}
export const getPostDetail = async (postId) => {
  const res = await api.get(`/post/one/${postId}`);
  return res.data; // PostResponseDTO
};

// ✅ (백엔드) POST /api/create
export const createPost = async (postData, email = "test@aaa.com") => {
  const res = await api.post("/post/create", postData, {
    headers: { "X-User-Email": email },
  });
  return res.data;
};

// ✅ (백엔드) PUT /api/update  (Body로 DTO 통째로 보냄)
export const updatePost = async (updateDto, email = "test@aaa.com") => {
  const res = await api.put("/post/update", updateDto, {
    headers: { "X-User-Email": email },
  });
  return res.data;
};

// ✅ (백엔드) DELETE /api/delete/{postId}
export const deletePost = async (postId, email = "test@aaa.com") => {
  const res = await api.delete(`/post/delete/${postId}`, {
    headers: { "X-User-Email": email },
  });
  return res.data;
};

/** 게시글별 댓글 조회 */
export const getCommentsByPost = (postId) =>
  api.get(`/posts/${postId}/comment`);

export default { 
  config, 
  getPosts, 
  getPostDetail, 
  createPost, 
  updatePost, 
  deletePost 
};
