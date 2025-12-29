// src/components/professor/ProfessorAssignmentSubmissionStatusComponent.jsx
import React from "react";

export default function ProfessorAssignmentSubmissionStatusComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 상단 선택 ===== */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <label className="text-xs font-medium text-slate-600">
            강의 선택
          </label>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm md:w-56">
            <option>웹 프로그래밍 (01분반)</option>
            <option>데이터베이스 (02분반)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <label className="text-xs font-medium text-slate-600">
            과제 선택
          </label>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm md:w-56">
            <option>과제 1 - HTML 기본</option>
            <option>과제 2 - CSS 레이아웃</option>
          </select>
        </div>
      </div>

      {/* ===== 요약 ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <SummaryCard title="전체 학생" value="30명" />
        <SummaryCard title="제출 완료" value="24명" highlight />
        <SummaryCard title="미제출" value="4명" />
        <SummaryCard title="지각 제출" value="2명" />
      </div>

      {/* ===== 제출 현황 테이블 ===== */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">학생</th>
              <th className="px-4 py-3 text-left font-medium">학번</th>
              <th className="px-4 py-3 text-left font-medium">제출 파일</th>
              <th className="px-4 py-3 text-center font-medium">제출 시간</th>
              <th className="px-4 py-3 text-center font-medium">상태</th>
            </tr>
          </thead>

          <tbody className="divide-y bg-white">
            <SubmissionRow
              name="김유라"
              studentId="20201234"
              file="assignment1.zip"
              time="2025-04-01 22:10"
              status="SUBMITTED"
            />
            <SubmissionRow
              name="박민수"
              studentId="20201235"
              file="assignment1.zip"
              time="2025-04-02 00:30"
              status="LATE"
            />
            <SubmissionRow
              name="이서연"
              studentId="20201236"
              status="NOT_SUBMITTED"
            />
          </tbody>
        </table>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 학생 제출 현황 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>제출 마감 시간 이후 제출 시 지각 제출로 표시됩니다.</li>
          <li>미제출 학생은 과제 평가 대상에서 제외될 수 있습니다.</li>
          <li>제출 파일 클릭 시 다운로드가 가능합니다.</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================
   요약 카드
========================= */
function SummaryCard({ title, value, highlight }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-indigo-200 bg-indigo-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-xs font-medium text-slate-500">
        {title}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* =========================
   제출 Row
========================= */
function SubmissionRow({
  name,
  studentId,
  file,
  time,
  status,
}) {
  const statusMap = {
    SUBMITTED: {
      label: "제출 완료",
      badge: "bg-green-100 text-green-700",
    },
    LATE: {
      label: "지각 제출",
      badge: "bg-yellow-100 text-yellow-700",
    },
    NOT_SUBMITTED: {
      label: "미제출",
      badge: "bg-red-100 text-red-700",
    },
  };

  const current = statusMap[status];

  return (
    <tr>
      <td className="px-4 py-3 font-medium text-slate-800">
        {name}
      </td>
      <td className="px-4 py-3">{studentId}</td>
      <td className="px-4 py-3">
        {file ? (
          <button className="text-xs text-blue-600 hover:underline">
            {file}
          </button>
        ) : (
          <span className="text-xs text-slate-400">
            -
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-center">
        {time || "-"}
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${current.badge}`}
        >
          {current.label}
        </span>
      </td>
    </tr>
  );
}
