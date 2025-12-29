import React, { useEffect, useState, useMemo } from "react";
// 1. axios 직접 호출 대신, 기존에 정의된 GradeApi를 가져옵니다.
import GradeApi from "../../api/GradeApi";

// --- 통계 계산 헬퍼 (기존 로직 유지) ---
const calculateStatistics = (grades) => {
  if (!grades || grades.length === 0)
    return { totalCredits: 0, gpa: 0, totalSubjects: 0 };

  let totalScoreSum = 0;
  let totalCreditsSum = 0;

  grades.forEach((g) => {
    // 백엔드에서 null로 오면 0으로 처리
    const credit = g.credit || 0;
    // 평점 계산용 (간이 로직: 예시)
    const score = g.totalScore || 0;

    totalCreditsSum += credit;
    totalScoreSum += score * credit;
  });

  // 100점 만점 기준을 4.5로 환산하는 예시 로직
  const avgScore = totalCreditsSum > 0 ? totalScoreSum / totalCreditsSum : 0;
  const gpa = ((avgScore / 100) * 4.5).toFixed(2);

  return {
    totalCredits: totalCreditsSum,
    gpa: gpa,
    totalSubjects: grades.length,
  };
};

// props에 onClose (모달 닫기용)
export default function StudentGradeComponent({ onClose }) {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // 필터 State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [selectedSemester, setSelectedSemester] = useState("ALL");

  // TODO: 실제 로그인한 유저 이메일로 변경 필요 (로그인 컨텍스트 등 활용)
  const userEmail = "student@aaa.com";

  useEffect(() => {
    fetchMyGrades();
  }, []);

  // ✅ [핵심 수정 부분] 공통 API 유틸리티(commonApi)의 패턴을 그대로 활용
  const fetchMyGrades = async () => {
    setLoading(true);
    try {
      // commonApi.js의 findByKeyword 로직:
      // axios.get(`${API_SERVER_HOST}/api/${tableName}/${selectKeyword}/${searchText}`)

      // 우리가 필요한 URL: /api/grade/my/{email}
      // 따라서 아래와 같이 매핑하여 호출합니다.
      // tableName="grade" (GradeApi 내부 설정)
      // selectKeyword="my"
      // searchText=userEmail

      const data = await GradeApi.config.funcs.findByKeyword("my", userEmail);

      setGrades(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("성적 조회 실패:", error);
      setGrades([]);
    } finally {
      setLoading(false);
    }
  };

  // --- 필터링 로직 (기존 유지) ---
  const filteredGrades = useMemo(() => {
    return grades.filter((g) => {
      const matchesSearch = (g.courseName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesYear =
        selectedYear === "ALL" || String(g.year) === selectedYear;
      const matchesSemester =
        selectedSemester === "ALL" || String(g.semester) === selectedSemester;
      return matchesSearch && matchesYear && matchesSemester;
    });
  }, [grades, searchTerm, selectedYear, selectedSemester]);

  // --- 통계 계산 (기존 유지) ---
  const stats = useMemo(() => calculateStatistics(grades), [grades]);

  // --- 유니크 년도 추출 (기존 유지) ---
  const yearOptions = useMemo(() => {
    const years = new Set(grades.map((g) => g.year).filter(Boolean));
    return Array.from(years).sort((a, b) => b - a);
  }, [grades]);

  return (
    <div className="relative w-full bg-slate-50 p-6 font-sans text-slate-800">
      {/* 🔴 모달 닫기 버튼 (우측 상단 X) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* 헤더 */}
      <header className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">내 성적 조회</h1>
        <p className="text-sm text-slate-500">
          이수 교과목 성적 및 평점을 확인합니다.
        </p>
      </header>

      {/* 요약 카드 */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="text-sm text-slate-500">총 이수 학점</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">
            {stats.totalCredits}학점
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="text-sm text-slate-500">평균 평점(GPA)</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">
            {stats.gpa} / 4.5
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="text-sm text-slate-500">이수 과목</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">
            {stats.totalSubjects}과목
          </div>
        </div>
      </div>

      {/* 필터바 */}
      <div className="mb-4 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">성적 목록</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {filteredGrades.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="ALL">전체 년도</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
          <select
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="ALL">전체 학기</option>
            <option value="1">1학기</option>
            <option value="2">2학기</option>
          </select>
          <input
            type="text"
            placeholder="과목명 검색"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">년도/학기</th>
              <th className="px-6 py-3 font-medium">교과목명</th>
              <th className="px-6 py-3 font-medium">담당교수</th>
              <th className="px-6 py-3 text-center font-medium">학점</th>
              <th className="px-6 py-3 text-center font-medium">총점</th>
              <th className="px-6 py-3 text-center font-medium">등급</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-slate-400">
                  로딩 중...
                </td>
              </tr>
            ) : filteredGrades.length > 0 ? (
              filteredGrades.map((grade, idx) => (
                <tr key={grade.gradeId || idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">
                    {grade.year ? `${grade.year}년` : "-"} /{" "}
                    {grade.semester ? grade.semester : "-"}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {grade.courseName}
                  </td>

                  {/* 교수명 표시 */}
                  <td className="px-6 py-4 text-slate-600">
                    {grade.professorName || "-"}
                  </td>

                  {/* 학점 표시 */}
                  <td className="px-6 py-4 text-center text-slate-600">
                    {grade.credit}
                  </td>

                  <td className="px-6 py-4 text-center font-medium text-slate-700">
                    {grade.totalScore}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex rounded-md px-2 py-1 text-xs font-bold 
                      ${
                        ["A+", "A"].includes(grade.letterGrade)
                          ? "bg-sky-100 text-sky-700"
                          : grade.letterGrade === "F"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {grade.letterGrade || "-"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-10 text-center text-slate-400">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔴 하단 닫기 버튼 */}
      {onClose && (
        <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-all"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
