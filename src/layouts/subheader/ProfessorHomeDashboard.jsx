// src/pages/professor/ProfessorHomeDashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import ProfessorCourseClassSummary from "../../components/professor/ProfessorCourseClassSummary";
import ProfessorGradeLmsSummary from "../../components/professor/ProfessorGradeLmsSummary";
import ProfessorReviewSummary from "../../components/professor/ProfessorReviewSummary";
import { API_SERVER_HOST } from "../../api/commonApi";

import axios from "axios";
import { useSelector } from "react-redux";

export default function ProfessorHomeDashboard() {
  const loadLecture = useRef([]);
  const [selectedOfferingId, setSelectedOfferingId] = useState(0);
  const [loadingOfferings, setLoadingOfferings] = useState(false);

  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState?.email || "professor@aaa.com";

  useEffect(() => {
    if (!userEmail) return;

    const fetchOfferings = async () => {
      setLoadingOfferings(true);
      try {
        const res = await axios.get(
          `${API_SERVER_HOST}/api/offering/professor/${userEmail}`
        );

        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          loadLecture.current = data;
          setSelectedOfferingId(data[0].offeringId);
        } else {
          loadLecture.current = [];
          setSelectedOfferingId(0);
        }
      } catch (error) {
        console.error("강의 목록 조회 실패:", error);
      } finally {
        setLoadingOfferings(false);
      }
    };
    fetchOfferings();
  }, [userEmail]);

  const handleCourseChange = (e) => {
    setSelectedOfferingId(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
      {/* 헤더 */}
      <header className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">👨‍🏫</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              교수 대시보드
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              담당 강의 운영 현황을 한눈에 확인하세요
            </p>
          </div>
        </div>

        {/* 강의 선택 드롭다운 */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-xs font-bold text-slate-500 ml-1">
            관리할 강의 선택
          </label>
          <div className="relative">
            <select
              value={selectedOfferingId}
              onChange={handleCourseChange}
              className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loadingOfferings}
            >
              {loadingOfferings ? (
                <option value={0}>강의 목록 로딩 중...</option>
              ) : loadLecture.current.length > 0 ? (
                loadLecture.current.map((offering) => (
                  <option key={offering.offeringId} value={offering.offeringId}>
                    [{offering.year}-{offering.semester}] {offering.courseName}
                  </option>
                ))
              ) : (
                <option value={0}>담당 강의가 없습니다.</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* 3열 그리드 - 균등한 크기 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <ProfessorCourseClassSummary selectedOfferingId={selectedOfferingId} />
        <ProfessorGradeLmsSummary selectedOfferingId={selectedOfferingId} />
        <ProfessorReviewSummary selectedOfferingId={selectedOfferingId} />
      </section>
    </div>
  );
}
