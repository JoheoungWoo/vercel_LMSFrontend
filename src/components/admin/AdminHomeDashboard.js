// src/pages/admin/dashboard/AdminHomeDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminHomeDashboard() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">관리자 대시보드</h1>
          <p className="text-sm text-gray-500 mt-1">
            학사 운영, 사용자·콘텐츠, 시스템·자원을 한 곳에서 관리하세요.
          </p>
        </div>
      </header>

      {/* 상단 요약 카드 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 mb-1">오늘 등록된 강의</p>
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-green-600 mt-1">+3 since yesterday</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 mb-1">대기 중인 민원</p>
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-orange-500 mt-1">3건 긴급</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 mb-1">오늘 접속한 관리자</p>
          <p className="text-2xl font-bold">7</p>
          <p className="text-xs text-gray-400 mt-1">활동 로그 정상</p>
        </div>
      </section>

      {/* 대시보드 진입 카드 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 학사 운영 */}
        <Link
          to="/admin/academic"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">학사 운영 대시보드</h2>
              <span className="text-sm text-blue-500">바로가기 →</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              강의 / 수업, 시간표, 커리큘럼, 학사 일정·행사, 민원 처리 등 학사 전반을 관리합니다.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 강의 개설 · 정원 · 수강 현황</li>
              <li>• 시간표 / 강의실 중복 검증</li>
              <li>• 학사 일정 · 행사 / 세미나</li>
              <li>• 문의 / 민원 처리 현황</li>
            </ul>
          </div>
        </Link>

        {/* 사용자·콘텐츠 */}
        <Link
          to="/admin/user-content"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">사용자 · 콘텐츠 관리</h2>
              <span className="text-sm text-blue-500">바로가기 →</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              공지사항, 학과 소식, 파일, 계정/권한을 한 화면에서 관리합니다.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 공지 / 뉴스 / 내부 공지</li>
              <li>• 파일 업로드 · 다운로드</li>
              <li>• 사용자 등록 / 비활성화</li>
              <li>• 권한 그룹 · 메뉴 접근 설정</li>
            </ul>
          </div>
        </Link>

        {/* 시스템·자원 */}
        <Link
          to="/admin/system"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">시스템 · 자원 운영</h2>
              <span className="text-sm text-blue-500">바로가기 →</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              시스템 설정, 데이터 백업/복원, 강의실·장비·예산 등을 관리합니다.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 시스템 설정 · 버전 관리</li>
              <li>• DB 백업 · 복원 · 로그</li>
              <li>• 강의실 / 회의실 · 장비</li>
              <li>• 예산 집행 · 사용 내역</li>
            </ul>
          </div>
        </Link>
      </section>
    </div>
  );
}
