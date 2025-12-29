import React, { useState } from "react";

const TimetableManage = () => {
  // ───────────────── 시간표 더미 ─────────────────
  const [timetables] = useState([
    {
      id: 1,
      courseCode: "CS301",
      courseName: "웹 프로그래밍",
      professor: "김교수",
      day: "월",
      time: "09:00 ~ 10:15",
      room: "IT관 301호",
      semester: "2025-2학기",
      status: "운영 중",
    },
    {
      id: 2,
      courseCode: "CS301",
      courseName: "웹 프로그래밍",
      professor: "김교수",
      day: "수",
      time: "09:00 ~ 10:15",
      room: "IT관 301호",
      semester: "2025-2학기",
      status: "운영 중",
    },
    {
      id: 3,
      courseCode: "CS205",
      courseName: "자료구조",
      professor: "이교수",
      day: "화",
      time: "13:00 ~ 14:15",
      room: "공학관 204호",
      semester: "2025-2학기",
      status: "운영 중",
    },
    {
      id: 4,
      courseCode: "CS410",
      courseName: "React 심화",
      professor: "박교수",
      day: "금",
      time: "10:00 ~ 12:50",
      room: "IT관 402호",
      semester: "2025-1학기",
      status: "종료",
    },
  ]);

  // ───────────────── 상태 뱃지 색상 ─────────────────
  const statusColor = (status) => {
    if (status === "운영 중")
      return "bg-emerald-50 text-emerald-700";
    if (status === "종료") return "bg-slate-200 text-slate-600";
    return "bg-sky-50 text-sky-700";
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 학기별 강의 시간표 목록입니다. 강의 시간, 요일, 강의실 정보를
        관리할 수 있습니다.
      </div>

      {/* 상단 액션 */}
      <div className="flex flex-wrap gap-2 text-[0.75rem]">
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          시간표 등록 (더미)
        </button>
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          강의실 배정 관리 (더미)
        </button>
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          학기 필터 (더미)
        </button>
      </div>

      {/* 시간표 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
              <th className="px-2 py-2">과목</th>
              <th className="px-2 py-2">담당교수</th>
              <th className="px-2 py-2">요일</th>
              <th className="px-2 py-2">시간</th>
              <th className="px-2 py-2">강의실</th>
              <th className="px-2 py-2">학기</th>
              <th className="px-2 py-2 text-center">상태</th>
              <th className="px-2 py-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((t, idx) => (
              <tr
                key={t.id}
                className={`border-b border-slate-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <td className="px-2 py-2 align-middle">
                  <p className="font-medium text-slate-800">
                    {t.courseName}
                  </p>
                  <p className="text-[0.7rem] text-slate-500">
                    {t.courseCode}
                  </p>
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {t.professor}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {t.day}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {t.time}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {t.room}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {t.semester}
                </td>
                <td className="px-2 py-2 text-center align-middle">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.7rem] ${statusColor(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-2 py-2 text-center align-middle">
                  <button className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50">
                    수정
                  </button>
                </td>
              </tr>
            ))}
            {timetables.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-2 py-4 text-center text-slate-400"
                >
                  등록된 시간표가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 시간 중복, 강의실 중복, 교수 일정 충돌 여부를
        서버에서 검증하는 구조를 권장합니다.
      </p>
    </div>
  );
};

export default TimetableManage;
