import React, { useState } from "react";

const CourseManagementPage = () => {
  const [filters, setFilters] = useState({
    semester: "전체",
    status: "전체",
    department: "전체",
  });

  const courses = [
    {
      id: 1,
      code: "CS301",
      name: "웹 프로그래밍",
      department: "컴퓨터공학과",
      type: "전공",
      semester: "2025-2학기",
      professor: "홍길동",
      credit: 3,
      dayTime: "월 · 수 09:00 ~ 10:15",
      room: "IT관 301호",
      status: "개설",
      enrolled: 42,
      capacity: 50,
    },
    {
      id: 2,
      code: "CS220",
      name: "자료구조",
      department: "컴퓨터공학과",
      type: "전공",
      semester: "2025-2학기",
      professor: "이자바",
      credit: 3,
      dayTime: "화 · 목 10:30 ~ 11:45",
      room: "IT관 204호",
      status: "개설",
      enrolled: 38,
      capacity: 40,
    },
    {
      id: 3,
      code: "GE101",
      name: "대학생활과 진로",
      department: "교양학부",
      type: "교양",
      semester: "2025-2학기",
      professor: "박교수",
      credit: 2,
      dayTime: "금 13:00 ~ 14:30",
      room: "본관 102호",
      status: "준비중",
      enrolled: 60,
      capacity: 80,
    },
    {
      id: 4,
      code: "CS110",
      name: "프로그래밍 기초",
      department: "컴퓨터공학과",
      type: "전공",
      semester: "2025-1학기",
      professor: "홍길동",
      credit: 3,
      dayTime: "월 · 수 11:00 ~ 12:15",
      room: "IT관 202호",
      status: "종료",
      enrolled: 40,
      capacity: 40,
    },
  ];

  const semesters = ["전체", "2025-2학기", "2025-1학기", "2024-2학기"];
  const statuses = ["전체", "개설", "준비중", "종료"];
  const departments = ["전체", "컴퓨터공학과", "교양학부"];

  const filteredCourses = courses.filter((c) => {
    if (filters.semester !== "전체" && c.semester !== filters.semester)
      return false;
    if (filters.status !== "전체" && c.status !== filters.status) return false;
    if (filters.department !== "전체" && c.department !== filters.department)
      return false;
    return true;
  });

  const total = courses.length;
  const opened = courses.filter((c) => c.status === "개설").length;
  const preparing = courses.filter((c) => c.status === "준비중").length;

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              강의 관리
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              개설 강의 조회, 학기별/학과별 필터, 수강 정원 및 상태를 관리합니다.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600"
          >
            새 강의 개설
          </button>
        </header>

        {/* 상단 요약 카드 */}
        <section className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">전체 강의 수</p>
            <p className="mt-1 text-xl font-semibold text-slate-800">
              {total}개
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              학기 구분 없이 등록된 전체 강의 개수입니다.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">현재 개설 강의</p>
            <p className="mt-1 text-xl font-semibold text-slate-800">
              {opened}개
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              상태가 &quot;개설&quot; 인 강의 수입니다.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">준비 중 강의</p>
            <p className="mt-1 text-xl font-semibold text-slate-800">
              {preparing}개
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              강의 계획 중인 과목입니다.
            </p>
          </div>
        </section>

        {/* 필터 영역 */}
        <section className="mb-4 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">검색 필터</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-[0.75rem] text-slate-600">학기</label>
              <select
                value={filters.semester}
                onChange={(e) =>
                  handleFilterChange("semester", e.target.value)
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              >
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[0.75rem] text-slate-600">개설 상태</label>
              <select
                value={filters.status}
                onChange={(e) =>
                  handleFilterChange("status", e.target.value)
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[0.75rem] text-slate-600">학과</label>
              <select
                value={filters.department}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* 강의 목록 테이블 */}
        <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            강의 목록
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            필터 조건에 따라 강의 목록이 표시됩니다. 강의 상세, 수강현황, 수정 등은
            아래 액션 버튼으로 이동합니다.
          </p>

          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border-collapse text-[0.8rem]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                  <th className="px-2 py-2">학기</th>
                  <th className="px-2 py-2">과목 코드</th>
                  <th className="px-2 py-2">과목명</th>
                  <th className="px-2 py-2">학과</th>
                  <th className="px-2 py-2">담당 교수</th>
                  <th className="px-2 py-2 text-center">학점</th>
                  <th className="px-2 py-2 text-center">정원/수강</th>
                  <th className="px-2 py-2">시간/강의실</th>
                  <th className="px-2 py-2 text-center">상태</th>
                  <th className="px-2 py-2 text-center">작업</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((c, idx) => (
                  <tr
                    key={c.id}
                    className={`border-b border-slate-100 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    }`}
                  >
                    <td className="px-2 py-1.5 align-middle text-slate-700">
                      {c.semester}
                    </td>
                    <td className="px-2 py-1.5 align-middle text-slate-700">
                      {c.code}
                    </td>
                    <td className="px-2 py-1.5 align-middle text-slate-800">
                      {c.name}
                    </td>
                    <td className="px-2 py-1.5 align-middle text-slate-700">
                      {c.department}
                    </td>
                    <td className="px-2 py-1.5 align-middle text-slate-700">
                      {c.professor}
                    </td>
                    <td className="px-2 py-1.5 text-center align-middle text-slate-700">
                      {c.credit}
                    </td>
                    <td className="px-2 py-1.5 text-center align-middle text-slate-700">
                      {c.enrolled} / {c.capacity}
                    </td>
                    <td className="px-2 py-1.5 align-middle text-slate-700">
                      {c.dayTime}
                      <span className="block text-[0.7rem] text-slate-500">
                        {c.room}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 text-center align-middle">
                      <span
                        className={[
                          "inline-flex rounded-full px-2 py-[2px] text-[0.7rem]",
                          c.status === "개설" &&
                            "bg-emerald-50 text-emerald-700 border border-emerald-200",
                          c.status === "준비중" &&
                            "bg-amber-50 text-amber-700 border border-amber-200",
                          c.status === "종료" &&
                            "bg-slate-100 text-slate-600 border border-slate-200",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 text-center align-middle">
                      <div className="flex flex-col items-center gap-1">
                        <button className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50">
                          상세
                        </button>
                        <button className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50">
                          수정
                        </button>
                        <button className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50">
                          수강현황
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCourses.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-2 py-4 text-center text-slate-400"
                    >
                      선택한 조건에 해당하는 강의가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-4 text-[0.75rem] text-slate-400">
          ※ 모든 데이터는 예시용 더미 값입니다. 실제 서비스에서는 강의/수업 관리
          API를 연동하여 로그인한 사용자 권한(관리자/교수)에 따라 목록을 불러와야
          합니다.
        </p>
      </div>
    </div>
  );
};

export default CourseManagementPage;
