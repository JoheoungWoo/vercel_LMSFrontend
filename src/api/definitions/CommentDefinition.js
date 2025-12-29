export const CommentDef = {
    key: "comment",
    primaryKey: "commentId",
    tableEng: "Comment",
    tableName: "댓글",
    allColumns: {
        columns: {
            commentId: "댓글아이디",
            content: "댓글내용",
            createdAt: "일자",
            user: "유저",
            posts: "게시판글",
        },
        createColumns: {
            content: "댓글내용",
            createdAt: "일자",
            postId: "게시판글",
        },
        responseColumns: {
            commentId: "댓글아이디",
            content: "댓글내용",
            createdAt: "일자",
            updatedAt:"수정일자",
            postId: "게시판글",
            writerName:"작성자이름",
            boardName:"게시판이름,"
        },
        updateColumns: {
            commentId: "댓글아이디",
            content: "댓글내용",
            createdAt: "일자",
            postId: "게시판글",
        },
    },
    excludeList: ["user", "posts"],
    color: "bg-stone-100",
}