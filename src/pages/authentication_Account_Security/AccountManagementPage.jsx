import React, { useState } from "react";

const AccountManagementPage = () => {
  // 더미 상태 (나중에 API 연동해서 초기값 세팅 가능)
  const [profile, setProfile] = useState({
    name: "김유라",
    studentId: "20250001",
    department: "컴퓨터공학과",
    email: "youra@example.com",
    phone: "010-0000-0000",
    notificationEmail: true,
    notificationSms: false,
    language: "ko",
    theme: "light",
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API 호출 등 저장 로직
    alert("계정 정보가 저장되었습니다. (더미)");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            계정 관리
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            프로필, 연락처, 알림 설정 등을 관리할 수 있습니다.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* 기본 정보 */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              기본 정보
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              이름과 학번, 소속 학과 등 기본 정보를 확인합니다.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[0.75rem] font-medium text-slate-700">
                  이름
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[0.75rem] font-medium text-slate-700">
                  학번
                </label>
                <input
                  type="text"
                  value={profile.studentId}
                  onChange={(e) => handleChange("studentId", e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[0.75rem] font-medium text-slate-700">
                  학과/전공
                </label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
              </div>
            </div>
          </section>

          {/* 연락처 정보 */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              연락처 정보
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              공지 및 안내를 받을 이메일과 휴대폰 번호를 관리합니다.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[0.75rem] font-medium text-slate-700">
                  이메일
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[0.75rem] font-medium text-slate-700">
                  휴대폰 번호
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
              </div>
            </div>
          </section>

          {/* 알림 설정 */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              알림 설정
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              학교 공지, 강의/성적 관련 안내를 어떤 방식으로 받을지 선택합니다.
            </p>

            <div className="mt-3 space-y-2 text-[0.8rem] text-slate-700">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={profile.notificationEmail}
                  onChange={(e) =>
                    handleChange("notificationEmail", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                />
                <span>이메일로 알림 받기</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={profile.notificationSms}
                  onChange={(e) =>
                    handleChange("notificationSms", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                />
                <span>문자(SMS)로 알림 받기</span>
              </label>
              <p className="mt-2 text-[0.7rem] text-slate-500">
                ※ 필수 안내(학사 일정, 수강 변경 등)는 설정과 관계없이 발송될 수 있습니다.
              </p>
            </div>
          </section>

          {/* 환경 설정 (언어/테마 등) */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              환경 설정
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              서비스 사용 언어와 화면 테마를 선택할 수 있습니다.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[0.75rem] font-medium text-slate-700">
                  표시 언어
                </label>
                <select
                  value={profile.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[0.75rem] font-medium text-slate-700">
                  화면 테마
                </label>
                <select
                  value={profile.theme}
                  onChange={(e) => handleChange("theme", e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                >
                  <option value="light">라이트</option>
                  <option value="dark">다크</option>
                  <option value="system">시스템 기본값</option>
                </select>
              </div>
            </div>
          </section>

          {/* 계정 관련 기타 액션 */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              계정 관리 작업
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              비밀번호 변경 및 계정 보안 설정은 별도의 페이지에서 관리합니다.
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
              <a
                href="/account/security"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                인증 · 계정 보안 설정으로 이동
              </a>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-red-200 bg-white px-3 py-1.5 text-red-600 shadow-sm hover:bg-red-50"
              >
                계정 탈퇴 요청
              </button>
            </div>
          </section>

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600"
            >
              변경 내용 저장
            </button>
          </div>
        </form>

        <p className="mt-4 text-[0.75rem] text-slate-400">
          ※ 모든 값은 예시용 더미 데이터이며, 실제 서비스 연동 시에는 서버에서
          불러온 사용자 정보를 초기값으로 사용하세요.
        </p>
      </div>
    </div>
  );
};

export default AccountManagementPage;
