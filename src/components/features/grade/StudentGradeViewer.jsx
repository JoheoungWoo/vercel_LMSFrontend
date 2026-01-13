import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// 🔥 [중요] 중괄호 { } 필수! (Hook 파일이 export const로 되어 있으므로)
import { useStudentGrade } from "../../../hook/grade/useStudentGrade";

export default function StudentGradeViewer({ onClose }) {
  // 1. Redux에서 로그인 정보 가져오기
  // (store.js에 'loginSlice'라는 이름이 맞는지 확인 필요)
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState?.email;
  const userNickname = loginState?.nickname;

  // 🔍 [디버깅] 브라우저 콘솔(F12)을 확인해보세요!
  useEffect(() => {
    console.log("====================================");
    console.log("[StudentGradeViewer] 로그인 상태 점검");
    console.log("Email:", userEmail);
    console.log("Role:", loginState?.role);
    console.log("====================================");
  }, [userEmail, loginState]);

  // 2. Custom Hook 호출
  const {
    grades,
    scores,
    selectedGrade,
    gpaInfo,
    loadingGrades,
    loadingScores,
    ITEM_TYPE_MAP,
    selectSubject,
    fetchGrades,
  } = useStudentGrade(userEmail);

  const displayName =
    grades?.[0]?.studentName ||
    userNickname ||
    userEmail?.split("@")[0] ||
    "학생";

  return (
    <div className="relative w-full bg-slate-50 p-6 font-sans text-slate-800">
      {/* 닫기 버튼 */}
      {/* {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition"
        >
          <svg
            className="w-6 h-6"
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
      )} */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">내 성적 조회</h1>
          <p className="text-sm text-slate-500">
            {/* 로그인한 계정 표시 (디버깅용) */}
            사용자:{" "}
            <span className="font-bold text-indigo-700 text-lg">
              {displayName}
            </span>
          </p>
        </div>
        <button
          onClick={fetchGrades}
          className="text-xs bg-white border px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-600 shadow-sm"
        >
          🔄 새로고침
        </button>
      </header>
      {/* ... (아래 UI 코드는 기존과 동일하게 유지) ... */}
      {/* 1. 요약 카드 (GPA) */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="평점 평균 (GPA)"
          value={gpaInfo.gpa}
          subText="/ 4.5"
          color="bg-indigo-50 text-indigo-700 border-indigo-100"
        />
        <SummaryCard
          title="취득 학점"
          value={`${gpaInfo.totalCredit}학점`}
          color="bg-emerald-50 text-emerald-700 border-emerald-100"
        />
        <SummaryCard
          title="이수 과목"
          value={`${gpaInfo.subjectCount}과목`}
          color="bg-slate-white text-slate-700 border-slate-200"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 좌측: 리스트 */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-700 mb-3 ml-1">
            📂 수강 과목
          </h3>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {loadingGrades ? (
              <div className="py-20 text-center text-slate-400">
                성적 불러오는 중...
              </div>
            ) : grades.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                성적 내역이 없습니다.
                <br />
                <span className="text-xs text-slate-300">
                  (혹시 수강신청을 안 하셨나요?)
                </span>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">과목명</th>
                    <th className="px-4 py-3 font-medium text-center">학점</th>
                    <th className="px-4 py-3 font-medium text-center">등급</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grades.map((grade) => (
                    <tr
                      key={grade.gradeId}
                      onClick={() => selectSubject(grade)}
                      className={`cursor-pointer transition border-l-4 ${
                        selectedGrade?.gradeId === grade.gradeId
                          ? "bg-indigo-50 border-indigo-500"
                          : "border-transparent hover:bg-slate-50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-800">
                          {grade.courseName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {grade.professorName}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-600">
                        {grade.credit}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-bold ${
                            grade.letterGrade === "F"
                              ? "bg-red-100 text-red-600"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {grade.letterGrade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* 우측: 상세 점수 */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-700 mb-3 ml-1">
            📝 상세 점수
            {selectedGrade && (
              <span className="text-indigo-600 ml-1">
                - {selectedGrade.courseName}
              </span>
            )}
          </h3>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm min-h-[200px]">
            {!selectedGrade ? (
              <div className="flex h-full flex-col items-center justify-center py-20 text-slate-400 bg-slate-50/50 rounded-xl">
                <span className="text-4xl mb-2">👈</span>
                <p className="text-sm">왼쪽 목록에서 과목을 선택해주세요.</p>
              </div>
            ) : loadingScores ? (
              <div className="py-20 text-center text-slate-400">
                상세 점수 조회 중...
              </div>
            ) : scores.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                상세 점수가 등록되지 않았습니다.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">평가 항목</th>
                    <th className="px-4 py-3 font-medium text-right">점수</th>
                    <th className="px-4 py-3 font-medium text-right">비율</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scores.map((score, idx) => (
                    <tr
                      key={score.scoreId || idx}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">
                        <span className="font-medium text-slate-700">
                          {score.itemName}
                        </span>
                        <span className="ml-1 text-xs text-slate-400">
                          ({ITEM_TYPE_MAP[score.itemType] || score.itemType})
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-bold text-indigo-600">
                          {score.scoreObtained}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {" "}
                          / {score.maxScore}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500">
                        {score.weightPercent}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
                    <td className="px-4 py-3 text-slate-800">최종 환산</td>
                    <td
                      className="px-4 py-3 text-right text-indigo-700"
                      colSpan="2"
                    >
                      {selectedGrade.totalScore}점 ({selectedGrade.letterGrade})
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const SummaryCard = ({ title, value, subText, color }) => (
  <div
    className={`p-4 rounded-xl border ${color} shadow-sm flex flex-col items-center justify-center`}
  >
    <span className="text-xs font-bold uppercase opacity-70 mb-1">{title}</span>
    <div className="text-2xl font-bold">
      {value} <span className="text-sm font-normal opacity-60">{subText}</span>
    </div>
  </div>
);
