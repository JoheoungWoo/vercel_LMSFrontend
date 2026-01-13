import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TimeTableFormModal from "./TimeTableFormModal";
import { useTimeTableManagement } from "../../../hook/timeTable/useTimeTableManagement";

// =============================================================================
// 메인 컴포넌트: 시간표 관리 (Admin/Professor 용)
// =============================================================================

const DAY_MAP = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
};

export default function TimeTableManager({ onClose }) {
  const userEmail =
    useSelector((state) => state.loginSlice?.email) || "admin@aaa.com";

  // 1. Hook 사용 (로직 분리됨)
  const {
    data,
    loading,
    offeringList,
    sectionList,
    classroomList,
    fetchTimeTables,
    createTimeTable,
    updateTimeTable,
    deleteTimeTable,
  } = useTimeTableManagement(userEmail);

  // 2. Local State
  const [searchMode, setSearchMode] = useState("all"); // all, offering, my
  const [keyword, setKeyword] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 3. 초기 데이터 로드
  useEffect(() => {
    fetchTimeTables("all");
  }, [fetchTimeTables]);

  // 4. 핸들러들
  const handleSearch = () => {
    fetchTimeTables(searchMode, keyword);
  };

  const handleOpenCreate = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    let success = false;
    if (selectedItem) {
      success = await updateTimeTable(formData); // T-5
    } else {
      success = await createTimeTable(formData); // T-4
    }

    if (success) {
      setIsModalOpen(false);
      handleSearch(); // 목록 갱신
    }
  };
  console.log("강의 목록 데이터 확인:", offeringList);
  return (
    <div className="relative w-full bg-slate-50 p-6 font-sans text-slate-800">
      {/* 닫기 버튼 */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
        >
          ✕
        </button>
      )}

      {/* 헤더 */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">시간표 통합 관리</h1>
        <p className="text-sm text-slate-500">
          전체 시간표를 조회, 등록, 수정, 삭제합니다.
        </p>
      </header>

      {/* 컨트롤 패널 (검색 & 등록) */}
      <div className="mb-6 flex flex-wrap gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <select
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">전체 조회 </option>
          <option value="offering">과목명으로 조회 </option>
          <option value="my">사용자 이메일로 조회 </option>
        </select>

        {searchMode === "offering" ? (
          <select
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">강의를 선택하세요</option>
            {offeringList.map((offering) => (
              <option key={offering.offeringId} value={offering.offeringId}>
                {/* 화면엔 이름이 보이고, 실제 값은 ID가 들어감 */}
                {offering.courseName} ({offering.professorName || "교수미정"})
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={
              searchMode === "all" ? "검색어 필요 없음" : "ID 또는 이메일 입력"
            }
            disabled={searchMode === "all"}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
          />
        )}

        <button
          onClick={handleSearch}
          className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700 transition"
        >
          조회
        </button>

        <button
          onClick={handleOpenCreate}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-bold text-white hover:bg-indigo-700 transition ml-auto"
        >
          시간표 신규 생성
        </button>
      </div>

      {/* 테이블 리스트 */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="py-20 text-center text-slate-400 animate-pulse">
            로딩 중...
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-bold">ID</th>
                <th className="px-4 py-3 font-bold">요일</th>
                <th className="px-4 py-3 font-bold">시간</th>
                <th className="px-4 py-3 font-bold">과목명</th>
                <th className="px-4 py-3 font-bold">분반 / 장소</th>
                <th className="px-4 py-3 font-bold text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.timetableId}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-3 text-slate-500">
                      {item.timetableId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                        {DAY_MAP[item.dayOfWeek] || item.dayOfWeek}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.startTime} ~ {item.endTime}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800">
                      {item.courseName}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {item.sectionName} / {item.classroomName}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-100 px-2 py-1 rounded hover:bg-blue-50"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteTimeTable(item.timetableId)} // T-6
                        className="text-red-600 hover:text-red-800 font-medium text-xs border border-red-100 px-2 py-1 rounded hover:bg-red-50"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* 등록/수정 모달 (여기서 폼이 열립니다) */}
      <TimeTableFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedItem}
        sectionList={sectionList}
        classroomList={classroomList}
      />
    </div>
  );
}
