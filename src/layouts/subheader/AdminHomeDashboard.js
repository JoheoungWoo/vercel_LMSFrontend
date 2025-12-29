// src/pages/adminmanagement/AdminHomeDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminHomeDashboard() {
  // 대시보드에 뿌릴 더미 데이터들 (나중에 API 연동하면 여기만 교체)
  const pendingSyllabus = [
    { id: 1, course: "웹 프로그래밍", professor: "김교수", submittedAt: "2025-03-01" },
    { id: 2, course: "데이터베이스", professor: "이교수", submittedAt: "2025-03-02" },
  ];

  const recentNotices = [
    { id: 1, title: "2025-1학기 수강신청 안내", category: "학사공지" },
    { id: 2, title: "장학금 신청 일정 공지", category: "장학" },
  ];

  const systemAlerts = [
    { id: 1, message: "DB 일일 백업 완료", time: "02:30" },
    { id: 2, message: "관리자A 비밀번호 변경", time: "09:12" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">관리자 기본 대시보드</h1>
          <p className="text-sm text-gray-500 mt-1">
            학사 운영, 사용자·콘텐츠, 시스템·자원을 한 화면에서 요약해서 보여줍니다.
          </p>
        </div>
        {/* 필요하면 여기에 role / 이름 / 오늘 날짜 같은 정보 추가해도 됨 */}
      </header>

      {/* 상단 KPI 카드 4개 */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 mb-1">이번 학기 개설 강의</p>
          <p className="text-2xl font-bold">132</p>
          <p className="text-xs text-green-600 mt-1">+3 since yesterday</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 mb-1">승인 대기 강의계획서</p>
          <p className="text-2xl font-bold">{pendingSyllabus.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 mb-1">게시 중인 공지</p>
          <p className="text-2xl font-bold">18</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 mb-1">오늘 시스템 알림</p>
          <p className="text-2xl font-bold">{systemAlerts.length}</p>
        </div>
      </section>

      {/* 3개 영역으로 가는 빠른 진입 카드 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 학사 운영 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">학사 운영</h2>
              {/* 나중에 학사 대시보드 라우트 만들면 Link로 변경 */}
              {/* <Link to="/admin/academic" className="text-sm text-blue-500">바로가기 →</Link> */}
              <span className="text-xs text-gray-400">강의·수업 / 일정 / 민원</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              강의 개설, 시간표, 수강 정원, 학사 일정, 행사, 민원 처리 등을 관리합니다.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 강의 개설 / 수정 / 삭제</li>
              <li>• 강의계획서 제출 현황 및 승인</li>
              <li>• 시간표 · 강의실 배정 / 중복 검증</li>
              <li>• 학사 일정 / 행사 / 민원 처리 현황</li>
            </ul>
          </div>
        </div>

        {/* 사용자·콘텐츠 관리 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">사용자 · 콘텐츠 관리</h2>
              {/* <Link to="/admin/user-content" className="text-sm text-blue-500">바로가기 →</Link> */}
              <span className="text-xs text-gray-400">공지 / 계정 / 권한 / 파일</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              공지사항, 학과 소식, 파일 업로드, 사용자 계정과 권한을 관리합니다.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 공지 등록 / 수정 / 삭제 및 게시기간</li>
              <li>• 학과 소식 / 뉴스 / 내부 공지</li>
              <li>• 사용자 등록 / 비활성화 / 활동 로그</li>
              <li>• 권한 그룹 · 메뉴 접근 설정 / 파일 관리</li>
            </ul>
          </div>
        </div>

        {/* 시스템·자원 운영 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">시스템 · 자원 운영</h2>
              {/* <Link to="/admin/system" className="text-sm text-blue-500">바로가기 →</Link> */}
              <span className="text-xs text-gray-400">시스템 / 자원 / 예산</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              시스템 설정, 백업/복원, 강의실·장비, 예산 상태를 모니터링하고 관리합니다.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• 시스템 기본 설정 · 버전 / 업데이트</li>
              <li>• DB 백업 / 복원 · 로그인 / 활동 로그</li>
              <li>• 강의실 / 회의실 / 장비 / 비품 관리</li>
              <li>• 예산 항목·집행 현황 모니터링</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 하단: 오늘 바로 확인해야 할 리스트들 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 승인 대기 강의계획서 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">승인 대기 강의계획서</h2>
            <button className="text-xs text-blue-500">전체 보기</button>
          </div>
          <ul className="divide-y text-sm">
            {pendingSyllabus.map((item) => (
              <li key={item.id} className="py-2 flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.course}</p>
                  <p className="text-xs text-gray-500">
                    {item.professor} · 제출일 {item.submittedAt}
                  </p>
                </div>
                <button className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-50">
                  검토
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 최근 공지 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">최근 등록된 공지</h2>
            <button className="text-xs text-blue-500">공지 관리</button>
          </div>
          <ul className="divide-y text-sm">
            {recentNotices.map((n) => (
              <li key={n.id} className="py-2">
                <p className="font-medium truncate">{n.title}</p>
                <p className="text-xs text-gray-500">{n.category}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 시스템 알림 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">최근 시스템 알림</h2>
            <button className="text-xs text-blue-500">로그 보기</button>
          </div>
          <ul className="divide-y text-sm">
            {systemAlerts.map((a) => (
              <li key={a.id} className="py-2">
                <p className="font-medium truncate">{a.message}</p>
                <p className="text-xs text-gray-500">{a.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
