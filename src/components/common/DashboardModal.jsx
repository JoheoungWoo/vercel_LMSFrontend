import React from "react";

/* =========================
   Dashboard Modal
========================= */
export function DashboardModal({ activeModal, onClose, renderModalContent }) {
  if (!activeModal) return null;

  const { title, subtitle, content } = renderModalContent(activeModal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* ✅ 학생쪽과 동일한 크기/구조 */}
      <div className="w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* 헤더 (고정) */}
        <div className="px-6 py-4 border-b bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition p-1 hover:bg-slate-200 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* 바디 (스크롤) */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4">{content}</div>
      </div>
    </div>
  );
}
