// src/components/professor/ProfessorAssignmentRegisterComponent.jsx
import React from "react";

export default function ProfessorAssignmentRegisterComponent() {
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

        <FormInput
          label="과제 제목"
          placeholder="예: 과제 1 - HTML 기본 문법"
        />

        <FormTextarea
          label="과제 설명"
          placeholder="과제 목적, 제출 방법, 유의사항 등을 입력하세요."
          rows={3}
        />
      </section>

      {/* ===== 제출 기한 ===== */}
      <section className="space-y-4">
        <p className="text-xs font-medium text-slate-600">
          제출 기한
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="마감 날짜"
            type="date"
          />
          <FormInput
            label="마감 시간"
            type="time"
          />
        </div>
      </section>

      {/* ===== 첨부 파일 ===== */}
      <section>
        <label className="text-xs font-medium text-slate-600">
          첨부 자료 (선택)
        </label>

        <div className="mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
          <p className="text-sm text-slate-600">
            과제 설명 파일을 업로드할 수 있습니다.
          </p>
          <button
            type="button"
            className="mt-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100"
          >
            파일 선택
          </button>
          <p className="mt-2 text-[11px] text-slate-400">
            PDF / DOC / ZIP · 최대 100MB
          </p>
        </div>
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
          과제 등록 (연결 후 활성화)
        </button>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 과제 등록 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>과제 등록 후 학생에게 즉시 노출됩니다.</li>
          <li>제출 기한 이후 제출은 지각 처리됩니다.</li>
          <li>비공개 과제는 학생에게 보이지 않습니다.</li>
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

function FormTextarea({ label, placeholder, rows = 3 }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-600">
        {label}
      </label>
      <textarea
        rows={rows}
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
      <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
