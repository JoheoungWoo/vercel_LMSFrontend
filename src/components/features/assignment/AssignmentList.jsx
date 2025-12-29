import React, { useState } from "react";

const AssignmentList = () => {
  // ───────────────── 과제 더미 ─────────────────
  const [assignments] = useState([
    {
      id: 1,
      title: "과제 1 - 개인 웹 페이지 제작",
      week: 3,
      dueDate: "2025-09-22",
      status: "진행 중", // 진행 중 | 마감 | 예정
      submitted: 39,
      total: 42,
    },
    {
      id: 2,
      title: "과제 2 - JavaScript 이벤트 처리",
      week: 5,
      dueDate: "2025-10-01",
      status: "예정",
      submitted: 0,
      total: 42,
    },
    {
      id: 3,
      title: "과제 0 - OT 사전 설문",
      week: 1,
      dueDate: "2025-09-05",
      status: "마감",
      submitted: 42,
      total: 42,
    },
  ]);

  // ───────────────── 상태 뱃지 색상 ─────────────────
  const statusColor = (status) => {
    if (status === "진행 중")
      return "bg-emerald-50 text-emerald-700";
    if (status === "마감") return "bg-slate-200 text-slate-600";
    return "bg-sky-50 text-sky-700";
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 해당 강의에 등록된 과제 목록입니다. 과제 공지, 제출 현황 및 피드백
        관리가 가능합니다.
      </div>

      {/* 상단 액션 */}
      <div className="flex flex-wrap gap-2 text-[0.75rem]">
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          새 과제 등록 (더미)
        </button>
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          주차 필터 (더미)
        </button>
      </div>

      {/* 과제 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
              <th className="px-2 py-2">과제명</th>
              <th className="px-2 py-2">주차</th>
              <th className="px-2 py-2">마감일</th>
              <th className="px-2 py-2 text-center">제출</th>
              <th className="px-2 py-2 text-center">상태</th>
              <th className="px-2 py-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, idx) => (
              <tr
                key={a.id}
                className={`border-b border-slate-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <td className="px-2 py-2 align-middle">
                  <p className="font-medium text-slate-800">{a.title}</p>
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {a.week}주차
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {a.dueDate}
                </td>
                <td className="px-2 py-2 text-center align-middle text-slate-700">
                  {a.submitted} / {a.total}
                </td>
                <td className="px-2 py-2 text-center align-middle">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.7rem] ${statusColor(
                      a.status
                    )}`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-2 py-2 text-center align-middle">
                  <button className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50">
                    상세
                  </button>
                </td>
              </tr>
            ))}
            {assignments.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-2 py-4 text-center text-slate-400"
                >
                  등록된 과제가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ “상세” 버튼 클릭 시 과제 설명, 제출 파일 목록, 학생별 제출 상태 및
        피드백 관리 화면으로 확장하는 구조를 권장합니다.
      </p>
    </div>
  );
};

export default AssignmentList;
