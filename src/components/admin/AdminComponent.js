import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import AssignmentApi from "../../api/AssignmentApi";
import AttendanceApi from "../../api/AttendanceApi";
import BoardApi from "../../api/BoardApi";
import CommentApi from "../../api/CommentApi";
import CourseApi from "../../api/CourseApi";
import CourseOfferingApi from "../../api/CourseOfferingApi";
import DepartmentApi from "../../api/DepartmentApi";
import EnrollmentApi from "../../api/EnrollmentApi";
import GradeApi from "../../api/GradeApi";
import NoticeApi from "../../api/NoticeApi";
import PostApi from "../../api/PostApi";
import ReviewApi from "../../api/ReviewApi";
import TimeTableApi from "../../api/TimeTableApi";
import userApi from "../../api/UserApi";

import AdminSelectedContext from "./AdminSelectContext";
import { excludeColumns } from "../../api/commonApi";
import GradeItemApi from "../../api/GradeItemApi";
import StudentScoreApi from "../../api/StudentScoreApi";

const AdminComponent = () => {
  // 상태 통합
  const [selectedIds, setSelectedIds] = useState({
    assignment: "none",
    attendance: "none",
    board: "none",
    comment: "none",
    course: "none",
    courseOffering: "none",
    department: "none",
    enrollment: "none",
    grade: "none",
    gradeItem: "none",
    studentScore: "none",
    notice: "none",
    post: "none",
    review: "none",
    timeTable: "none",
    user: "none",
  });

  const setSelectId = (tableKey, id) => {
    setSelectedIds((prev) => ({ ...prev, [tableKey]: id }));
  };

  // ← 여기! AdminComponent 안에 선언
  const tableApis = {
    Assignment: AssignmentApi,
    attendance: AttendanceApi,
    board: BoardApi,
    comment: CommentApi,
    course: CourseApi,
    courseOffering: CourseOfferingApi,
    department: DepartmentApi,
    enrollment: EnrollmentApi,
    grade: GradeApi,
    gradeItem: GradeItemApi,
    studentScore: StudentScoreApi,
    notice: NoticeApi,
    post: PostApi,
    review: ReviewApi,
    timeTable: TimeTableApi,
    user: userApi,
  };

  return (
    <div>
      {/* --소개글-- */}
      <h1 className="text-2xl font-bold mb-6">
        개발 편의를 위한 자동화 페이지
      </h1>
      <h2>
        프론트엔드와 백엔드 통신을 해야할 때, 실제로 해보는 장소입니다. 양식에
        맞게, 데이터를 세팅하면, 연동이 됩니다.
      </h2>

      <AdminSelectedContext.Provider value={{ selectedIds, setSelectId }}>
        {Object.keys(tableApis).map((key) => (
          <AdminLayout
            key={key}
            config={{
              ...tableApis[key].config,
              formData: tableApis[key].config.columns,
              columns: excludeColumns(
                tableApis[key].config.columns,
                tableApis[key].config.excludeList
              ),
            }}
          />
        ))}
      </AdminSelectedContext.Provider>
    </div>
  );
};

export default AdminComponent;
