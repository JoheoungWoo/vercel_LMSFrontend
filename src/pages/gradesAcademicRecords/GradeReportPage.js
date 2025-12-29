import React, { useMemo, useState } from "react";

const GradeReportPage = () => {
  // 더미 성적 데이터 (원하면 나중에 API 연동해서 교체 가능)
  const gradeData = [
    {
      id: 1,
      semester: "2025-1",
      courseName: "웹 프로그래밍",
      courseCode: "CSE101",
      type: "전공필수",
      credit: 3,
      grade: "A+",
    },
    {
      id: 2,
      semester: "2025-1",
      courseName: "자료구조",
      courseCode: "CSE102",
      type: "전공필수",
      credit: 3,
      grade: "A0",
    },
    {
      id: 3,
      semester: "2025-1",
      courseName: "교양 영어",
      courseCode: "GEN101",
      type: "교양",
      credit: 2,
      grade: "B+",
    },
    {
      id: 4,
      semester: "2024-2",
      courseName: "알고리즘",
      courseCode: "CSE201",
      type: "전공선택",
      credit: 3,
      grade: "B0",
    },
    {
      id: 5,
      semester: "2024-2",
      courseName: "교양 체육",
      courseCode: "GEN202",
      type: "교양",
      credit: 1,
      grade: "P",
    },
  ];

  // 학기 목록 (전체학기 + 유니크 학기)
  const semesterList = useMemo(() => {
    const set = new Set(gradeData.map((g) => g.semester));
    return ["전체학기", ...Array.from(set).sort().reverse()];
  }, [gradeData]);

  const [selectedSemester, setSelectedSemester] = useState("전체학기");

  // 성적 문자열 -> 평점 숫자 매핑
  const gradePointMap = {
    "A+": 4.5,
    A0: 4.0,
    "B+": 3.5,
    B0: 3.0,
    "C+": 2.5,
    C0: 2.0,
    "D+": 1.5,
    D0: 1.0,
    F: 0.0,
  };

  // 선택된 학기에 따라 필터링
  const filteredData =
    selectedSemester === "전체학기"
      ? gradeData
      : gradeData.filter((g) => g.semester === selectedSemester);

  // 요약 정보 계산 (P/F 과목은 평점 계산에서 제외)
  const summary = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    let totalCreditsAll = 0;

    filteredData.forEach((item) => {
      totalCreditsAll += item.credit;

      const point = gradePointMap[item.grade];
      if (point !== undefined) {
        totalPoints += point * item.credit;
        totalCredits += item.credit;
      }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "-";

    return {
      gpa,
      totalCreditsAll,
      totalCreditsForGpa: totalCredits,
    };
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 제목 영역 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            성적표
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            학기별 성적 및 평점 정보를 확인할 수 있습니다.
          </p>
        </header>

        {/* 학기 선택 & 요약 카드 */}
        <section className="mb-6 space-y-4">
          {/* 학기 선택 드롭다운 */}
          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="semester"
              className="text-sm font-medium text-slate-700"
            >
              학기 선택
            </label>
            <select
              id="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            >
              {semesterList.map((sem) => (
                <option key={sem} value={sem}>
                  {sem === "전체학기" ? "전체 학기" : sem}
                </option>
              ))}
            </select>
          </div>

          {/* 요약 카드 3개 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-500">평균 평점</p>
              <p className="mt-1 text-xl font-semibold text-slate-800">
                {summary.gpa}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-500">총 취득 학점</p>
              <p className="mt-1 text-xl font-semibold text-slate-800">
                {summary.totalCreditsAll}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-500">평점 반영 학점</p>
              <p className="mt-1 text-xl font-semibold text-slate-800">
                {summary.totalCreditsForGpa}
              </p>
            </div>
          </div>
        </section>

        {/* 성적 테이블 */}
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-sm font-medium text-slate-800">
              과목별 성적 내역
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-[0.75rem] font-medium text-slate-500">
                    학기
                  </th>
                  <th className="px-4 py-2 text-left text-[0.75rem] font-medium text-slate-500">
                    과목명
                  </th>
                  <th className="px-4 py-2 text-left text-[0.75rem] font-medium text-slate-500">
                    과목코드
                  </th>
                  <th className="px-4 py-2 text-left text-[0.75rem] font-medium text-slate-500">
                    구분
                  </th>
                  <th className="px-4 py-2 text-center text-[0.75rem] font-medium text-slate-500">
                    학점
                  </th>
                  <th className="px-4 py-2 text-center text-[0.75rem] font-medium text-slate-500">
                    성적
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-sm text-slate-400"
                    >
                      해당 학기에 대한 성적 정보가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-4 py-2 text-xs text-slate-500">
                        {item.semester}
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-800">
                        {item.courseName}
                      </td>
                      <td className="px-4 py-2 text-xs text-slate-500">
                        {item.courseCode}
                      </td>
                      <td className="px-4 py-2 text-xs text-slate-600">
                        {item.type}
                      </td>
                      <td className="px-4 py-2 text-center text-sm text-slate-800">
                        {item.credit}
                      </td>
                      <td className="px-4 py-2 text-center text-sm font-semibold text-slate-800">
                        {item.grade}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 작은 안내 텍스트 */}
        <p className="mt-3 text-[0.75rem] text-slate-400">
          ※ 성적 및 평점 정보는 실제 데이터와 다를 수 있으며, 테스트용 더미 데이터입니다.
        </p>
      </div>
    </div>
  );
};

export default GradeReportPage;
