// src/components/professor/ProfessorGeneralSupportRequestComponent.jsx
import React from "react";

export default function ProfessorGeneralSupportRequestComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 요청 유형 ===== */}
      <section className="space-y-4">
        <FormSelect
          label="지원 요청 유형"
          options={[
            "학사 행정 문의",
            "시스템 오류 신고",
            "강의 운영 지원",
            "시설 · 환경 요청",
            "기타",
          ]}
        />

        <FormInput
          label="요청 제목"
          placeholder="예: 강의실 프로젝터 작동 오류"
        />

        <FormTextarea
          label="요청 내용"
          placeholder="문제 상황, 발생 시간, 필요 조치 등을 상세히 작성해주세요."
          rows={4}
        />
      </section>

      {/* ===== 첨부 파일 ===== */}
      <section>
        <label className="text-xs font-medium text-slate-600">
          첨부 파일 (선택)
        </label>

        <div className="mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
          <p className="text-sm text-slate-600">
            관련 자료를 업로드할 수 있습니다.
          </p>
          <button
            type="button"
            className="mt-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100"
          >
            파일 선택
          </button>
          <p className="mt-2 text-[11px] text-slate-400">
            이미지 / PDF / DOC · 최대 50MB
          </p>
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
          요청 제출 (연결 후 활성화)
        </button>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 지원 요청 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>요청 접수 후 담당 부서에서 순차적으로 처리합니다.</li>
          <li>처리 상태는 ‘지원 요청 현황’에서 확인할 수 있습니다.</li>
          <li>긴급한 문제는 해당 부서로 직접 연락 바랍니다.</li>
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

function FormTextarea({ label, placeholder, rows = 4 }) {
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
