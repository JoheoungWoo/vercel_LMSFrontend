import React, { useState } from "react";

const AuthSecurityMainPage = () => {
  // 더미 상태 (보안 요약용)
  const [twoFactorEnabled] = useState(true);
  const [lastLogin] = useState({
    time: "2025-11-23 10:12",
    device: "Chrome · Windows",
    location: "Seoul, Korea",
  });

  const securityLevel = twoFactorEnabled ? "높음" : "보통";
  const securityLevelDesc = twoFactorEnabled
    ? "2단계 인증이 활성화되어 있어 계정 보안 수준이 높습니다."
    : "2단계 인증 설정으로 보안 수준을 높일 수 있습니다.";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            인증 · 계정 보안
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            비밀번호, 2단계 인증, 로그인 이력, 계정 활동 기록 등을 한 곳에서 관리합니다.
          </p>
        </header>

        {/* 상단 보안 요약 카드 */}
        <section className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <p className="text-xs text-slate-500">계정 보안 등급</p>
            <p className="mt-1 text-lg font-semibold text-slate-800">
              {securityLevel}
            </p>
            <p className="mt-1 text-[0.75rem] text-slate-500">
              {securityLevelDesc}
            </p>
            <a
              href="/account/security"
              className="mt-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-[0.75rem] text-slate-700 shadow-sm hover:bg-slate-50"
            >
              상세 보안 설정 보기
            </a>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <p className="text-xs text-slate-500">최근 로그인</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {lastLogin.time}
            </p>
            <p className="mt-1 text-[0.75rem] text-slate-500">
              {lastLogin.device} · {lastLogin.location}
            </p>
            <a
              href="/account/security#login-history"
              className="mt-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-[0.75rem] text-slate-700 shadow-sm hover:bg-slate-50"
            >
              로그인 이력 확인
            </a>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <p className="text-xs text-slate-500">비밀번호 상태</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              마지막 변경: 2025-10-10
            </p>
            <p className="mt-1 text-[0.75rem] text-slate-500">
              3개월마다 비밀번호를 변경하는 것을 권장합니다.
            </p>
            <a
              href="/account/reset-password"
              className="mt-3 inline-flex items-center rounded-md bg-sky-500 px-3 py-1.5 text-[0.75rem] font-medium text-white shadow-sm hover:bg-sky-600"
            >
              비밀번호 재설정
            </a>
          </div>
        </section>

        {/* 메인 카드 그리드 */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* 1. 비밀번호 & 재설정 */}
          <article className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              비밀번호 관리
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              현재 비밀번호를 변경하거나, 계정에 접근할 수 없을 때 재설정할 수 있습니다.
            </p>

            <ul className="mt-3 space-y-1.5 text-[0.8rem] text-slate-600">
              <li>· 주기적인 비밀번호 변경으로 계정 탈취 위험을 줄일 수 있습니다.</li>
              <li>· 다른 서비스와 동일한 비밀번호 사용은 피하는 것을 추천합니다.</li>
            </ul>

            <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                비밀번호 변경 (로그인 상태)
              </button>
              <a
                href="/reset-password"
                className="inline-flex items-center rounded-md border border-sky-500 bg-sky-50 px-3 py-1.5 text-sky-700 shadow-sm hover:bg-sky-100"
              >
                비밀번호 재설정 페이지로 이동
              </a>
            </div>
          </article>

          {/* 2. 2단계 인증 / 로그인 알림 */}
          <article className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              2단계 인증 · 로그인 알림
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              로그인 시 추가 인증을 요구하거나, 낯선 로그인 기록에 대한 알림을 설정할 수 있습니다.
            </p>

            <ul className="mt-3 space-y-1.5 text-[0.8rem] text-slate-600">
              <li>· 인증 앱(OTP)을 사용한 2단계 인증 설정</li>
              <li>· 새로운 기기/지역에서 로그인 시 이메일 또는 문자 알림</li>
            </ul>

            <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
              <a
                href="/account/security#two-factor"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                2단계 인증 설정으로 이동
              </a>
              <a
                href="/account/security#alerts"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                로그인 알림 설정
              </a>
            </div>
          </article>

          {/* 3. 로그인 이력 / 등록 기기 */}
          <article className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              로그인 이력 · 등록 기기
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              최근 로그인 기록과 계정에 로그인된 기기를 확인하고, 필요 시 강제 로그아웃할 수 있습니다.
            </p>

            <ul className="mt-3 space-y-1.5 text-[0.8rem] text-slate-600">
              <li>· 익숙하지 않은 위치/디바이스 로그인 기록은 즉시 확인</li>
              <li>· 사용하지 않는 기기는 등록 해제 또는 로그아웃</li>
            </ul>

            <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
              <a
                href="/account/security#login-history"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                로그인 이력 보기
              </a>
              <a
                href="/account/security#devices"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                등록된 기기 관리
              </a>
            </div>
          </article>

          {/* 4. 회원 정보 · 계정 설정 연결 */}
          <article className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              회원 정보 · 계정 설정
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              이름, 학번, 연락처, 알림 설정, 언어/테마 등 계정 전반의 정보를 관리합니다.
            </p>

            <ul className="mt-3 space-y-1.5 text-[0.8rem] text-slate-600">
              <li>· 프로필/학적 정보 확인 및 수정</li>
              <li>· 이메일/휴대폰 번호 변경</li>
              <li>· 알림 수신 방식 및 화면 테마 설정</li>
            </ul>

            <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
              <a
                href="/account/account"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                회원 정보 · 계정 관리 페이지로 이동
              </a>
            </div>
          </article>
        </section>

        {/* 하단 안내 */}
        <p className="mt-6 text-[0.75rem] text-slate-400">
          ※ 이 페이지는 인증/계정 보안 기능으로 이동하기 위한 메인 허브입니다.
          실제 비밀번호 변경, 2단계 인증 설정, 로그인 이력 조회 등은 각 상세 페이지에서 처리됩니다.
        </p>
      </div>
    </div>
  );
};

export default AuthSecurityMainPage;
