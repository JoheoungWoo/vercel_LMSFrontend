// src/layouts/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-sky-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-1 px-4 py-2 text-xs text-slate-700 sm:flex-row sm:gap-4 sm:text-sm">
        {/* 학교 이름 */}
        <div className="font-semibold text-slate-900">그린대학교</div>

        {/* 주소 + 전화번호 (가로 정렬, 모바일에선 세로 정렬) */}
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
          <span>경기 성남시 분당구 돌마로 46</span>
          <span className="whitespace-nowrap">대표전화: 031-123-4567</span>
        </div>
      </div>
    </footer>
  );
}
