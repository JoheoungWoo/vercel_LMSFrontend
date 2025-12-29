import React from "react";
import { useNavigationTest } from "../../hook/useNavigationTest";

const UnSignedLoginComponent = () => {
  const { handleLogin, signUp } = useNavigationTest();
  return (
    <div className="flex items-center gap-4">
      <div
        onClick={handleLogin}
        className="text-gray-200 font-medium hover:text-white no-underline"
      >
        로그인
      </div>
      <span className="text-gray-500/60">|</span>
      <div
        onClick={signUp}
        className="text-gray-200 font-medium hover:text-white no-underline"
      >
        회원가입
      </div>
    </div>
  );
};

export default UnSignedLoginComponent;
