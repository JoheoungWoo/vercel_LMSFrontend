import React from "react";

const ExamScheduleView = () => {
  // ───────────────── 시험 일정 더미 (조회 전용) ─────────────────
  const exams = [
    {
      id: 1,
      courseName: "웹 프로그래밍",
      type: "중간고사",
      date: "2025-10-20",
      time: "09:00 ~ 10:30",
      room: "IT관 301호",
    },
    {
      id: 2,
      courseName: "웹 프로그래밍",
      type: "기말고사",
      date: "2025-12-15",
      time: "13:00 ~ 14:30",
      room: "IT관 301호",
    },
  ];

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 수강 중인 과목의 시험 일정을 확인할 수 있습니다.
      </div>

      {/* 시험 일정 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          시험 일정
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">과목</th>
                <th className="px-2 py-2">구분</th>
                <th className="px-2 py-2">날짜</th>
                <th className="px-2 py-2">시간</th>
                <th className="px-2 py-2">장소</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e, idx) => (
                <tr
                  key={e.id}
                  className={`border-b border-slate-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="px-2 py-2 text-slate-800">
                    {e.courseName}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {e.type}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {e.date}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {e.time}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {e.room}
                  </td>
                </tr>
              ))}
              {exams.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    등록된 시험 일정이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 시험 일정은 학교 사정에 따라 변경될 수 있으며,
        변경 시 공지를 통해 안내됩니다.
      </p>
    </div>
  );
};

export default ExamScheduleView;
