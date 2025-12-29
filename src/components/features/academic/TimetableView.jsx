import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useTimetableData,
  DAYS,
  PERIODS,
} from "../../../hook/timeTable/useTimetableData"; // 훅 import

// =============================================================================
// UI 헬퍼 & 서브 컴포넌트
// =============================================================================
const getBgClass = (major) => {
  const colors = {
    컴퓨터공학: "bg-blue-100",
    소프트웨어: "bg-green-100",
    정보통신: "bg-purple-100",
    교양: "bg-yellow-100",
    종합설계: "bg-pink-100",
    자율학습: "bg-gray-100",
  };
  return colors[major] || "bg-sky-100";
};

// 1. 통계 카드
const StatsBoard = ({ stats }) => (
  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
      <div className="text-sm text-slate-500">수강 과목 수</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">
        {stats.uniqueCourses}개
      </div>
    </div>
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
      <div className="text-sm text-slate-500">주간 수업 횟수</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">
        {stats.totalClasses}회
      </div>
    </div>
  </div>
);

// 2. 그리드 뷰
const GridView = ({ gridData, onSelect }) => (
  <div className="overflow-x-auto">
    <table className="min-w-[600px] w-full border-collapse border border-slate-300 text-center text-sm bg-white rounded-xl shadow-sm">
      <thead>
        <tr>
          <th className="border px-3 py-3 bg-slate-100 font-semibold w-20">
            교시
          </th>
          {DAYS.map((day) => (
            <th
              key={day}
              className="border px-3 py-3 bg-slate-100 font-semibold"
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PERIODS.map((period, idx) => (
          <tr key={idx}>
            <td className="border px-3 py-3 bg-slate-50 font-medium text-xs whitespace-nowrap">
              {period}
            </td>
            {DAYS.map((day) => {
              const lec = gridData[day][idx];
              if (!lec)
                return (
                  <td key={day} className="border px-3 py-3 hover:bg-slate-50">
                    -
                  </td>
                );
              if (!lec.isFirst)
                return (
                  <td
                    key={day}
                    className={`border px-3 py-3 ${getBgClass(
                      lec.major
                    )} opacity-50 text-xs text-slate-500`}
                  >
                    ▼
                  </td>
                );

              return (
                <td
                  key={day}
                  onClick={() => onSelect(lec)}
                  className={`border px-3 py-3 cursor-pointer transition ${getBgClass(
                    lec.major
                  )} hover:brightness-95`}
                >
                  <div className="font-semibold text-sm">{lec.name}</div>
                  <div className="text-xs text-slate-700">{lec.major}</div>
                  <div className="text-xs text-slate-500">{lec.classroom}</div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 3. 리스트 뷰
const ListView = ({ data }) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-slate-500">
        <tr>
          <th className="px-6 py-3 font-medium">요일</th>
          <th className="px-6 py-3 font-medium">시간</th>
          <th className="px-6 py-3 font-medium">교과목명</th>
          <th className="px-6 py-3 font-medium">분반/교수</th>
          <th className="px-6 py-3 font-medium">강의실</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.length === 0 ? (
          <tr>
            <td colSpan="5" className="py-10 text-center text-slate-400">
              시간표가 없습니다.
            </td>
          </tr>
        ) : (
          data.map((t, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <span className="bg-slate-100 px-2 py-1 rounded font-bold text-xs">
                  {t.dayOfWeek}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-700">
                {t.startTime?.substring(0, 5)} ~ {t.endTime?.substring(0, 5)}
              </td>
              <td className="px-6 py-4 font-bold text-slate-900">
                {t.courseName}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {t.sectionName} / {t.professorName}
              </td>
              <td className="px-6 py-4 text-slate-600">{t.classroomName}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

// 4. 모달
const LectureDetailModal = ({ lecture, onClose }) => {
  if (!lecture) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-96 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 border-b pb-2">{lecture.name}</h2>
        <div className="space-y-3 text-sm text-slate-700 mb-6">
          <div className="flex justify-between">
            <span>분반</span>{" "}
            <span className="font-medium">{lecture.major}</span>
          </div>
          <div className="flex justify-between">
            <span>교수</span>{" "}
            <span className="font-medium">{lecture.professor}</span>
          </div>
          <div className="flex justify-between">
            <span>강의실</span>{" "}
            <span className="font-medium">{lecture.classroom}</span>
          </div>
          <div className="flex justify-between">
            <span>시간</span>{" "}
            <span className="font-medium">
              {lecture.startTime?.substring(0, 5)} ~{" "}
              {lecture.endTime?.substring(0, 5)}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

// =============================================================================
// 메인 컴포넌트 (TimetableView)
// =============================================================================
export default function TimetableView({ onClose }) {
  // ✅ Redux 로그인 정보 사용 (실제 서비스용)
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState?.email || "student@aaa.com"; // 비로그인 시 테스트용 계정

  // ✅ Custom Hook을 통해 모든 데이터 로직 처리
  const { timeTables, lectureGrid, stats, loading } = useTimetableData(
    "my",
    userEmail
  );

  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [selectedLecture, setSelectedLecture] = useState(null);

  return (
    <div className="relative w-full bg-slate-50 p-6 font-sans text-slate-800 max-h-[75vh] overflow-y-auto">
      {/* 닫기 버튼 */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition"
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
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">📚 내 시간표</h1>
        <p className="text-sm text-slate-500">
          수강 신청된 과목의 강의 시간과 강의실을 확인합니다.
        </p>
      </header>

      {/* 통계 보드 */}
      <StatsBoard stats={stats} />

      {/* 뷰 모드 전환 */}
      <div className="mb-4 flex justify-end gap-2">
        {["grid", "list"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
              viewMode === mode
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            {mode === "grid" ? "그리드 보기" : "목록 보기"}
          </button>
        ))}
      </div>

      {/* 메인 컨텐츠 */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 animate-pulse">
          데이터를 불러오는 중입니다...
        </div>
      ) : viewMode === "grid" ? (
        <GridView gridData={lectureGrid} onSelect={setSelectedLecture} />
      ) : (
        <ListView data={timeTables} />
      )}

      {/* 하단 닫기 버튼 (옵션) */}
      {onClose && (
        <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
          <button
            onClick={onClose}
            className="bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-700 transition"
          >
            닫기
          </button>
        </div>
      )}

      {/* 상세 모달 */}
      <LectureDetailModal
        lecture={selectedLecture}
        onClose={() => setSelectedLecture(null)}
      />
    </div>
  );
}
