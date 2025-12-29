import React, { useState } from "react";

const ExamScheduleManage = () => {
  // ───────────────── 시험 일정 더미 ─────────────────
  const [exams, setExams] = useState([
    {
      id: 1,
      type: "중간고사",
      date: "2025-10-20",
      time: "09:00 ~ 10:30",
      room: "IT관 301호",
    },
    {
      id: 2,
      type: "기말고사",
      date: "2025-12-15",
      time: "13:00 ~ 14:30",
      room: "IT관 301호",
    },
  ]);

  // ───────────────── 입력 상태 ─────────────────
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");

  // ───────────────── 시험 일정 추가 ─────────────────
  const handleAddExam = () => {
    if (!type || !date || !time || !room) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const newExam = {
      id: Date.now(),
      type,
      date,
      time,
      room,
    };

    setExams((prev) => [...prev, newExam]);

    // 입력 초기화
    setType("");
    setDate("");
    setTime("");
    setRoom("");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 강의별 시험 일정을 등록하고 학생에게 안내하는 화면입니다.
      </div>

      {/* 시험 일정 등록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          시험 일정 등록
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-[0.75rem] text-slate-600">
              시험 구분
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="중간고사 / 기말고사"
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-[0.75rem] text-slate-600">
              시험 날짜
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-[0.75rem] text-slate-600">
              시험 시간
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="09:00 ~ 10:30"
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-[0.75rem] text-slate-600">
              시험 장소
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="IT관 301호"
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddExam}
            className="rounded-md bg-sky-500 px-4 py-1.5 text-[0.8rem] font-medium text-white hover:bg-sky-600"
          >
            시험 일정 추가
          </button>
        </div>
      </div>

      {/* 시험 일정 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          시험 일정 목록
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
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
                    colSpan={4}
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
        ※ 실제 서비스에서는 시험 범위, 감독관, 좌석 배정,
        수정/삭제 기능이 추가됩니다.
      </p>
    </div>
  );
};

export default ExamScheduleManage;
