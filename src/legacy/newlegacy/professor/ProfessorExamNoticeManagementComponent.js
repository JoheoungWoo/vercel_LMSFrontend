// src/components/professor/ProfessorExamNoticeManagementComponent.jsx
import React from "react";

export default function ProfessorExamNoticeManagementComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 강의 선택 ===== */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <label className="text-xs font-medium text-slate-600">
          강의 선택
        </label>
        <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm md:max-w-xs">
          <option>웹 프로그래밍 (01분반)</option>
          <option>데이터베이스 (02분반)</option>
          <option>운영체제 (01분반)</option>
        </select>
      </div>

      {/* ===== 공지 등록 버튼 ===== */}
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
        >
          + 시험 공지 등록
        </button>
      </div>

      {/* ===== 시험 공지 목록 ===== */}
      <div className="space-y-3">
        <ExamNoticeItem
          title="📌 중간고사 일정 안내"
          examType="중간고사"
          date="2025-04-20"
          range="1주차 ~ 7주차"
          place="공학관 302호"
          open
        />

        <ExamNoticeItem
          title="기말고사 범위 공지"
          examType="기말고사"
          date="2025-06-18"
          range="1주차 ~ 14주차"
          place="추후 공지"
          open={false}
        />
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 시험 공지 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>시험 일정 및 범위 변경 시 즉시 공지 바랍니다.</li>
          <li>비공개 상태의 공지는 학생에게 노출되지 않습니다.</li>
          <li>시험 관련 문의는 담당 교수에게 안내됩니다.</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================
   시험 공지 아이템
========================= */
function ExamNoticeItem({
  title,
  examType,
  date,
  range,
  place,
  open,
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        open
          ? "border-slate-200 bg-white"
          : "border-yellow-200 bg-yellow-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-800">
              {title}
            </p>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
              {examType}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            시험일: {date}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            시험 범위: {range}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            시험 장소: {place}
          </p>
        </div>

        <div className="text-right">
          <span
            className={`rounded-full px-2 py-1 text-[10px] font-medium ${
              open
                ? "bg-green-100 text-green-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {open ? "공개" : "비공개"}
          </span>
          <div className="mt-2 space-x-2">
            <button className="text-xs text-blue-600 hover:underline">
              수정
            </button>
            <button className="text-xs text-red-500 hover:underline">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
