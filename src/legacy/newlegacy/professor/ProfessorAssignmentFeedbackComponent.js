// src/components/professor/ProfessorAssignmentFeedbackComponent.jsx
import React from "react";

export default function ProfessorAssignmentFeedbackComponent() {
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

      {/* ===== 제출 목록 ===== */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                학생
              </th>
              <th className="px-4 py-3 text-left font-medium">
                제출 파일
              </th>
              <th className="px-4 py-3 text-center font-medium">
                점수
              </th>
              <th className="px-4 py-3 text-left font-medium">
                피드백
              </th>
              <th className="px-4 py-3 text-center font-medium">
                상태
              </th>
            </tr>
          </thead>

          <tbody className="divide-y bg-white">
            <FeedbackRow
              student="김유라"
              file="assignment1.zip"
              status="SUBMITTED"
            />
            <FeedbackRow
              student="박민수"
              file="assignment1.zip"
              status="GRADED"
              score="92"
            />
          </tbody>
        </table>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 과제 피드백 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>점수와 피드백 입력 후 평가 완료 상태로 변경됩니다.</li>
          <li>평가 완료 시 학생에게 즉시 반영됩니다.</li>
          <li>제출 파일은 다운로드 후 검토하세요.</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================
   과제 피드백 Row
========================= */
function FeedbackRow({ student, file, score, status }) {
  const statusMap = {
    SUBMITTED: {
      label: "제출 완료",
      badge: "bg-yellow-100 text-yellow-700",
    },
    GRADED: {
      label: "평가 완료",
      badge: "bg-green-100 text-green-700",
    },
  };

  return (
    <tr>
      <td className="px-4 py-3 font-medium text-slate-800">
        {student}
      </td>
      <td className="px-4 py-3">
        <button className="text-xs text-blue-600 hover:underline">
          {file}
        </button>
      </td>
      <td className="px-4 py-3 text-center">
        <input
          type="number"
          defaultValue={score}
          placeholder="점수"
          className="w-20 rounded-md border border-slate-200 px-2 py-1 text-sm text-center"
        />
      </td>
      <td className="px-4 py-3">
        <textarea
          rows={2}
          placeholder="피드백 입력"
          className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs"
        />
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${statusMap[status].badge}`}
        >
          {statusMap[status].label}
        </span>
      </td>
    </tr>
  );
}
