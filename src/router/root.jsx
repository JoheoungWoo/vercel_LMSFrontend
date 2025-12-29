import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import gradesAcademicRecordsRouter from "./gradesAcademicRecordsRouter";
// import communityRouter from "./communityRouter";
import accountRouter from "./accountRouter";

// 통합된 단일 Router

import { adminRouter } from "./adminRouter";
import { studentRouter } from "./studentRouter";
import { professorRouter } from "./professorRouter";

const Mainlayouts = lazy(() => import("../layouts/Mainlayouts"));

const root = createBrowserRouter([
  {
    path: "",
    element: <Mainlayouts></Mainlayouts>,
  },
  {
    path: "gradesacademicrecords",
    children: gradesAcademicRecordsRouter(),
  },
  // {
  //   path: "community",
  //   children: communityRouter(),
  // },
  {
    path: "account",
    children: accountRouter(),
  },
  {
    path: "admin",
    children: adminRouter,
  },
  {
    path: "student",
    children: studentRouter,
  },
  {
    path: "professor",
    children: professorRouter,
  },
]);

export default root;
