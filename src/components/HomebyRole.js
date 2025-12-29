// src/pages/home/HomeByRole.jsx
import React from "react";
import AdminHomeDashboard from "../adminmanagement/AdminHomeDashboard";
import ProfessorHome from "./ProfessorHome";
import StudentHome from "./StudentHome";
import UserDashboard from "../layouts/subheader/UserDashboard";

const HOME_BY_ROLE = {
  ADMIN: AdminHomeDashboard,
  PROFESSOR: ProfessorHome,
  STUDENT: StudentHome,
};

function DefaultHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">기본 홈</h1>
      <p className="mt-2 text-gray-600">역할 정보가 없을 때 보이는 기본 페이지입니다.</p>
    </div>
  );
}

export default function HomeByRole({ role }) {
  const HomeComponent = HOME_BY_ROLE[role] || UserDashboard;
  return <HomeComponent />;
}
