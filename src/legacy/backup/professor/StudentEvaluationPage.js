import React, { useState } from "react";

const StudentEvaluationPage = () => {
  const courses = [
    {
      id: 1,
      code: "CS301",
      name: "웹 프로그래밍",
      semester: "2025-2학기",
    },
    {
      id: 2,
      code: "CS220",
      name: "자료구조",
      semester: "2025-2학기",
    },
    {
      id: 3,
      code: "GE101",
      name: "대학생활과 진로",
      semester: "2025-2학기",
    },
  ];

  const [selectedCourseId, setSelectedCourseId] = useState(1);

  // 더미 평가 비율
  const evaluationPolicy = {
    attendance: 10, // 출석
    assignment: 30, // 과제
    midterm: 30, // 중간
    final: 30, // 기말
  };

  // 더미 학생 데이터
  const allStudentsByCourse = {
    1: [
      {
        id: 1,
        studentId: "20250001",
        name: "김학생",
        major: "컴퓨터공학과",
        attendance: 9, // /10
        assignment: 27, // /30
        midterm: 26, // /30
        final: 28, // /30
        grade: "A",
        comment: "수업 참여도 높고 과제 제출 성실",
      },
      {
        id: 2,
        studentId: "20250002",
        name: "이예제",
        major: "컴퓨터공학과",
        attendance: 10,
        assignment: 25,
        midterm: 24,
        final: 26,
        grade: "B+",
        comment: "안정적인 이해, 질문은 비교적 적음",
      },
      {
        id: 3,
        studentId: "20250003",
        name: "박테스트",
        major: "소프트웨어학과",
        attendance: 8,
        assignment: 22,
        midterm: 20,
        final: 21,
        grade: "B0",
        comment: "기초는 괜찮으나 프로젝트 부분에서 조금 아쉬움",
      },
    ],
    2: [
      {
        id: 1,
        studentId: "20250010",
        name: "김자료",
        major: "컴퓨터공학과",
        attendance: 10,
        assignment: 28,
        midterm: 27,
        final: 29,
        grade: "A+",
        comment: "자료구조 이해도 매우 우수",
      },
    ],
    3: [
      {
        id: 1,
        studentId: "20250100",
        name: "홍진로",
        major: "교양학부",
        attendance: 9,
        assignment: 29,
        midterm: 28,
        final: 27,
        grade: "A",
        comment: "진로 계획 관련 발표 우수",
      },
    ],
  };

  const selectedCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const students = allStudentsByCourse[selectedCourseId] || [];

  const calcTotalScore = (s) =>
    s.attendance + s.assignment + s.midterm + s.final;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            학생 평가 관리
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            강의별로 학생의 출석, 과제, 시험 점수 및 최종 성적을 관리하고,
            코멘트를 기록할 수 있는 페이지입니다.
          </p>
        </header>

        {/* 과목 선택 + 요약 */}
        <section className="mb-5 rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-slate-800">
                평가 대상 강의 선택
              </h2>
              <p className="text-xs text-slate-500">
                학생 평가를 진행할 강의를 선택하세요.
              </p>
            </div>

            <div className="w-full max-w-xs space-y-1">
              <label className="text-[0.75rem] text-slate-600">
                강의 선택
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.semester}] {c.code} · {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-[0.8rem] text-slate-600">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1">
              학기:{" "}
              <span className="ml-1 font-medium">
                {selectedCourse?.semester}
              </span>
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1">
              과목:{" "}
              <span className="ml-1 font-medium">
                {selectedCourse?.name} ({selectedCourse?.code})
              </span>
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1">
              수강 인원:{" "}
              <span className="ml-1 font-medium">{students.length}명</span>
            </span>
          </div>
        </section>

        {/* 평가 기준(비율) */}
        <section className="mb-5 rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            평가 기준 (비율)
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            각 항목별 반영 비율입니다. 실제 점수는 반영 비율을 고려하여 계산할 수 있습니다.
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-[0.8rem] text-slate-700">
            <span className="inline-flex items-center rounded-md bg-slate-50 px-3 py-1">
              출석: {evaluationPolicy.attendance}%
            </span>
            <span className="inline-flex items-center rounded-md bg-slate-50 px-3 py-1">
              과제: {evaluationPolicy.assignment}%
            </span>
            <span className="inline-flex items-center rounded-md bg-slate-50 px-3 py-1">
              중간고사: {evaluationPolicy.midterm}%
            </span>
            <span className="inline-flex items-center rounded-md bg-slate-50 px-3 py-1">
              기말고사: {evaluationPolicy.final}%
            </span>
          </div>
        </section>

        {/* 학생 평가 테이블 */}
        <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            학생별 평가 내역
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            출석, 과제, 중간/기말 점수와 총점, 등급 및 메모를 확인할 수 있습니다.
            (현재는 읽기 전용 더미 데이터입니다.)
          </p>

          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border-collapse text-[0.8rem]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                  <th className="px-2 py-2">학번</th>
                  <th className="px-2 py-2">이름</th>
                  <th className="px-2 py-2">전공</th>
                  <th className="px-2 py-2 text-center">출석 (/{evaluationPolicy.attendance})</th>
                  <th className="px-2 py-2 text-center">과제 (/{evaluationPolicy.assignment})</th>
                  <th className="px-2 py-2 text-center">중간 (/{evaluationPolicy.midterm})</th>
                  <th className="px-2 py-2 text-center">기말 (/{evaluationPolicy.final})</th>
                  <th className="px-2 py-2 text-center">총점 (/100)</th>
                  <th className="px-2 py-2 text-center">등급</th>
                  <th className="px-2 py-2">코멘트</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, idx) => {
                  const total = calcTotalScore(s);
                  return (
                    <tr
                      key={s.id}
                      className={`border-b border-slate-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-2 py-1.5 align-middle text-slate-700">
                        {s.studentId}
                      </td>
                      <td className="px-2 py-1.5 align-middle text-slate-800">
                        {s.name}
                      </td>
                      <td className="px-2 py-1.5 align-middle text-slate-700">
                        {s.major}
                      </td>
                      <td className="px-2 py-1.5 text-center align-middle text-slate-700">
                        {s.attendance}
                      </td>
                      <td className="px-2 py-1.5 text-center align-middle text-slate-700">
                        {s.assignment}
                      </td>
                      <td className="px-2 py-1.5 text-center align-middle text-slate-700">
                        {s.midterm}
                      </td>
                      <td className="px-2 py-1.5 text-center align-middle text-slate-700">
                        {s.final}
                      </td>
                      <td className="px-2 py-1.5 text-center align-middle font-semibold text-slate-800">
                        {total}
                      </td>
                      <td className="px-2 py-1.5 text-center align-middle">
                        <span className="inline-flex rounded-full bg-slate-100 px-2 py-[2px] text-[0.7rem] text-slate-800">
                          {s.grade}
                        </span>
                      </td>
                      <td className="px-2 py-1.5 align-middle text-slate-600">
                        <p className="max-w-xs truncate" title={s.comment}>
                          {s.comment}
                        </p>
                      </td>
                    </tr>
                  );
                })}

                {students.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-2 py-4 text-center text-slate-400"
                    >
                      선택한 강의에 대한 학생 평가 정보가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 하단 안내 */}
        <p className="mt-4 text-[0.75rem] text-slate-400">
          ※ 모든 데이터는 예시용 더미 값입니다. 실제 서비스에서는 강의별 수강생
          목록 및 평가 정보를 서버에서 불러오고, 점수/등급/코멘트 수정 기능을
          추가해야 합니다.
        </p>
      </div>
    </div>
  );
};

export default StudentEvaluationPage;
