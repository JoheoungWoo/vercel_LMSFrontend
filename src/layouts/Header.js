import React from "react";
import { useNavigationTest } from "../hook/useNavigationTest";
import { useSelector } from "react-redux";
import SignedLoginComponent from "../components/auth/SignedLoginComponent";
import UnSignedLoginComponent from "../components/auth/UnSignedLoginComponent";
import Img1 from "../images/1.png";
import { Link } from "react-router-dom";

const Header = () => {
  const { Home } = useNavigationTest();
  const loginState = useSelector((state) => state.loginSlice);

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <header className="flex justify-between items-center px-8 py-4 bg-sky-500 text-white border-b border-gray-800 h-[68px]">
        <div className="text-2xl font-bold">
          <div>
            <img src={Img1} alt="1.png" className="object-contain h-12"></img>
          </div>
        </div>
        <div>
          <Link to={"http://localhost:3000"}>그린 대학교 학사 관리 시스템</Link>
        </div>
        <div>{loginState.nickname}</div>
        <div>
          {/* loginState에 email 값이 있으면 로그인 된 상태, 없으면 로그아웃 상태 */}
          {loginState.email ? (
            <SignedLoginComponent />
          ) : (
            <UnSignedLoginComponent />
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
