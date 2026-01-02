import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseOfferingApi from "../../../api/CourseOfferingApi";
import CourseApi from "../../../api/CourseApi";
import UserApi from "../../../api/UserApi";
import TermApi from "../../../api/TermApi";

const CourseOfferingManage = () => {
  const user = useSelector((state) => state.loginSlice);

  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [professors, setProfessors] = useState([]);

  const [filters, setFilters] = useState({ semester: "전체" });
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    offeringId: null,
    courseId: "",
    courseName: "",
    professorId: "",
    termId: "",
  });

  /* ===== 조회 ===== */
  const fetchData = () => {
    CourseOfferingApi.config.funcs.readAll().then(setData);
  };

  useEffect(() => {
    fetchData();
    CourseApi.config.funcs.readAll().then(setCourses);
    TermApi.config.funcs.readAll().then(setTerms);
    UserApi.config.funcs
      .readAll()
      .then((res) => setProfessors(res.filter((u) => u.role === "PROFESSOR")));
  }, []);

  /* ===== 유틸 ===== */
  const getTermText = (termId) => {
    if (!termId) return "미지정";
    const t = terms.find((x) => x.termId === termId);
    return t ? `${t.year} ${t.semester || t.termName}` : "미지정";
  };

  const getProfessorName = (id) =>
    professors.find((p) => p.userId === id)?.nickname || "미지정";

  /* ===== 필터 ===== */
  const semesterOptions = [
    "전체",
    ...terms.map((t) => `${t.year} ${t.semester || t.termName}`),
  ];

  const filteredData = data.filter((o) => {
    if (filters.semester === "전체") return true;
    if (!o.termId) return false;
    const t = terms.find((x) => x.termId === o.termId);
    return t
      ? `${t.year} ${t.semester || t.termName}` === filters.semester
      : false;
  });

  /* ===== 등록 ===== */
  const handleCreate = () => {
    if (!form.courseId || !form.professorId || !form.termId) {
      alert("필수값 누락");
      return;
    }

    CourseOfferingApi.config.funcs
      .writeOne(
        {
          courseId: form.courseId,
          professorId: form.professorId,
          termId: form.termId,
          courseName: form.courseName, // 자유 입력 그대로
        },
        user.email
      )
      .then(() => {
        alert("등록 완료");
        setForm({
          offeringId: null,
          courseId: "",
          courseName: "",
          professorId: "",
          termId: "",
        });
        fetchData();
      });
  };

  /* ===== 수정 ===== */
  const handleUpdate = () => {
    CourseOfferingApi.config.funcs
      .updateOne(
        {
          offeringId: form.offeringId,
          courseId: form.courseId,
          professorId: form.professorId,
          termId: form.termId,
          courseName: form.courseName,
        },
        user.email
      )
      .then(() => {
        alert("수정 완료");
        setSelectedOffering(null);
        setIsEditing(false);
        fetchData();
      });
  };

  /* ===== 삭제 ===== */
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    CourseOfferingApi.config.funcs
      .deleteOne(selectedOffering.offeringId, user.email)
      .then(() => {
        alert("삭제 완료");
        setSelectedOffering(null);
        fetchData();
      });
  };

  /* ===== 수정 진입 ===== */
  const handleEditClick = () => {
    setForm({
      offeringId: selectedOffering.offeringId,
      courseId: selectedOffering.courseId,
      courseName: selectedOffering.courseName,
      professorId: selectedOffering.professorId,
      termId: selectedOffering.termId,
    });
    setIsEditing(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">강의 개설 관리</h1>
        <p className="text-gray-500 mt-1">
          학기별 개설될 강의 정보를 관리합니다
        </p>
      </div>

      {/* 🔹 강의 개설 등록 폼 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          새 강의 개설
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 왼쪽 컬럼 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                학기 선택 <span className="text-red-500">*</span>
              </label>
              <select
                value={form.termId}
                onChange={(e) =>
                  setForm({ ...form, termId: Number(e.target.value) })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">학기 선택</option>
                {terms.map((t) => (
                  <option key={t.termId} value={t.termId}>
                    {t.year} {t.semester || t.termName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                과목 선택 <span className="text-red-500">*</span>
              </label>
              <select
                value={form.courseId}
                onChange={(e) => {
                  const c = courses.find(
                    (x) => x.courseId === Number(e.target.value)
                  );
                  setForm({
                    ...form,
                    courseId: c?.courseId || "",
                    courseName: c?.courseName || "", // 참고용 자동 입력
                  });
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">과목 선택</option>
                {courses.map((c) => (
                  <option key={c.courseId} value={c.courseId}>
                    {c.courseName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                담당 교수 <span className="text-red-500">*</span>
              </label>
              <select
                value={form.professorId}
                onChange={(e) =>
                  setForm({ ...form, professorId: Number(e.target.value) })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">교수 선택</option>
                {professors.map((p) => (
                  <option key={p.userId} value={p.userId}>
                    {p.nickname}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                강의명 (표시용)
              </label>
              <input
                type="text"
                value={form.courseName}
                onChange={(e) =>
                  setForm({ ...form, courseName: e.target.value })
                }
                placeholder="미입력 시 과목명 사용"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            강의 개설
          </button>
        </div>
      </div>

      {/* 필터 및 안내 */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-blue-700 text-sm w-full md:w-auto flex-1">
          ※ 학기별 개설된 강의 목록입니다. 상세 정보를 확인하거나 수정할 수
          있습니다.
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            학기 필터:
          </span>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.semester}
            onChange={(e) => setFilters({ semester: e.target.value })}
          >
            {semesterOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                학기
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                강의명
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                담당 교수
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  등록된 강의가 없습니다.
                </td>
              </tr>
            ) : (
              filteredData.map((o) => (
                <tr
                  key={o.offeringId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {getTermText(o.termId)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {o.courseName}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm text-gray-700">
                      {getProfessorName(o.professorId)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedOffering(o)}
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

      {/* 모달 */}
      {selectedOffering && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setSelectedOffering(null);
            setIsEditing(false);
          }}
        >
          <div
            className="bg-white w-full max-w-xl rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 rounded-t-xl">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? "강의 정보 수정" : "강의 상세 정보"}
              </h2>
            </div>

            {/* 모달 바디 */}
            <div className="p-6 space-y-5">
              {isEditing ? (
                // 수정 모드
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      학기 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.termId}
                      onChange={(e) =>
                        setForm({ ...form, termId: Number(e.target.value) })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {terms.map((t) => (
                        <option key={t.termId} value={t.termId}>
                          {t.year} {t.semester || t.termName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      과목 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.courseId}
                      onChange={(e) => {
                        const c = courses.find(
                          (x) => x.courseId === Number(e.target.value)
                        );
                        setForm({
                          ...form,
                          courseId: c.courseId,
                          courseName: c.courseName, // 과목 변경시 기본 이름 세팅
                        });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {courses.map((c) => (
                        <option key={c.courseId} value={c.courseId}>
                          {c.courseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      강의명
                    </label>
                    <input
                      value={form.courseName}
                      onChange={(e) =>
                        setForm({ ...form, courseName: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      담당 교수 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.professorId}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          professorId: Number(e.target.value),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {professors.map((p) => (
                        <option key={p.userId} value={p.userId}>
                          {p.nickname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                // 조회 모드
                <>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">강의명</p>
                    <p className="text-xl font-bold text-gray-900">
                      {selectedOffering.courseName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">학기</p>
                      <p className="font-semibold text-gray-900">
                        {getTermText(selectedOffering.termId)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">담당 교수</p>
                      <p className="font-semibold text-gray-900">
                        {getProfessorName(selectedOffering.professorId)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">개설 ID</p>
                      <p className="text-gray-700">
                        {selectedOffering.offeringId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">원본 과목 ID</p>
                      <p className="text-gray-700">
                        {selectedOffering.courseId}
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
                      setSelectedOffering(null);
                      setIsEditing(false);
                      setForm({
                        offeringId: null,
                        courseId: "",
                        courseName: "",
                        professorId: "",
                        termId: "",
                      });
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
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
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

export default CourseOfferingManage;
