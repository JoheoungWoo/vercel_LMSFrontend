// ProfessorCourseClassSummary.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import EnrollmentApi from "../../api/EnrollmentApi";

const ProfessorCourseClassSummary = ({ selectedOfferingId }) => {
  const user = useSelector((state) => state.loginSlice);
  const userEmail = user?.email || "professor@aaa.com";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedOfferingId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const enrollmentData =
          await EnrollmentApi.config.funcs.findByKeywordHttp(
            "my",
            null,
            userEmail,
            "get"
          );

        let selectedStudents = [];

        Object.entries(enrollmentData).forEach(([courseKey, students]) => {
          const offeringIdMatch = courseKey.match(/offeringId=(\d+)/);
          if (
            offeringIdMatch &&
            parseInt(offeringIdMatch[1]) === selectedOfferingId
          ) {
            selectedStudents = students;
          }
        });

        setStudents(selectedStudents);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail, selectedOfferingId]);

  const recentStudents = useMemo(() => {
    return [...students].slice(0, 5);
  }, [students]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
        <div className="h-10 bg-slate-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!selectedOfferingId) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <p className="text-sm text-slate-400 text-center">
          강의를 선택해주세요
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-sm border border-emerald-200 p-6 h-full">
      {/* 수강생 수 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700 mb-1">
            👥 수강생
          </p>
          <p className="text-3xl font-bold text-emerald-900">
            {students.length}명
          </p>
        </div>
        <div className="w-14 h-14 bg-emerald-200/50 rounded-full flex items-center justify-center">
          <span className="text-2xl">👥</span>
        </div>
      </div>

      {/* 최근 수강생 5명 */}
      <div className="bg-white rounded-xl border border-emerald-200 p-4">
        <p className="text-sm font-semibold text-slate-700 mb-2">최근 수강생</p>

        {recentStudents.length === 0 ? (
          <p className="text-sm text-slate-400 text-center">
            수강생이 없습니다
          </p>
        ) : (
          <ul className="space-y-2">
            {recentStudents.map((student, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm border-b last:border-b-0 pb-1"
              >
                <span className="text-slate-700 font-medium">
                  {student.nickname || student.name || "이름 없음"}
                </span>
                <span className="text-xs text-slate-400">
                  {student.email || student.studentEmail || ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfessorCourseClassSummary;
