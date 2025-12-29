export const DepartmentDef = {
    key: "department",
    primaryKey: "departmentId",
    tableEng: "Department",
    tableName: "학과",
    allColumns: {
        columns: {
            departmentId: "학과아이디",
            deptName: "학과이름",
            courses: "코스목록",
        },
        createColumns: {
            deptName: "학과이름",
        },
        responseColumns: {
            departmentId: "학과아이디",
            deptName: "학과이름",
        },
        updateColumns: {
            departmentId: "학과아이디",
            deptName: "학과이름",
        },
    },
    excludeList: ["courses"],
    readOnlyList: [],
    color: "bg-yellow-200",
}