// src/components/professor/ProfessorMaterialUploadComponent.jsx
import React from "react";

export default function ProfessorMaterialUploadComponent() {
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormSelect
            label="주차"
            options={[
              "1주차",
              "2주차",
              "3주차",
              "4주차",
              "5주차",
            ]}
          />
          <FormInput
            label="자료 제목"
            placeholder="예: HTML 기본 문법 정리"
          />
        </div>

        <FormSelect
          label="자료 유형"
          options={["PDF", "PPT", "DOC", "ZIP", "기타"]}
        />
      </section>

      {/* ===== 파일 업로드 ===== */}
      <section>
        <label className="text-xs font-medium text-slate-600">
          파일 업로드
        </label>

        <div className="mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
          <p className="text-sm text-slate-600">
            파일을 여기에 끌어다 놓거나
          </p>
          <button
            type="button"
            className="mt-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100"
          >
            파일 선택
          </button>
          <p className="mt-2 text-[11px] text-slate-400">
            최대 100MB · PDF/PPT/DOC/ZIP
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
          업로드 (연결 후 활성화)
        </button>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 자료 업로드 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>업로드한 자료는 즉시 저장되며 공개 여부에 따라 학생에게 노출됩니다.</li>
          <li>파일명은 자동으로 정리되며 제목은 별도로 표시됩니다.</li>
          <li>대용량 파일은 업로드 시간이 소요될 수 있습니다.</li>
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
      <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
