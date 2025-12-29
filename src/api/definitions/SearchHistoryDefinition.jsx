export const searchHistoryDef = {
  key: "search",
  primaryKey: "searchId",
  tableEng: "searchHistory",
  tableName: "검색 로그",
  allColumns: {
    columns: {
      userId: "유저아이디",
      keyword: "키워드",
      searchType: "서치타입",
      createdAt: "작성일자",
    },
    createColumns: {
      userId: "유저아이디",
      keyword: "키워드",
    },
    responseColumns: {
      userId: "유저아이디",
      keyword: "키워드",
      searchType: "서치타입",
      createdAt: "작성일자",
    },
    updateColumns: {
      userId: "유저아이디",
      keyword: "키워드",
      searchType: "서치타입",
      createdAt: "작성일자",
    },
    resultColumn: {
      userId: "유저아이디",
      keyword: "키워드",
      searchType: "서치타입",
      createdAt: "작성일자",
    },
  },

  excludeList: ["posts"],
  color: "bg-blue-200",
};
