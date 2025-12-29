import React from "react";
import { useNavigate } from "react-router-dom";
import { useNavigationTest } from "../../hook/useNavigationTest";

const SignedLoginComponent = () => {
  const { handleLogout } = useNavigationTest();

  return (
    <div>
      <div className="flex gap-4">
        <div
          onClick={handleLogout}
          className="text-gray-200 font-medium hover:text-white no-underline"
        >
          로그아웃
        </div>
        {/* <div
          to="/user"
          className="text-gray-200 font-medium hover:text-white no-underline"
        >
          마이페이지
        </div> *중요* 나중에 쓸 예정이니 내바둠 */}
      </div>
    </div>
  );
};

export default SignedLoginComponent;
