// src/components/professor/ProfessorITSupportRequestComponent.jsx
import React from "react";

export default function ProfessorITSupportRequestComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 요청 유형 ===== */}
      <section className="space-y-4">
        <FormSelect
          label="IT 지원 유형"
          options={[
            "시스템 오류",
            "LMS 접속 문제",
            "계정 / 권한 문제",
            "강의실 장비 오류",
            "기타 IT 문의",
          ]}
        />

        <FormInput
          label="요청 제목"
          placeholder="예: LMS 로그인 시 오류 발생"
        />
      </section>

      {/* ===== 긴급도 ===== */}
      <section className="space-y-2">
        <p className="text-xs font-medium text-slate-600">
          긴급도
        </p>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="priority" defaultChecked />
            일반
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="priority" />
            긴급
          </label>
        </div>
      </section>

      {/* ===== 환경 정보 ===== */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormSelect
            label="운영체제"
            options={["Windows", "macOS", "Linux", "기타"]}
          />
          <FormInput
            label="브라우저"
            placeholder="예: Chrome 120 / Edge"
          />
        </div>

        <FormInput
          label="장비 정보"
          placeholder="예: 강의실 PC / 개인 노트북"
        />
      </section>

      {/* ===== 상세 내용 ===== */}
      <section>
        <FormTextarea
          label="문제 상세 설명"
          placeholder="문제 발생 시점, 오류 메시지, 재현 방법 등을 구체적으로 작성해주세요."
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
            오류 화면 캡처를 첨부하면 처리 속도가 빨라집니다.
          </p>
          <button
            type="button"
            className="mt-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100"
          >
            파일 선택
          </button>
          <p className="mt-2 text-[11px] text-slate-400">
            이미지 / PDF · 최대 20MB
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
          IT 지원 요청 제출 (연결 후 활성화)
        </button>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 IT 지원 요청 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>긴급 요청은 우선 처리될 수 있습니다.</li>
          <li>정확한 환경 정보 제공 시 처리 시간이 단축됩니다.</li>
          <li>요청 상태는 ‘지원 요청 현황’에서 확인 가능합니다.</li>
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
