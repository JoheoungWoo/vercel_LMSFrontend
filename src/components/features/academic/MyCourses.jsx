import React, { useState, useEffect } from "react";
import CourseOfferingApi from "../../../api/CourseOfferingApi";
import { useSelector } from "react-redux";
import UserApi from "../../../api/UserApi";

const MyCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [data, setData] = useState([]);

  const [userData, setUserData] = useState([]);

  const user = useSelector((state) => state.loginSlice);

  /* 내 강의 조회 */
  const fetchData = async () => {
    try {
      const res = await CourseOfferingApi.config.funcs.findByKeywordHttp(
        "my",
        null,
        user.email,
        "get"
      );

      // axios / fetch 둘 다 대응
      const payload = res?.data ?? res;
      setData(Array.isArray(payload) ? payload : []);
    } catch (e) {
      console.error(e);
      setData([]);
    }
  };

  /* 교수 이름을 위해서 User 조회 */
  const userFetcchData = async () => {
    try {
      const res = await UserApi.config.funcs.readAll();
      console.log(res);
      // axios / fetch 둘 다 대응
      const payload = res?.data ?? res;
      setUserData(Array.isArray(payload) ? payload : []);
    } catch (e) {
      console.error(e);
      setUserData([]);
    }
  };

  const findProfessorName = (professorId) => {
    const prof = userData.find(
      (u) => u.userId === professorId && u.role === "PROFESSOR"
    );
    return (
      `professorID ${professorId} ${prof?.nickname}` ?? `교수 ID ${professorId}`
    );
  };

  useEffect(() => {
    if (user?.email) {
      fetchData();
      userFetcchData();
    }
  }, [user?.email]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">내 강의</h1>
      </div>

      {/* 강의 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                강의명
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                담당 교수
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                개설 학기
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                상세보기
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
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
                <tr key={course.offeringId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{course.courseName}</td>

                  <td className="px-6 py-4 text-gray-700">
                    {findProfessorName(course.professorId)}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      학기 ID {course.termId}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
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

      {/* 모달 */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b font-bold">강의 정보</div>

            <div className="p-6 space-y-3">
              <div>
                <p className="text-sm text-gray-500">강의명</p>
                <p className="font-semibold">{selectedCourse.courseName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">담당 교수</p>
                <p>교수 ID {selectedCourse.professorId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">개설 학기</p>
                <p>학기 ID {selectedCourse.termId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Course ID</p>
                <p>{selectedCourse.courseId}</p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-full bg-gray-800 text-white py-2 rounded-lg"
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
