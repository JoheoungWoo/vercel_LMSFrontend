import axios from "axios";
import { createTableConfig, excludeColumns } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "comment";

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

/**
 * 댓글 목록 조회
 * @param {number} postId
 */
export const getCommentsByPost = (postId) => {
  return axios.get(`/posts/${postId}/comments`);
};

/**
 * 댓글 등록
 * @param {number} postId
 * @param {Object} data { content }
 */
export const createComment = (postId, data) => {
  return axios.post(`/posts/${postId}/comments`, data);
};

/**
 * 댓글 삭제
 * @param {number} commentId
 */
export const deleteComment = (commentId) => {
  return axios.delete(`/comments/${commentId}`);
};

/**
 * 댓글 수정
 * @param {number} commentId
 * @param {Object} data { content }
 */
export const updateComment = (commentId, data) => {
  return axios.put(`/comments/${commentId}`, data);
};


export default { config };  