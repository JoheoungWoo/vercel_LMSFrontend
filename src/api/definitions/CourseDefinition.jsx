export const CourseDef = {
    key: "course",
    tableEng: "Course",
    tableName: "강의종류",
    primaryKey: "courseId",
    allColumns: {
        columns: {
            courseId: "강의과목코드",
            courseName: "과목명",
            description: "강의설명",
            credits: "학점",
            department: "학과",
            offerings: "하위강의들",
        },
        createColumns: {
            courseName: "과목명",
            description: "강의설명",
            credits: "학점",
            departmentId: "학과 아이디",
        },
        responseColumns: {
            courseId: "강의과목코드",
            courseName: "과목명",
            description: "강의설명",
            credits: "학점",
            departmentId: "학과 아이디",
        },
        updateColumns: {
            courseId: "강의과목코드",
            courseName: "과목명",
            description: "강의설명",
            credits: "학점",
        },
    },

    excludeList: ["department", "offerings"],
    readOnlyList: [],
    color: "bg-neutral-200",
}