import React from "react";
import { useSelector } from "react-redux";
import SignedLoginComponent from "../components/auth/SignedLoginComponent";
import UnSignedLoginComponent from "../components/auth/UnSignedLoginComponent";
import Img1 from "../images/1.png";
import { Link } from "react-router-dom";

const Header = () => {
  const loginState = useSelector((state) => state.loginSlice);

  return (
    <div className="sticky top-0 z-50 w-full bg-sky-500 shadow-sm">
      <header
        className="
          grid grid-cols-3 items-center
          px-8 h-[68px] text-white
        "
      >
        {/* 🔹 LEFT : 로고 */}
        <div className="flex items-center">
          <Link to="https://www.greenunivercity.store">
            <img src={Img1} alt="로고" className="h-10 object-contain" />
          </Link>
        </div>

        {/* 🔹 CENTER : 타이틀 (진짜 중앙) */}
        <div className="text-center font-semibold text-lg tracking-wide">
          <Link to="https://vercel-lms-frontend.vercel.app">
            그린 대학교 학사 관리 시스템
          </Link>
        </div>

        {/* 🔹 RIGHT : 로그인 / 회원정보 */}
        <div className="flex items-center justify-end gap-4 text-sm">
          {loginState.nickname && (
            <span className="opacity-90">{loginState.nickname}</span>
          )}

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
