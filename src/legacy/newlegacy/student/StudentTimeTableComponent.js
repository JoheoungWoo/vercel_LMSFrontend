import React, { useEffect, useState, useMemo } from "react";
// ✅ 1. 설계 원칙 준수: 공통 API 모듈 사용 (TimeTableApi)
import TimeTableApi from "../../api/TimeTableApi";

// --- 요일 변환 및 정렬 헬퍼 ---
const DAY_MAP = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
};

const DAY_ORDER = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

export default function StudentTimeTableComponent({ onClose }) {
  const [timeTables, setTimeTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // 필터 State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("ALL");

  // TODO: 실제 로그인한 유저 이메일로 변경 필요
  const userEmail = "student@aaa.com";

  useEffect(() => {
    fetchMyTimeTables();
  }, []);

  // ✅ [핵심] findByKeyword를 재활용하여 "/api/time/my/{email}" 호출
  const fetchMyTimeTables = async () => {
    setLoading(true);
    try {
      // TimeTableApi의 tableName은 "time"으로 설정되어 있다고 가정
      // URL: /api/time/my/{userEmail}
      const data = await TimeTableApi.config.funcs.findByKeyword(
        "my",
        userEmail
      );

      // 데이터가 있으면 요일순 -> 시간순 정렬
      const sortedData = (Array.isArray(data) ? data : []).sort((a, b) => {
        // 1. 요일 정렬
        const dayDiff =
          (DAY_ORDER[a.dayOfWeek] || 99) - (DAY_ORDER[b.dayOfWeek] || 99);
        if (dayDiff !== 0) return dayDiff;
        // 2. 시간 정렬 (startTime 기준)
        return (a.startTime || "").localeCompare(b.startTime || "");
      });

      setTimeTables(sortedData);
    } catch (error) {
      console.error("시간표 조회 실패:", error);
      setTimeTables([]);
    } finally {
      setLoading(false);
    }
  };

  // --- 필터링 로직 ---
  const filteredList = useMemo(() => {
    return timeTables.filter((t) => {
      // 과목명 검색
      const matchesSearch = (t.courseName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // 요일 필터
      const matchesDay = selectedDay === "ALL" || t.dayOfWeek === selectedDay;

      return matchesSearch && matchesDay;
    });
  }, [timeTables, searchTerm, selectedDay]);

  // --- 통계 (총 수업 수) ---
  const totalClasses = timeTables.length;
  // 고유 과목 수 계산
  const uniqueCourses = new Set(timeTables.map((t) => t.courseName)).size;

  return (
    <div className="relative w-full bg-slate-50 p-6 font-sans text-slate-800">
      {/* 🔴 모달 닫기 버튼 */}
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
        <h1 className="text-2xl font-bold text-slate-900">내 시간표 조회</h1>
        <p className="text-sm text-slate-500">
          수강 신청된 과목의 강의 시간과 강의실을 확인합니다.
        </p>
      </header>

      {/* 요약 카드 */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="text-sm text-slate-500">수강 과목 수</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">
            {uniqueCourses}개
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="text-sm text-slate-500">주간 수업 횟수</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">
            {totalClasses}회
          </div>
        </div>
      </div>

      {/* 필터바 */}
      <div className="mb-4 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">강의 목록</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {filteredList.length}
          </span>
        </div>
        <div className="flex gap-2">
          <select
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="ALL">전체 요일</option>
            <option value="MONDAY">월요일</option>
            <option value="TUESDAY">화요일</option>
            <option value="WEDNESDAY">수요일</option>
            <option value="THURSDAY">목요일</option>
            <option value="FRIDAY">금요일</option>
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
              <th className="px-6 py-3 font-medium">요일</th>
              <th className="px-6 py-3 font-medium">시간</th>
              <th className="px-6 py-3 font-medium">교과목명</th>
              <th className="px-6 py-3 font-medium">분반</th>
              <th className="px-6 py-3 font-medium">강의실</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-400">
                  로딩 중...
                </td>
              </tr>
            ) : filteredList.length > 0 ? (
              filteredList.map((t, idx) => (
                <tr key={t.timetableId || idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-md px-2 py-1 text-xs font-bold 
                      ${
                        t.dayOfWeek === "MONDAY"
                          ? "bg-yellow-100 text-yellow-700"
                          : t.dayOfWeek === "TUESDAY"
                          ? "bg-orange-100 text-orange-700"
                          : t.dayOfWeek === "WEDNESDAY"
                          ? "bg-green-100 text-green-700"
                          : t.dayOfWeek === "THURSDAY"
                          ? "bg-blue-100 text-blue-700"
                          : t.dayOfWeek === "FRIDAY"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-100"
                      }`}
                    >
                      {DAY_MAP[t.dayOfWeek] || t.dayOfWeek}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {t.startTime ? t.startTime.substring(0, 5) : ""} ~{" "}
                    {t.endTime ? t.endTime.substring(0, 5) : ""}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {t.courseName}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{t.sectionName}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {t.classroomName || "미정"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-400">
                  시간표가 없습니다.
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
