import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Mainlayouts from '../layouts/Mainlayouts';

const Loading = <div>Loading......</div>;
const CareerSupportCounseling = lazy(() => import("../pages/financeSupport/CareerSupportCounselingPage"));
const MentoringCareerEmployment = lazy(() => import("../pages/financeSupport/MentoringCareerEmploymentPage"));
const MentoringwithProfessors = lazy(() => import("../pages/financeSupport/MentoringwithProfessorsPage"));
const SupportPage = lazy(() => import("../pages/financeSupport/SupportPage"))

const data = {
    "test":0,"test2":5
}

const financeSupportRouter = () => {
  return [
    {
        path:"",
        element:<Suspense fallback={Loading}><Mainlayouts children={<SupportPage />}/></Suspense>
    },
    {
        path:"careersupportcounseling",
        element:<Suspense fallback={Loading}><Mainlayouts children={<CareerSupportCounseling />}/></Suspense>
    },
    {
        path:"mentoringcareeremployment",
        element:<Suspense fallback={Loading}><Mainlayouts children={<MentoringCareerEmployment />}/></Suspense>
    },
    {
        path:"mentoringwithprofessors",
        element:<Suspense fallback={Loading}><Mainlayouts children={<MentoringwithProfessors />}/></Suspense>
    },
  ]
}

export default financeSupportRouter;
