// src/components/professor/ProfessorMaterialManagementComponent.jsx
import React from "react";

export default function ProfessorMaterialManagementComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 상단 제어 영역 ===== */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <label className="text-xs font-medium text-slate-600">
            강의 선택
          </label>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm md:w-60">
            <option>웹 프로그래밍 (01분반)</option>
            <option>데이터베이스 (02분반)</option>
            <option>운영체제 (01분반)</option>
          </select>
        </div>

        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
        >
          + 자료 업로드
        </button>
      </div>

      {/* ===== 자료 목록 ===== */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">주차</th>
              <th className="px-4 py-3 text-left font-medium">자료명</th>
              <th className="px-4 py-3 text-left font-medium">유형</th>
              <th className="px-4 py-3 text-center font-medium">공개</th>
              <th className="px-4 py-3 text-left font-medium">업로드일</th>
              <th className="px-4 py-3 text-center font-medium">관리</th>
            </tr>
          </thead>

          <tbody className="divide-y bg-white">
            <MaterialRow
              week="1주차"
              title="강의 OT 자료"
              type="PDF"
              visible
              date="2025-03-02"
            />
            <MaterialRow
              week="2주차"
              title="HTML 기본 문법"
              type="PPT"
              visible
              date="2025-03-09"
            />
            <MaterialRow
              week="3주차"
              title="CSS 레이아웃 정리"
              type="PDF"
              visible={false}
              date="2025-03-16"
            />
          </tbody>
        </table>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 자료 관리 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>비공개 자료는 학생에게 노출되지 않습니다.</li>
          <li>자료 수정 및 삭제는 업로드 후 가능합니다.</li>
          <li>파일 용량 및 형식 제한이 있을 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================
   자료 Row
========================= */
function MaterialRow({
  week,
  title,
  type,
  visible,
  date,
}) {
  return (
    <tr>
      <td className="px-4 py-3">{week}</td>
      <td className="px-4 py-3 font-medium text-slate-800">
        {title}
      </td>
      <td className="px-4 py-3">{type}</td>
      <td className="px-4 py-3 text-center">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            visible
              ? "bg-green-100 text-green-700"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          {visible ? "공개" : "비공개"}
        </span>
      </td>
      <td className="px-4 py-3">{date}</td>
      <td className="px-4 py-3 text-center space-x-2">
        <button className="text-xs text-blue-600 hover:underline">
          수정
        </button>
        <button className="text-xs text-red-500 hover:underline">
          삭제
        </button>
      </td>
    </tr>
  );
}
