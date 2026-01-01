import React, { useState, useEffect } from "react";
import CourseOfferingApi from "../../../api/CourseOfferingApi";
import { useSelector } from "react-redux";

const MyCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [data, setData] = useState([]);

  const user = useSelector((state) => state.loginSlice);

  // 🔹 내 강의 조회
  const fetchData = () => {
    CourseOfferingApi.config.funcs
      .findByKeywordHttp("my", null, user.email, "get")
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (user?.email) fetchData();
  }, [user?.email]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">내 강의</h1>
      </div>

      {/* 🔹 강의 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                강의명
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                담당 교수
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                개설 학기
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                상세보기
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  조회된 강의가 없습니다
                </td>
              </tr>
            ) : (
              data.map((course) => (
                <tr
                  key={course.offeringId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {course.courseName}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {course.professorName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {course.year}년 {course.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 모달 */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 rounded-t-xl">
              <h2 className="text-xl font-bold text-white">강의 정보</h2>
            </div>

            {/* 모달 바디 */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">강의명</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedCourse.courseName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">담당 교수</p>
                  <p className="font-medium text-gray-900">
                    {selectedCourse.professorName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Course ID</p>
                  <p className="font-medium text-gray-900">
                    {selectedCourse.courseId}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">개설 학기</p>
                <p className="font-medium text-gray-900">
                  {selectedCourse.year}년 {selectedCourse.semester}
                </p>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-medium transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
