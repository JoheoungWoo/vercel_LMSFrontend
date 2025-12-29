export const FileAttachmentDef = {
  key: "file",
  primaryKey: "fileId",
  tableEng: "FileAttachment",
  tableName: "파일첨부",
  allColumns: {
    columns: {
      fileName: "파일이름",
      filePath: "파일패스",
    },
    createColumns: {
      postId: "게시글아이디",
      fileName: "파일이름",
      filePath: "파일패스",
      files: "파일",
    },
    responseColumns: {
      Id: "아이디",
      PostId: "게시물아이디",
      fileName: "파일이름",
      filePath: "파일패스",
      size: "파일사이즈",
      contentType: "콘텐츠타입",
    },
    updateColumns: {
      postId: "게시글아이디",
      fileName: "파일이름",
      filePath: "파일패스",
    },
  },

  excludeList: ["posts"],
  color: "bg-pink-200",
};
