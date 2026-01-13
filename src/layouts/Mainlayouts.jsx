import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../layouts/Footer";
import Header from "./Header";
import { TfiMenu } from "react-icons/tfi";
import { menus } from "../layouts/subheader/menuconfig";

// 대시보드들
import UserDashboard from "./subheader/UserDashboard";
import ProfessorHomeDashboard from "./subheader/ProfessorHomeDashboard";
import StudentHomeDashboard from "./subheader/StudentHomeDashboard";
import AdminHomeDashboard from "./subheader/AdminHomeDashboard";

import { useSelector } from "react-redux";

export default function Mainlayouts({ children }) {
  const location = useLocation();

  const user = useSelector((state) => state.loginSlice);
  const role = user?.role || "USER";

  console.log("현재 사용자 ROLE:", role);

  const DASHBOARD_BY_ROLE = {
    ADMIN: AdminHomeDashboard,
    PROFESSOR: ProfessorHomeDashboard,
    STUDENT: StudentHomeDashboard,
    USER: UserDashboard,
  };

  const DashboardComponent = DASHBOARD_BY_ROLE[role] || UserDashboard;
  const menuList = menus[role] || [];

  // USER + children 있을 때 = 로그인/회원가입 오버레이 상태
  const hasUserOverlay = role === "USER" && !!children;

  return (
    <div className="h-screen flex flex-col">
      {/* 헤더 */}
      <div className="h-20 shrink-0 bg-white">
        <Header />
      </div>

      {/* USER 화면 (메인 이미지 + 오버레이 폼) */}
      {role === "USER" && (
        <main className="relative flex-1 bg-white overflow-hidden">
          <div className="flex items-center justify-center bg-slate-50">
            <UserDashboard/>
          </div>
          {children && (
            <div className="absolute inset-0 flex items-center justify-center">
              {children}
            </div>
          )}
        </main>
      )}

      {/* 관리자 / 교수 / 학생 레이아웃 */}
      {role !== "USER" && (
        <div className="flex flex-1 overflow-y-auto bg-white text-black">
          {/* 왼쪽 메뉴바 */}
          <Navbar subHeader={menuList} />

          {/* 오른쪽 컨텐츠 영역 */}
          <div className="flex-1 flex flex-col items-center justify-start bg-white">
            <div className="w-[80%] ml-[15%] rounded-xl border border-gray-200 bg-white my-4 h-[100%]">
              <div className="p-4">
                {location.pathname === "/" && <DashboardComponent />}
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
