import { lazy } from "react";

import Mainlayouts from "../layouts/Mainlayouts";
import AdminHomeDashboard from "../components/admin/AdminHomeDashboard";

// 파일명이 Notice.jsx 라고 가정
// const Notice = lazy(() => import("../pages/adminmanagement/Notice"));
// 파일명이 UserRole.jsx 라고 가정
// const UserRole = lazy(() => import("../pages/adminmanagement/UserRole"));
// 파일명이 CourseClass.jsx 라고 가정
// const CourseClass = lazy(() => import("../pages/adminmanagement/CourseClass"));
// 아래도 전부 파일명/폴더명과 정확히 맞추기
// const Events = lazy(() => import("../pages/adminmanagement/Events"));
// const Inquiry = lazy(() => import("../pages/adminmanagement/Inquiry"));
// const Support = lazy(() => import("../pages/adminmanagement/Support"));
// 오타 수정: Inter**n**alCommunity 라고 가정
// const InternalCommunity = lazy(() =>
//   import("../pages/adminmanagement/InternalCommunity")
// );

export const adminmanagementRouter = [
  {
    path: "",
    element: <Mainlayouts children={<AdminHomeDashboard />} />,
  },

  // {
  //   path: "notice",
  //   element: <Mainlayouts children={<Notice />} />,
  // },
  // {
  //   path: "userrole",
  //   element: <Mainlayouts children={<UserRole />} />,
  // },
  // {
  //   path: "courseclass",
  //   element: <Mainlayouts children={<CourseClass />} />,
  // },
  // {
  //   path: "events",
  //   element: <Mainlayouts children={<Events />} />,
  // },
  // {
  //   path: "inquiry",
  //   element: <Mainlayouts children={<Inquiry />} />,
  // },
  // {
  //   path: "support",
  //   element: <Mainlayouts children={<Support />} />,
  // },
  // {
  //   path: "internalcommunity",
  //   element: <Mainlayouts children={<InternalCommunity />} />,
  // },
];
