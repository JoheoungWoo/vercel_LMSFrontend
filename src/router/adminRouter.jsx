import React, { lazy, Suspense } from "react";
import Mainlayouts from "../layouts/Mainlayouts";

const Academic = lazy(() => import("../pages/admin/Academic"));
// const Finance = lazy(() => import("../pages/admin/Finance"));
const System = lazy(() => import("../pages/admin/System"));
const User = lazy(() => import("../pages/admin/User"));

const AdminHomeDashboard = lazy(() =>
  import("../layouts/subheader/AdminHomeDashboard")
);

export const adminRouter = [
  {
    path: "",
    element: <Mainlayouts children={<AdminHomeDashboard />} />,
  },
  {
    path: "academic",
    element: <Mainlayouts children={<Academic />} />,
  },
  // {
  //   path: "finance",
  //   element: <Mainlayouts children={<Finance />} />,
  // },
  {
    path: "system",
    element: <Mainlayouts children={<System />} />,
  },
  {
    path: "user",
    element: <Mainlayouts children={<User />} />,
  },

  // {
  //   path: "creditmanagement",
  //   element: (
  //     <Suspense fallback={Loading}>
  //       <Mainlayouts children={<CreditManagement />} />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "degreecertificates",
  //   element: (
  //     <Suspense fallback={Loading}>
  //       <Mainlayouts children={<DegreeCertificates />} />
  //     </Suspense>
  //   ),
  // },
];
