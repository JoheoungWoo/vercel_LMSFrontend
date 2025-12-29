// src/pages/home/HomeByRole.jsx
import React from "react";

import AdminHomeDashboard from "../adminmanagement/AdminHomeDashboard";
import ProfessorHomeDashboard from "../professor/ProfessorHomeDashboard";
import StudentHomeDashboard from "../student/StudentHomeDashboard";

const HOME_BY_ROLE = {
  ADMIN: AdminHomeDashboard,
  PROFESSOR: ProfessorHomeDashboard,
  STUDENT: StudentHomeDashboard,
};

function DefaultHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">기본 홈</h1>
      <p className="mt-2 text-gray-600">
        역할 정보가 없을 때 보이는 기본 페이지입니다.
      </p>
    </div>
  );
}

export default function HomeByRole({ role }) {
  const HomeComponent = HOME_BY_ROLE[role] || DefaultHome;
  return <HomeComponent />;
}
