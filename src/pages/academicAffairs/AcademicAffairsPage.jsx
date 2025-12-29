// src/pages/academicAffairs/AcademicAffairsHomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AcademicAffairsHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-emerald-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* 상단 헤더 */}
        <header className="mb-8">
          <p className="text-xs font-medium tracking-[0.2em] text-emerald-500 uppercase">
            Academic Affairs
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            학사행정 · 학적 · 증명 · 재정
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            학점관리, 학위증명 관련 기능을 선택하세요.
          </p>
        </header>

        {/* 메인 선택 카드 영역 */}
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* 학점관리 카드 */}
          <Link
            to="/academicaffairs/creditmanagement"
            className="group flex flex-col justify-between rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold text-emerald-500">
                CREDIT
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                학점 관리
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                학기별 성적 조회, 누적 평점, 전공/교양 이수 학점 현황을 확인합니다.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                성적/학점 현황
              </span>
              <span className="text-[0.7rem] text-slate-400 group-hover:text-emerald-500">
                바로가기 →
              </span>
            </div>
          </Link>

          {/* 학위증명 카드 */}
          <Link
            to="/academicaffairs/degreecertificates"
            className="group flex flex-col justify-between rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold text-sky-500">
                CERTIFICATES
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                학위 · 재학 · 성적 증명
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                학위증명서, 재학증명서, 성적증명서 등 각종 증명서를 온라인으로
                발급합니다. (더미 UI)
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                온라인 발급
              </span>
              <span className="text-[0.7rem] text-slate-400 group-hover:text-sky-500">
                바로가기 →
              </span>
            </div>
          </Link>

          {/* 더미 카드: 재정/등록금 */}
          <div className="flex flex-col justify-between rounded-2xl border border-indigo-100 bg-white/70 p-5 text-xs shadow-sm backdrop-blur">
            <div>
              <p className="text-xs font-semibold text-indigo-500">
                FINANCE (DUMMY)
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                등록금 · 장학 · 납부 내역
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                등록금 고지서, 납부 내역, 장학금 수혜 내역 등을 조회하는 메뉴입니다.
                현재는 더미 설명만 표시됩니다.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
                준비 중
              </span>
              <span className="text-[0.7rem] text-slate-400">
                추후 오픈 예정
              </span>
            </div>
          </div>

          {/* 더미 카드: 학적(휴학/복학) */}
          <div className="flex flex-col justify-between rounded-2xl border border-rose-100 bg-white/70 p-5 text-xs shadow-sm backdrop-blur">
            <div>
              <p className="text-xs font-semibold text-rose-500">
                STATUS (DUMMY)
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                학적 관리 (휴학 · 복학)
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                휴학 신청, 복학 신청, 제적/재입학 등 학적 변동 관련 메뉴입니다.
                포트폴리오용 더미 설명으로만 구성되어 있습니다.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-700">
                정보 안내만
              </span>
              <span className="text-[0.7rem] text-slate-400">
                기능 미구현
              </span>
            </div>
          </div>

          {/* 안내 카드 */}
          <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-xs text-slate-600">
            <p className="text-sm font-semibold text-slate-900">
              사용 안내 (포트폴리오 더미 페이지)
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>
                <span className="font-medium text-emerald-700">학점 관리</span>와{" "}
                <span className="font-medium text-sky-700">학위 · 재학 · 성적 증명</span>
                메뉴는 실제 React 페이지로 연결됩니다.
              </li>
              <li>
                재정/학적 관련 카드는 현재 UI 더미용이며, 추후 API 연동 시 확장
                가능한 구조입니다.
              </li>
              <li>
                이 페이지는 학사행정 모듈의 &quot;허브&quot; 역할을 하며, 사용자가
                직관적으로 메뉴를 선택할 수 있도록 설계되었습니다.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
