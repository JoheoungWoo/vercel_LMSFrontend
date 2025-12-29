import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import BasicLayout from "../layouts/Basiclayout";

const Loading = <div>Loading......</div>;
const Donate = lazy(() => import("../pages/extraServices/DonatePage"));

const extraServicesRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="campusGuidePage" />,
    },
    {
      path: "donate",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<Donate />} />
        </Suspense>
      ),
    },
  ];
};

export default extraServicesRouter;
