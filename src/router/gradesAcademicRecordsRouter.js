import { lazy, Suspense } from "react";
import Mainlayouts from "../layouts/Mainlayouts";
import GradePage from "../pages/gradesAcademicRecords/GradePage";
import CheckPage from "../pages/gradesAcademicRecords/CheckPage";

const Loading = <div>Loading......</div>;


const GradeReportPage = lazy(() =>
  import("../pages/gradesAcademicRecords/GradeReportPage")
);
const Grade = lazy(() =>
  import("../pages/gradesAcademicRecords/GradeReportPage")
);
const gradesAcademicRecords = lazy(() => import("../pages/gradesAcademicRecords/gradesAcademicRecords"));
const check = lazy(() => import("../pages/gradesAcademicRecords/CheckPage"));
const gradesAcademicRecordsRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Mainlayouts children={<gradesAcademicRecordss/>} />
        </Suspense>
      ),
    },
    {
      path: "grade",
      element: (
        <Suspense fallback={Loading}>
          <Mainlayouts children={<Grade />} />
        </Suspense>
      ),
    },
    {
      path: "check",
      element: (
        <Suspense fallback={Loading}>
          <Mainlayouts children={<CheckPage />} />
        </Suspense>
      ),
    },
    {
      path: "report",
      element: (
        <Suspense fallback={Loading}>
          <Mainlayouts children={<GradeReportPage />} />
        </Suspense>
      ),
    },
  ];
};

export default gradesAcademicRecordsRouter;
