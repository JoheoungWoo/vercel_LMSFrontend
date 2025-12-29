// src/components/modal/ModalLayout.jsx
import React from "react";

const MODE_STYLE = {
  modal: {
    width: "80%",
    height: "80vh",
  },
  modalLg: {
    width: "90%",
    height: "90vh",
  },
  modalSm: {
    width: "60%",
    height: "60vh",
  },
};

export default function ModalLayout({
  mode = "modal",   
  title,
  subtitle,
  onClose,
  children,
}) {
  const size = MODE_STYLE[mode] ?? MODE_STYLE.modal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal box */}
      <div
        className="relative z-10 flex flex-col rounded-2xl bg-white shadow-xl border border-slate-200"
        style={{
          width: size.width,
          height: size.height,
        }}
      >
        {/* header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* ⭐ 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
