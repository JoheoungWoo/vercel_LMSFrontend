// src/components/professor/ProfessorFacilitySupportRequestComponent.jsx
import React from "react";

export default function ProfessorFacilitySupportRequestComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 요청 유형 ===== */}
      <section className="space-y-4">
        <FormSelect
          label="시설 지원 유형"
          options={[
            "강의실 설비",
            "연구실 설비",
            "전기 / 조명",
            "냉·난방",
            "청결 / 환경",
            "기타 시설 요청",
          ]}
        />

        <FormInput
          label="요청 제목"
          placeholder="예: 강의실 빔프로젝터 화면 출력 불량"
        />
      </section>

      {/* ===== 위치 정보 ===== */}
      <section className="space-y-4">
        <p className="text-xs font-medium text-slate-600">
          위치 정보
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="건물명"
            placeholder="예: 공학관"
          />
          <FormInput
            label="호실"
            placeholder="예: 302호"
          />
        </div>
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

      {/* ===== 상세 내용 ===== */}
      <section>
        <FormTextarea
          label="문제 상세 설명"
          placeholder="문제 발생 시점, 현재 상태, 필요한 조치를 상세히 작성해주세요."
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
            현장 사진을 첨부하면 처리에 도움이 됩니다.
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
          시설 지원 요청 제출 (연결 후 활성화)
        </button>
      </div>

      {/* ===== 안내 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          💡 시설 지원 요청 안내
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>긴급 요청은 우선적으로 처리될 수 있습니다.</li>
          <li>정확한 위치 정보 제공 시 처리 속도가 빨라집니다.</li>
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
