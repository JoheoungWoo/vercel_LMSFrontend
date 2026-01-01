import { lazy, Suspense } from "react";
import Mainlayouts from "../layouts/Mainlayouts";

const ProfessorHomeDashboard = lazy(() =>
  import("../components/professor/ProfessorHomeDashboard")
);

const Academic = lazy(() => import("../pages/professor/Academic"));
const Grade = lazy(() =>
  import("../pages/professor/ProfessorGradeLmsDashboard")
);
const Review = lazy(() => import("../pages/professor/Review"));

export const professorRouter = [
  {
    path: "",
    element: <Mainlayouts children={<ProfessorHomeDashboard />} />,
  },
  {
    path: "academic",
    element: <Mainlayouts children={<Academic />} />,
  },
  {
    path: "grade",
    element: <Mainlayouts children={<Grade />} />,
  },
  {
    path: "review",
    element: <Mainlayouts children={<Review />} />,
  },
  // {
  //   path: "assignment",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Assignment />} />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "course",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Course />} />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "extra",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Extra />} />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "grade",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Grade />} />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "attendance",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Attendance />} />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "support",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Support />} />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "account",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Account />} />
  //     </Suspense>
  //   ),
  // },
];
