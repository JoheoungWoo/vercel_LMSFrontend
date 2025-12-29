import React, { useState, useEffect } from "react";

const INITIAL_FORM = {
  sectionId: "",
  classroomId: "",
  dayOfWeek: "MONDAY",
  startTime: "09:00:00",
  endTime: "10:00:00",
};
const DAY_MAP = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
};

export default function TimeTableFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  sectionList = [],
  classroomList = [],
}) {
  const [form, setForm] = useState(INITIAL_FORM);

  // 모달이 열릴 때 데이터 세팅 (수정 모드 vs 생성 모드)
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          timetableId: initialData.timetableId,
          sectionId: initialData.sectionId || "",
          classroomId: initialData.classroomId || "",
          dayOfWeek: initialData.dayOfWeek || "MONDAY",
          startTime: initialData.startTime || "09:00:00",
          endTime: initialData.endTime || "10:00:00",
        });
      } else {
        setForm(INITIAL_FORM);
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // 백엔드 Time 데이터 포맷 맞추기 (HH:mm:ss)
    const safeData = {
      ...form,
      startTime:
        form.startTime.length === 5 ? form.startTime + ":00" : form.startTime,
      endTime: form.endTime.length === 5 ? form.endTime + ":00" : form.endTime,
    };
    onSubmit(safeData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-xl font-bold text-slate-800">
          {initialData ? " 시간표 수정 " : " 시간표 등록"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              분반 (Section)
            </label>
            <select
              name="sectionId"
              value={form.sectionId}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            >
              <option value="">분반을 선택하세요</option>
              {sectionList.map((sec) => (
                <option
                  key={sec.sectionId || sec.id}
                  value={sec.sectionId || sec.id}
                >
                  {sec.courseName ? `[${sec.courseName}] ` : ""}
                  {sec.sectionName}
                  {sec.professorName ? ` (${sec.professorName})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              강의실 (Classroom)
            </label>
            <select
              name="classroomId"
              value={form.classroomId}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            >
              <option value="">강의실을 선택하세요</option>
              {classroomList.map((room) => (
                <option
                  key={room.classroomId || room.id}
                  value={room.classroomId || room.id}
                >
                  {room.location || room.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              요일
            </label>
            <select
              name="dayOfWeek"
              value={form.dayOfWeek}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            >
              {Object.keys(DAY_MAP).map((engDay) => (
                <option key={engDay} value={engDay}>
                  {DAY_MAP[engDay]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-slate-500">
                시작 시간
              </label>
              <input
                name="startTime"
                type="time"
                step="1"
                value={form.startTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-slate-500">
                종료 시간
              </label>
              <input
                name="endTime"
                type="time"
                step="1"
                value={form.endTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-bold text-white hover:bg-indigo-700"
          >
            {initialData ? "수정 완료" : "등록 하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
