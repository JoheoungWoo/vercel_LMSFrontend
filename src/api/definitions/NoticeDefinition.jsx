export const NoticeDef = {
    key: "notice",
    primaryKey: "noticeId",
    tableEng: "Notice",
    tableName: "공지사항",
    allColumns: {
        columns: {
            noticeId: "공지사항아이디",
            title: "제목",
            content: "내용",
            createdAt: "작성일자",
            userDTO: "유저",
        },
        createColumns: {
            title: "제목",
            content: "내용",
            createdAt: "작성일자",
        },
        responseColumns: {
            noticeId: "공지사항아이디",
            title: "제목",
            content: "내용",
            createdAt: "작성일자",
        },
        updateColumns: {
            noticeId: "공지사항아이디",
            title: "제목",
            content: "내용",
        },
    },

    excludeList: ["userDTO"],
    color: "bg-amber-100",
}