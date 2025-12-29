import React, { useState } from "react";

const AttendanceManage = () => {
  // ───────────────── 강의 정보 (더미) ─────────────────
  const classInfo = {
    courseName: "웹 프로그래밍",
    date: "2025-09-18",
  };

  // ───────────────── 학생 출석 더미 ─────────────────
  const initialStudents = [
    { id: 1, studentId: "20250001", name: "김학생", status: "출석" },
    { id: 2, studentId: "20250002", name: "이예제", status: "출석" },
    { id: 3, studentId: "20250003", name: "박테스트", status: "지각" },
    { id: 4, studentId: "20250004", name: "최샘플", status: "결석" },
  ];

  const [students, setStudents] = useState(initialStudents);

  // ───────────────── 출석 상태 변경 ─────────────────
  const handleStatusChange = (id, value) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: value } : s
      )
    );
  };

  // ───────────────── 저장 (더미) ─────────────────
  const handleSave = () => {
    alert("출석 정보가 저장되었습니다. (더미)");
    console.log("저장된 출석 데이터:", students);
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 오늘 수업의 출석 상태를 기록하는 화면입니다.
      </div>

      {/* 수업 정보 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-3">
        <h3 className="font-semibold text-slate-800">
          출석 관리
        </h3>
        <p className="mt-1 text-[0.75rem] text-slate-500">
          과목: {classInfo.courseName} · 날짜: {classInfo.date}
        </p>
      </div>

      {/* 출석 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
              <th className="px-2 py-2">학번</th>
              <th className="px-2 py-2">이름</th>
              <th className="px-2 py-2 text-center">출석 상태</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr
                key={s.id}
                className={`border-b border-slate-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <td className="px-2 py-1.5 text-slate-700">
                  {s.studentId}
                </td>
                <td className="px-2 py-1.5 text-slate-800">
                  {s.name}
                </td>
                <td className="px-2 py-1.5 text-center">
                  <select
                    value={s.status}
                    onChange={(e) =>
                      handleStatusChange(s.id, e.target.value)
                    }
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.75rem] focus:outline-none focus:ring-1 focus:ring-sky-400"
                  >
                    <option value="출석">출석</option>
                    <option value="지각">지각</option>
                    <option value="결석">결석</option>
                  </select>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-2 py-4 text-center text-slate-400"
                >
                  학생이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-md bg-emerald-500 px-4 py-1.5 text-[0.8rem] font-medium text-white hover:bg-emerald-600"
        >
          출석 저장
        </button>
      </div>

      {/* 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 출석 수정 제한, 결석 사유 승인 여부 반영,
        자동 출석 계산이 서버에서 처리됩니다.
      </p>
    </div>
  );
};

export default AttendanceManage;
