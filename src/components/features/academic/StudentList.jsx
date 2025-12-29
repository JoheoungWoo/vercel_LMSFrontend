import React, { useState } from "react";

const StudentList = () => {
  // ───────────────── 수강 학생 더미 ─────────────────
  const [students, setStudents] = useState([
    {
      id: 1,
      studentId: "20250001",
      name: "김학생",
      major: "컴퓨터공학과",
      year: 2,
      email: "student01@univ.ac.kr",
      attendanceRate: 98,
      assignmentRate: 100,
      status: "재학",
    },
    {
      id: 2,
      studentId: "20250002",
      name: "이예제",
      major: "컴퓨터공학과",
      year: 3,
      email: "student02@univ.ac.kr",
      attendanceRate: 92,
      assignmentRate: 85,
      status: "재학",
    },
    {
      id: 3,
      studentId: "20250003",
      name: "박테스트",
      major: "소프트웨어학과",
      year: 1,
      email: "student03@univ.ac.kr",
      attendanceRate: 75,
      assignmentRate: 60,
      status: "휴학",
    },
  ]);

  // ───────────────── 출석/과제 요약 색상 ─────────────────
  const rateColor = (rate) => {
    if (rate >= 90) return "text-emerald-600";
    if (rate >= 70) return "text-amber-600";
    return "text-rose-600";
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 해당 강의를 수강 중인 학생 목록입니다. 출석, 과제, 성적 관리 화면으로
        확장할 수 있습니다.
      </div>

      {/* 상단 액션 */}
      <div className="flex flex-wrap gap-2 text-[0.75rem]">
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          엑셀 다운로드 (더미)
        </button>
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          출석 관리 이동
        </button>
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          과제 관리 이동
        </button>
      </div>

      {/* 학생 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
              <th className="px-2 py-2">학번</th>
              <th className="px-2 py-2">이름</th>
              <th className="px-2 py-2">전공</th>
              <th className="px-2 py-2">학년</th>
              <th className="px-2 py-2">이메일</th>
              <th className="px-2 py-2 text-center">출석률</th>
              <th className="px-2 py-2 text-center">과제</th>
              <th className="px-2 py-2 text-center">상태</th>
              <th className="px-2 py-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr
                key={s.id}
                className={`border-b border-slate-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <td className="px-2 py-2 align-middle text-slate-700">
                  {s.studentId}
                </td>
                <td className="px-2 py-2 align-middle font-medium text-slate-800">
                  {s.name}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {s.major}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {s.year}학년
                </td>
                <td className="px-2 py-2 align-middle text-slate-600">
                  {s.email}
                </td>
                <td
                  className={`px-2 py-2 text-center align-middle font-medium ${rateColor(
                    s.attendanceRate
                  )}`}
                >
                  {s.attendanceRate}%
                </td>
                <td
                  className={`px-2 py-2 text-center align-middle font-medium ${rateColor(
                    s.assignmentRate
                  )}`}
                >
                  {s.assignmentRate}%
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
                    {s.status}
                  </span>
                </td>
                <td className="px-2 py-2 text-center align-middle">
                  <button className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50">
                    상세
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-2 py-4 text-center text-slate-400"
                >
                  수강 학생이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ “상세” 버튼 클릭 시 학생별 출석 기록, 과제 제출 내역, 성적 관리
        화면으로 확장하는 구조를 권장합니다.
      </p>
    </div>
  );
};

export default StudentList;
