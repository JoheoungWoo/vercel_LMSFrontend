import { lazy, Suspense } from "react";
import Mainlayouts from "../layouts/Mainlayouts";

const StudentHomeDashboard = lazy(() =>
  import("../components/student/StudentHomeDashboard")
);

const Academic = lazy(() => import("../pages/student/Academic"));
const Community = lazy(() => import("../pages/student/Community"));
const Finance = lazy(() => import("../pages/student/Finance"));
const Grade = lazy(() => import("../pages/student/Grade"));
const User = lazy(() => import("../pages/student/User"));

export const studentRouter = [
  {
    path: "",
    element: <Mainlayouts children={<StudentHomeDashboard />} />,
  },
  {
    path: "academic",
    element: <Mainlayouts children={<Academic />} />,
  },
  {
    path: "community",
    element: <Mainlayouts children={<Community />} />,
  },
  {
    path: "finance",
    element: <Mainlayouts children={<Finance />} />,
  },
  {
    path: "grade",
    element: <Mainlayouts children={<Grade />} />,
  },
  {
    path: "user",
    element: <Mainlayouts children={<User />} />,
  },
  // {
  //   path: "academic",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Academic />} />
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
  //   path: "support",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Support />} />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "community",
  //   element: (
  //     <Suspense>
  //       <Mainlayouts children={<Community />} />
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
