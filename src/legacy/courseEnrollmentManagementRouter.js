import { lazy, Suspense } from "react";
import Mainlayouts from "../layouts/Mainlayouts";

const Loading = <div>Loading......</div>;

/* ------------------ Student ------------------ */
const ClassOperation = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/ClassOperationPage")
);
const CourseEvaluation = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/CourseEvaluationPage")
);
const CourseManagement = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/CourseManagementPage")
);
const CoursesStudent = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/CoursesPage")
);
const CreditManagement = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/CreditManagementPage")
);
const Report = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/ReportPage")
);
const ReportCheck = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/ReportCheckPage")
);
const Timetable = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/TimetablePage")
);

/* ------------------ Professor ------------------ */
const CoursePageProfessor = lazy(() =>
  import("../pages/courseenrollmentmanagement/professor/CoursePageProfessor")
);
const Attendance = lazy(() =>
  import("../pages/courseenrollmentmanagement/student/AttendancePage")
);
const CancellationAnnouncement = lazy(() =>
  import(
    "../pages/courseenrollmentmanagement/professor/CancellationAnnouncementPage"
  )
);
const Classmanagement = lazy(() =>
  import("../pages/courseenrollmentmanagement/professor/ClassmanagementPage")
);
const ExamNotice = lazy(() =>
  import("../pages/courseenrollmentmanagement/professor/ExamNoticePage")
);
const ExtracurricularApplicationStatus = lazy(() =>
  import(
    "../pages/courseenrollmentmanagement/professor/ExtracurricularApplicationStatusPage"
  )
);
const LectureManagement = lazy(() =>
  import("../pages/courseenrollmentmanagement/professor/LectureManagementPage")
);
const StudentEvaluation = lazy(() =>
  import("../pages/courseenrollmentmanagement/professor/StudentEvaluationPage")
);
const CoursesProfessor = lazy(() =>
  import("../pages/courseenrollmentmanagement/professor/CoursesPage")
);

/* ------------------ Admin ------------------ */
// const AdminCourses = lazy(() =>
//   import("../pages/courseenrollmentmanagement/admin/CoursesPage")
// );
// const Lectures = lazy(() =>
//   import("../pages/courseenrollmentmanagement/admin/LecturesPage")
// );
// const Curriculum = lazy(() =>
//   import("../pages/courseenrollmentmanagement/admin/CurriculumPage")
// );
// const Enrollment = lazy(() =>
//   import("../pages/courseenrollmentmanagement/admin/EnrollmentPage")
// );
// const Schedules = lazy(() =>
//   import("../pages/courseenrollmentmanagement/admin/SchedulesPage")
// );

const courseEnrollmentManagementRouter = () => [
  /* ---------- Student ---------- */
  {
    path: "student/classoperation", // 강의 관리
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <ClassOperation />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "student/timetable", // 시간표
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <Timetable />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "student/attendance", // 출결
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <Attendance />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "student/courseevaluation", // 강의 평가
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <CourseEvaluation />
        </Mainlayouts>
      </Suspense>
    ),
  },

  // (학생 나머지 기능 유지)
  {
    path: "student/coursemanagement",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <CourseManagement />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "student/courses",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <CoursesStudent />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "student/report",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <Report />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "student/reportcheck",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <ReportCheck />
        </Mainlayouts>
      </Suspense>
    ),
  },

  /* ---------- Professor ---------- */
  {
    path: "professor/courseprofessor",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <CoursePageProfessor />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "professor/attendance",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <Attendance />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "professor/cancellationannouncement",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <CancellationAnnouncement />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "professor/classmanagement",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <Classmanagement />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "professor/examnotice",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <ExamNotice />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "professor/extracurricularapplicationstatus",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <ExtracurricularApplicationStatus />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "professor/lecturemanagement",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <LectureManagement />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "professor/studentevaluation",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <StudentEvaluation />
        </Mainlayouts>
      </Suspense>
    ),
  },
  {
    path: "professor/courses",
    element: (
      <Suspense fallback={Loading}>
        <Mainlayouts>
          <CoursesProfessor />
        </Mainlayouts>
      </Suspense>
    ),
  },
];

export default courseEnrollmentManagementRouter;
