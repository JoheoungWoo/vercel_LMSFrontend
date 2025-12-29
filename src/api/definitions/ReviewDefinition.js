export const ReviewDef = {
    key: "review",
    primaryKey: "reviewId",
    tableEng: "Review",
    tableName: "리뷰",
    allColumns: {
        columns: {
            reviewId: "리뷰아이디",
            rating: "평가점수",
            comment: "댓글내용",
            createdAt: "작성일자",
            updatedAt: "수정날짜",
            courseName: "강의이름",
            studentNickname: "학생이름",
        },
        createColumns: {
            enrollmentId: "리뷰아이디",
            rating: "평가점수",
            comment: "댓글내용",
        },
        responseColumns: {
            reviewId: "리뷰아이디",
            rating: "평가점수",
            comment: "댓글내용",
            createdAt: "작성일자",
            updatedAt: "수정날짜",
            courseName: "강의이름",
            studentNickname: "학생이름",
        },
        updateColumns: {
            rating: "평가점수",
            comment: "댓글내용",
        },
    },
}