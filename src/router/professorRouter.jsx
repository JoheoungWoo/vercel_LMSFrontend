import { lazy, Suspense } from "react";
import Mainlayouts from "../layouts/Mainlayouts";

const ProfessorHomeDashboard = lazy(() =>
  import("../pages/professor/ProfessorGradeLmsDashboard")
);

const Academic = lazy(() => import("../pages/professor/Academic"));
const Grade = lazy(() => import("../pages/professor/ProfessorGradeLms"));
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
];
