// src/router/communityRouter.js
import { lazy, Suspense } from "react";
import Mainlayouts from "../layouts/Mainlayouts";

const Loading = <div>Loading......</div>;

const Club = lazy(() => import("../pages/community/ClubPage"));
const Department = lazy(() => import("../pages/community/DepartmentPage"));
const Free = lazy(() => import("../pages/community/FreePage"));
const QaA = lazy(() => import("../pages/community/QaAPage"));
const DataSharing = lazy(() => import("../components/community/DataSharingPageComponent"));

const Entrie = lazy(() => import("../pages/community/EntriePage"))
const CommunityPage = lazy(() => import("../pages/community/CommunityPage"))

const communityRouter = () => {
  return [
      { path: "", element: <Mainlayouts children={<Entrie />} /> },
      { path: "community", element: <Mainlayouts children={<CommunityPage />} /> },
      { path: "club", element: <Mainlayouts children={<Club />} /> },
      { path: "department", element: <Mainlayouts children={<Department />} /> },
      { path: "free", element: <Mainlayouts children={<Free />} /> },
      { path: "qanda", element: <Mainlayouts children={<QaA />} /> },
      { path: "dataSharing", element: <Mainlayouts children={<DataSharing />} /> },// 소문자 경로 추천
]
}

export default communityRouter;
