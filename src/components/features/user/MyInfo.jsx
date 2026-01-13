import React, { useEffect, useState } from "react";
import UserApi from "../../../api/UserApi";
import { useSelector } from "react-redux";

const MyInfo = () => {
  const user = useSelector((state) => state.loginSlice);
  const role = user?.role || "USER";

  console.log("현재 사용자 ROLE:", role);

  const [findUser, setFindUser] = useState({});

  const loadUser = () => {
    console.log("갱신");
    UserApi.config.funcs.findByKeyword("my", user.email).then((result) => {
      console.log(result);
      setFindUser(result);
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">내 정보</h1>

      {/* 기본 정보 */}
      <section className="rounded-lg border bg-white p-4">
        <h3 className="mb-3 font-semibold text-gray-700">기본 정보</h3>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="이름" value={findUser.nickname} />
          <InfoItem label="역할" value={findUser.role} />
          <InfoItem label="학번" value={findUser.studentNumber} />
          <InfoItem label="소속" value={findUser.deptName} />
        </div>
      </section>

      {/* 계정 정보 */}
      <section className="rounded-lg border bg-white p-4">
        <h3 className="mb-3 font-semibold text-gray-700">계정 정보</h3>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="이메일" value={findUser.email} />
          <InfoItem label="계정 상태" value="활성" />
        </div>
      </section>
    </div>
  );
};

function InfoItem({ label, value }) {
  return (
    <div>
      <span className="text-sm text-gray-500">{label}</span>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

export default MyInfo;
