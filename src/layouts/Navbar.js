import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useResponsiveSidebar } from "../hook/useResponsiveSiderbar";

export default function Navbar({ subHeader }) {
  const sections = Array.isArray(subHeader) ? subHeader : [];
  const {isOpen,toggle} = useResponsiveSidebar();
  return (
    <>
      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={() => toggle((prev) => !prev)}
        className="
          fixed left-4 top-1/2 -translate-y-1/2 z-50
          h-10 w-10 flex items-center justify-center
          rounded-2xl bg-white/90 backdrop-blur
          shadow border border-sky-100
        "
      >
        ✕
      </button>
      

      {/* 사이드바 */}
      <aside
        className={`
          fixed left-6 top-1/2 -translate-y-1/2 z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-[120%]"}
        `}
      >
        <nav
          className="
            w-64 max-h-[80vh]
            bg-white/95 backdrop-blur
            rounded-2xl shadow
            border border-sky-100
            px-4 py-4 space-y-3
          "
        >
          {sections.map((section) => (
            <Link
              key={section.label}
              to={section.to || "#"}
              className="
                block text-center
                text-[0.85rem] font-semibold
                px-3 py-2 rounded-xl
                bg-gradient-to-r from-sky-50 to-sky-100
                text-sky-800
                hover:from-orange-50 hover:to-orange-100
                hover:text-orange-600
                transition-colors
              "
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
