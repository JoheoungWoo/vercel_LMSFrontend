export const ClassroomDef = {
  key: "classroom",
  primaryKey: "classroomId",
  tableEng: "Classroom",
  tableName: "강의실",
  allColumns: {
    columns: {
      classroomId: "강의실아이디",
      location: "장소",
      capacity: "수용인원",
    },
    createColumns: {
      location: "장소",
      capacity: "수용인원",
    },
    responseColumns: {
      classroomId: "강의실아이디",
      location: "장소",
      capacity: "수용인원",
    },
    updateColumns: {
      classroomId: "강의실아이디",
      location: "장소",
      capacity: "수용인원",
    },
  },
  excludeList: [],
  color: "bg-blue-100",
};
