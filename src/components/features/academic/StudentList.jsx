import React, { useEffect, useState } from "react";
import EnrollmentApi from "../../../api/EnrollmentApi";
import { useSelector } from "react-redux";

const StudentList = () => {
  const user = useSelector((state) => state.loginSlice);
  const isAdmin = user?.role === "ADMIN";

  const [coursesWithStudents, setCoursesWithStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchData = () => {
    EnrollmentApi.config.funcs
      .findByKeywordHttp("my", null, user.email, "get")
      .then((result) => {
        console.log("원본 데이터:", result);

        // Map 객체를 배열로 변환
        const converted = Object.entries(result).map(
          ([courseKey, students]) => {
            const offeringIdMatch = courseKey.match(/offeringId=(\d+)/);
            const courseNameMatch = courseKey.match(/courseName=([^,)]+)/);
            const yearMatch = courseKey.match(/year=(\d+)/);
            const semesterMatch = courseKey.match(/semester=([^,)]+)/);
            const professorNameMatch = courseKey.match(
              /professorName=([^,)]+)/
            );

            return {
              course: {
                offeringId: offeringIdMatch
                  ? parseInt(offeringIdMatch[1])
                  : null,
                courseName: courseNameMatch ? courseNameMatch[1] : "Unknown",
                year: yearMatch ? parseInt(yearMatch[1]) : null,
                semester: semesterMatch ? semesterMatch[1] : "Unknown",
                professorName: professorNameMatch
                  ? professorNameMatch[1]
                  : "Unknown",
              },
              students: students,
            };
          }
        );

        console.log("변환된 데이터:", converted);
        setCoursesWithStudents(converted);
      })
      .catch(console.error);
  };

  const rateColor = (rate) => {
    if (rate >= 90) return "text-emerald-600";
    if (rate >= 70) return "text-amber-600";
    return "text-rose-600";
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8 text-[0.85rem]">
      {coursesWithStudents.length === 0 && (
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
          수강 학생 데이터가 없습니다.
        </div>
      )}

      {coursesWithStudents.map(({ course, students }) => (
        <div key={course.offeringId} className="space-y-2">
          {/* 강의 정보 */}
          <div className="text-slate-700 font-semibold">
            {course.courseName} ({course.semester} {course.year}) - 담당:{" "}
            {course.professorName}
          </div>

          {/* 학생 테이블 */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                  <th className="px-2 py-2">학번</th>
                  <th className="px-2 py-2">이름</th>
                  <th className="px-2 py-2">전공</th>
                  <th className="px-2 py-2">이메일</th>
                  <th className="px-2 py-2 text-center">출석률</th>
                  <th className="px-2 py-2 text-center">과제</th>
                  <th className="px-2 py-2 text-center">상태</th>
                  <th className="px-2 py-2 text-center">관리</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((s, idx) => (
                    <tr
                      key={s.userId}
                      className={`border-b border-slate-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-2 py-2 align-middle text-slate-700">
                        {s.studentNumber}
                      </td>
                      <td className="px-2 py-2 align-middle font-medium text-slate-800">
                        {s.nickname}
                      </td>
                      <td className="px-2 py-2 align-middle text-slate-700">
                        {s.deptName}
                      </td>
                      <td className="px-2 py-2 align-middle text-slate-600">
                        {s.email}
                      </td>
                      <td
                        className={`px-2 py-2 text-center align-middle font-medium ${rateColor(
                          s.attendanceRate ?? 0
                        )}`}
                      >
                        {s.attendanceRate ?? 0}%
                      </td>
                      <td
                        className={`px-2 py-2 text-center align-middle font-medium ${rateColor(
                          s.assignmentRate ?? 0
                        )}`}
                      >
                        {s.assignmentRate ?? 0}%
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span
                          className={[
                            "rounded-full px-2 py-0.5 text-[0.7rem]",
                            s.status === "재학"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-200 text-slate-600",
                          ].join(" ")}
                        >
                          {s.status || "재학"}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <button
                          onClick={() => setSelectedStudent({ ...s, course })}
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50"
                        >
                          상세
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-2 py-4 text-center text-slate-400"
                    >
                      수강 학생이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <p className="text-[0.75rem] text-slate-400">
        ※ "상세" 버튼 클릭 시 학생별 출석 기록, 과제 제출 내역, 성적 관리
        화면으로 확장하는 구조를 권장합니다.
      </p>

      {/* 🔹 학생 상세 정보 모달 */}
      {selectedStudent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 rounded-t-xl">
              <h2 className="text-xl font-bold text-white">학생 상세 정보</h2>
              <p className="text-blue-100 text-sm mt-1">
                {selectedStudent.course.courseName} (
                {selectedStudent.course.semester} {selectedStudent.course.year})
              </p>
            </div>

            {/* 모달 바디 */}
            <div className="p-6 space-y-5">
              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">학번</p>
                  <p className="font-semibold text-gray-900">
                    {selectedStudent.studentNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">이름</p>
                  <p className="font-semibold text-gray-900">
                    {selectedStudent.nickname}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">전공</p>
                  <p className="font-semibold text-gray-900">
                    {selectedStudent.deptName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">이메일</p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {selectedStudent.email}
                  </p>
                </div>
              </div>

              {/* 구분선 */}
              <hr className="border-gray-200" />

              {/* 수강 현황 */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">수강 현황</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-emerald-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-emerald-700 mb-1">출석률</p>
                    <p
                      className={`text-2xl font-bold ${rateColor(
                        selectedStudent.attendanceRate ?? 0
                      )}`}
                    >
                      {selectedStudent.attendanceRate ?? 0}%
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-700 mb-1">과제 제출률</p>
                    <p
                      className={`text-2xl font-bold ${rateColor(
                        selectedStudent.assignmentRate ?? 0
                      )}`}
                    >
                      {selectedStudent.assignmentRate ?? 0}%
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-purple-700 mb-1">학적 상태</p>
                    <p className="text-lg font-bold text-purple-900">
                      {selectedStudent.status || "재학"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 추가 정보 */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">기타 정보</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">사용자 ID:</span>
                    <span className="font-medium text-gray-900">
                      {selectedStudent.userId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">역할:</span>
                    <span className="font-medium text-gray-900">
                      {selectedStudent.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">계정 상태:</span>
                    <span
                      className={`font-medium ${
                        selectedStudent.delete
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {selectedStudent.delete ? "비활성" : "활성"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
              >
                닫기
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                성적 관리
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
