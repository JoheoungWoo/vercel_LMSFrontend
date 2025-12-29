export const PostDef = {
  key: "post",
  primaryKey: "postId",
  tableEng: "Post",
  tableName: "게시글",
  allColumns: {
    columns: {
      postId: "게시글아이디",
      title: "제목",
      content: "내용",
      createAt: "작성일자",
      userId: "유저",
      viewCount: "뷰 수",
      comments: "댓글",
    },
    createColumns: {
      boardId: "게시판아이디",
      title: "제목",
      content: "내용",
      createAt: "작성일자",
      userId: "유저",
    },
    responseColumns: {
      postId: "게시글아이디",
      title: "제목",
      content: "내용",
      createdAt: "작성일자",
      userId: "유저",
      updateAt: "수정일자",
      boardName: "게시판이름",
    },
    updateColumns: {
      postId: "게시글아이디",
      title: "제목",
      content: "내용",
      createdAt: "작성일자",
      updatedAt: "수정일자",
    },
  },

  excludeList: ["userDTO"],
  color: "bg-lime-100",
};
