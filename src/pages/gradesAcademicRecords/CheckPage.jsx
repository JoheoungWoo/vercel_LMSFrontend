import React, { useState } from "react";

const SEMESTERS = ["2025-1", "2024-2", "2024-1", "2023-2"];

// 학기별 더미 데이터
const GRADE_DATA_BY_SEMESTER = {
  "2025-1": [
    { course: "웹 프로그래밍", type: "전공필수", credit: 3, grade: "A+", score: 4.5 },
    { course: "자료구조", type: "전공필수", credit: 3, grade: "A", score: 4.0 },
    { course: "컴퓨터 구조", type: "전공선택", credit: 3, grade: "B+", score: 3.5 },
    { course: "교양 영어", type: "교양", credit: 2, grade: "A", score: 4.0 },
  ],
  "2024-2": [
    { course: "알고리즘", type: "전공필수", credit: 3, grade: "A", score: 4.0 },
    { course: "데이터베이스", type: "전공필수", credit: 3, grade: "B+", score: 3.5 },
    { course: "확률과 통계", type: "교양", credit: 3, grade: "B", score: 3.0 },
  ],
  "2024-1": [
    { course: "C 프로그래밍", type: "전공기초", credit: 3, grade: "A+", score: 4.5 },
    { course: "이산수학", type: "전공기초", credit: 3, grade: "B+", score: 3.5 },
  ],
  "2023-2": [
    { course: "대학 글쓰기", type: "교양", credit: 2, grade: "A", score: 4.0 },
    { course: "교양 수학", type: "교양", credit: 3, grade: "B+", score: 3.5 },
  ],
};

export default function GradeReportViewPrintPage() {
  const [selectedSemester, setSelectedSemester] = useState(SEMESTERS[0]);

  const gradeData = GRADE_DATA_BY_SEMESTER[selectedSemester] || [];

  const totalCredits = gradeData.reduce((acc, v) => acc + v.credit, 0);
  const totalScore = gradeData.reduce((acc, v) => acc + v.score * v.credit, 0);
  const GPA = gradeData.length ? (totalScore / totalCredits).toFixed(2) : "-";

  const handlePrint = () => {
    const printContents = document.getElementById("print").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

  };

  return (
    <div id="print" className="min-h-screen bg-gray-100 py-10 px-4 print:bg-white">
      {/* 상단 제목 + 조회/출력 버튼 영역 (인쇄 시 숨김) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-bold text-gray-800">
          성적표 조회 및 출력
        </h1>

        <div className="flex items-center gap-3">
          {/* 학기 선택 */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm shadow-sm"
          >
            {SEMESTERS.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          {/* 인쇄 버튼 */}
          <button
            onClick={handlePrint}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow"
          >
            성적표 인쇄
          </button>
        </div>
      </div>

      {/* 실제 출력 대상 성적표 박스 */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-8 print:shadow-none print:border print:rounded-none">
        {/* 상단 학교/제목 영역 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            GREEN UNIVERSITY 성적표
          </h2>
          <p className="text-sm text-gray-500">
            학기 성적 조회 / Grade Report
          </p>
        </div>

        {/* 학생 기본 정보 */}
        <div className="mb-6 text-sm text-gray-700">
          <div className="flex justify-between mb-2">
            <div>
              <span className="font-semibold">학번</span>{" "}
              <span className="ml-2">20250001</span>
            </div>
            <div>
              <span className="font-semibold">이름</span>{" "}
              <span className="ml-2">김유라</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="font-semibold">학과</span>{" "}
              <span className="ml-2">컴퓨터공학과</span>
            </div>
            <div>
              <span className="font-semibold">조회 학기</span>{" "}
              <span className="ml-2">{selectedSemester}</span>
            </div>
          </div>
        </div>

        {/* 성적 테이블 */}
        <table className="w-full text-center text-xs border-t border-b border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 border-b border-gray-300">과목명</th>
              <th className="py-2 border-b border-gray-300">구분</th>
              <th className="py-2 border-b border-gray-300">학점</th>
              <th className="py-2 border-b border-gray-300">성적</th>
              <th className="py-2 border-b border-gray-300">평점</th>
            </tr>
          </thead>
          <tbody>
            {gradeData.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-gray-400">
                  조회된 성적 정보가 없습니다.
                </td>
              </tr>
            ) : (
              gradeData.map((item) => (
                <tr key={item.course} className="hover:bg-gray-50">
                  <td className="py-2 border-b border-gray-200">
                    {item.course}
                  </td>
                  <td className="py-2 border-b border-gray-200">
                    {item.type}
                  </td>
                  <td className="py-2 border-b border-gray-200">
                    {item.credit}
                  </td>
                  <td className="py-2 border-b border-gray-200 font-semibold">
                    {item.grade}
                  </td>
                  <td className="py-2 border-b border-gray-200">
                    {item.score}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 하단 요약 정보 */}
        <div className="mt-6 text-sm text-gray-700 flex justify-between">
          <div>
            <span className="font-semibold">총 이수학점</span>
            <span className="ml-2">{totalCredits} 학점</span>
          </div>
          <div>
            <span className="font-semibold">학기 평점(GPA)</span>
            <span className="ml-2">{GPA}</span>
          </div>
          <div>
            <span className="font-semibold">백분위(추정)</span>
            <span className="ml-2">
              {GPA === "-" ? "-" : (GPA * 20).toFixed(0) + " 점"}
            </span>
          </div>
        </div>

        {/* 인쇄용 하단 문구 */}
        <div className="mt-10 text-xs text-gray-500 text-right">
          성적표 출력일자 : {new Date().toLocaleDateString("ko-KR")}
        </div>
      </div>
    </div>
  );
}
