// src/components/professor/ProfessorExamScheduleRegisterComponent.jsx
import React from "react";

export default function ProfessorExamScheduleRegisterComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 기본 정보 ===== */}
      <section className="space-y-4">
        <FormSelect
          label="강의 선택"
          options={[
            "웹 프로그래밍 (01분반)",
            "데이터베이스 (02분반)",
            "운영체제 (01분반)",
          ]}
        />

        <FormSelect
          label="시험 유형"
          options={["중간고사", "기말고사", "퀴즈"]}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="시험 날짜"
            type="date"
          />
          <FormInput
            label="시험 시간"
            type="time"
          />
        </div>

        <FormInput
          label="시험 장소"
          placeholder="예: 공학관 302호"
        />
      </section>

      {/* ===== 시험 범위 ===== */}
      <section>
        <label className="text-xs font-medium text-slate-600">
          시험 범위
        </label>
        <textarea
          rows={3}
          placeholder="예: 1주차 ~ 7주차 / 교재 1~4장"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </section>

      {/* ===== 공개 여부 ===== */}
      <section className="space-y-2">
        <p className="text-xs font-medium text-slate-600">
          공개 여부
        </p>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="open" defaultChecked />
            공개
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="open" />
            비공개
          </label>
        </div>
      </section>

      {/* ===== 하단 버튼 ===== */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-4 py-2 text-xs"
        >
          취소
        </button>
        <button
          type="button"
          disabled
          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white opacity-60"
        >
          등록 (폼 연결 후 활성화)
        </button>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 시험 일정 등록 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>시험 일정 등록 후 학생에게 공지됩니다.</li>
          <li>비공개 설정 시 학생에게 노출되지 않습니다.</li>
          <li>시험 일정 변경 시 반드시 재공지 바랍니다.</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================
   공통 입력 컴포넌트
========================= */
function FormInput({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-600">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function FormSelect({ label, options }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-600">
        {label}
      </label>
      <select
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
