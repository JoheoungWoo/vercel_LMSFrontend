import React, { useEffect, useState } from "react";
import CourseApi from "../../../api/CourseApi";
import { useSelector } from "react-redux";
import DepartmentApi from "../../../api/DepartmentApi";

const CourseManage = () => {
  const [departments, setDepartments] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    courseId: null,
    courseName: "",
    description: "",
    credits: 3,
    departmentId: null,
    deptName: "",
  });

  const user = useSelector((state) => state.loginSlice);

  // 🔹 과목 조회
  const fetchData = () => {
    CourseApi.config.funcs
      .readAll(user.email)
      .then(setData)
      .catch(console.error);
  };

  useEffect(() => {
    if (user?.email) fetchData();
  }, [user?.email]);

  useEffect(() => {
    DepartmentApi.config.funcs.readAll().then(setDepartments);
  }, []);

  // 🔹 과목 등록
  const handleCreate = () => {
    if (!form.courseName || !form.description || !form.deptName) {
      alert("필수값 누락");
      return;
    }

    const dept = departments.find((d) => d.deptName === form.deptName);

    if (!dept) {
      alert("학과를 선택하세요");
      return;
    }

    const submitForm = {
      courseName: form.courseName,
      description: form.description,
      credits: form.credits,
      departmentId: dept.departmentId, // Long 타입으로 전송
    };

    console.log("등록 데이터:", submitForm);

    CourseApi.config.funcs
      .writeOne(submitForm, user.email)
      .then(() => {
        alert("등록 완료");
        setForm({
          courseId: null,
          courseName: "",
          description: "",
          credits: 3,
          departmentId: null,
          deptName: "",
        });
        fetchData();
      })
      .catch(() => alert("등록 실패"));
  };

  // 삭제 모드
  const handleDeleteClick = () => {
    if (!selectedCourse?.courseId) {
      alert("삭제할 과목을 선택하세요.");
      return;
    }

    if (
      !window.confirm(
        `${selectedCourse.courseName} 과목을 정말 삭제하시겠습니까?`
      )
    ) {
      return;
    }

    CourseApi.config.funcs
      .deleteOne(selectedCourse.courseId, user.email)
      .then((res) => {
        alert("삭제 완료");
        setSelectedCourse(null);
        setIsEditing(false);
        fetchData(); // 리스트 갱신
      })
      .catch((err) => {
        console.error(err);
        alert("삭제 중 오류가 발생했습니다.");
      });
  };

  // 🔹 수정
  const handleUpdate = () => {
    if (!form.courseId) {
      alert("courseId 누락");
      return;
    }

    if (!form.courseName || !form.description) {
      alert("필수값 누락");
      return;
    }

    const dept = departments.find((d) => d.deptName === form.deptName);

    const submitForm = {
      courseId: form.courseId,
      courseName: form.courseName,
      description: form.description,
      credits: form.credits,
      departmentId: dept?.departmentId || form.departmentId, // Long 타입
    };

    console.log("수정 데이터:", submitForm);

    CourseApi.config.funcs
      .updateOne(submitForm, user.email)
      .then(() => {
        alert("수정 완료");
        setSelectedCourse(null);
        setIsEditing(false);
        fetchData();
      })
      .catch(() => alert("수정 실패"));
  };

  // 🔹 수정 모드 진입
  const handleEditClick = () => {
    const dept = departments.find(
      (d) => d.departmentId === selectedCourse.departmentId
    );

    setForm({
      courseId: selectedCourse.courseId,
      courseName: selectedCourse.courseName,
      description: selectedCourse.description,
      credits: selectedCourse.credits,
      departmentId: selectedCourse.departmentId,
      deptName: dept?.deptName || "",
    });

    setIsEditing(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">과목 관리</h1>
        <p className="text-gray-500 mt-1">등록된 과목 목록을 관리합니다</p>
      </div>

      {/* 🔹 새 과목 등록 폼 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          새 과목 등록
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              과목명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.courseName}
              onChange={(e) => setForm({ ...form, courseName: e.target.value })}
              placeholder="과목명을 입력하세요"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                학점 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.credits}
                onChange={(e) =>
                  setForm({ ...form, credits: parseInt(e.target.value) || 1 })
                }
                min="1"
                max="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                학과 <span className="text-red-500">*</span>
              </label>
              <select
                value={form.deptName || ""}
                onChange={(e) => setForm({ ...form, deptName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">학과 선택</option>
                {departments.map((d) => (
                  <option key={d.departmentId} value={d.deptName}>
                    {d.deptName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            과목 설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="과목 설명을 입력하세요"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            과목 등록
          </button>
        </div>
      </div>

      {/* 안내 */}
      <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700 text-sm">
        ※ 학과별 등록된 과목 목록입니다. 과목을 선택해 상세 정보를 확인할 수
        있습니다.
      </div>

      {/* 과목 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                과목명
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                과목 설명
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                학점
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                학과
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  등록된 과목이 없습니다.
                </td>
              </tr>
            ) : (
              data.map((course) => {
                const dept = departments.find(
                  (d) => d.departmentId === course.departmentId
                );
                return (
                  <tr
                    key={course.courseId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {course.courseName}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        ID: {course.courseId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-md">
                        {course.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-semibold">
                        {course.credits}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-700 font-medium">
                        {dept?.deptName || course.departmentId}
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
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 안내 */}
      <p className="mt-4 text-xs text-gray-400">
        ※ "상세보기" 버튼 클릭 시 과목 상세 정보 및 수정 화면으로 이동할 수
        있습니다.
      </p>

      {/* 🔹 상세보기 모달 */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setSelectedCourse(null);
            setIsEditing(false);
          }}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 rounded-t-xl">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? "과목 수정" : "과목 상세 정보"}
              </h2>
            </div>

            {/* 모달 바디 */}
            <div className="p-6 space-y-5">
              {isEditing ? (
                // 수정 모드
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      과목명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.courseName}
                      onChange={(e) =>
                        setForm({ ...form, courseName: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      과목 설명 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        학점 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={form.credits}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            credits: parseInt(e.target.value) || 1,
                          })
                        }
                        min="1"
                        max="4"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        학과
                      </label>
                      <select
                        value={form.deptName || ""}
                        onChange={(e) =>
                          setForm({ ...form, deptName: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">학과 선택</option>
                        {departments.map((d) => (
                          <option key={d.departmentId} value={d.deptName}>
                            {d.deptName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                // 조회 모드
                <>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">과목명</p>
                    <p className="text-xl font-bold text-gray-900">
                      {selectedCourse.courseName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">과목 설명</p>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedCourse.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">과목 ID</p>
                      <p className="font-semibold text-gray-900">
                        {selectedCourse.courseId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">학점</p>
                      <p className="font-semibold text-gray-900">
                        {selectedCourse.credits}학점
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">학과</p>
                      <p className="font-semibold text-gray-900">
                        {departments.find(
                          (d) => d.departmentId === selectedCourse.departmentId
                        )?.deptName || selectedCourse.departmentId}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 모달 푸터 */}
            <div className="px-6 pb-6 flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      setIsEditing(false);
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                  >
                    닫기
                  </button>
                  <button
                    onClick={handleEditClick}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManage;
