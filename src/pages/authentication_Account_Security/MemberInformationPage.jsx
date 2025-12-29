import React, { useState } from "react";

const MemberAccountPage = () => {
  const [profile, setProfile] = useState({
    name: "김유라",
    studentId: "20250001",
    department: "컴퓨터공학과",
    majorStatus: "재학",
    email: "youra@example.com",
    phone: "010-0000-0000",
    notificationEmail: true,
    notificationSms: false,
    language: "ko",
    theme: "light",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 저장 API 연동
    alert("회원 정보와 계정 설정이 저장되었습니다. (더미)");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* 헤더 + 요약 */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              회원 정보 · 계정 관리
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              프로필, 연락처, 알림 및 기본 환경 설정, 보안 상태를 한 곳에서 관리할 수 있습니다.
            </p>
          </div>

          {/* 보안 요약 박스 */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-[0.75rem] text-slate-500">계정 보안 상태</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {twoFactorEnabled ? "안전도 높음" : "기본 보안 설정"}
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              2단계 인증과 강한 비밀번호 사용을 권장합니다.
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem]">
              <button
                type="button"
                onClick={() => setTwoFactorEnabled((prev) => !prev)}
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 shadow-sm",
                  twoFactorEnabled
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-700",
                ].join(" ")}
              >
                {twoFactorEnabled ? "2단계 인증 사용 중" : "2단계 인증 설정"}
              </button>
              <a
                href="/account/security"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                상세 보안 설정으로 이동
              </a>
            </div>
          </div>
        </header>

        {/* 메인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. 회원 기본 정보 */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              회원 기본 정보
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              이름, 학번, 소속 학과 등 기본 회원 정보입니다.
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
                  학과 / 전공
                </label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[0.75rem] font-medium text-slate-700">
                  학적 상태
                </label>
                <select
                  value={profile.majorStatus}
                  onChange={(e) => handleChange("majorStatus", e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                >
                  <option value="재학">재학</option>
                  <option value="휴학">휴학</option>
                  <option value="졸업">졸업</option>
                </select>
              </div>
            </div>
          </section>

          {/* 2. 연락처 정보 */}
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

          {/* 3. 알림 설정 */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              알림 설정
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              학교 공지, 수업/성적 관련 안내를 어떤 방식으로 받을지 선택합니다.
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
                ※ 필수 안내(학사 일정, 수강 변경 등)는 설정 여부와 관계없이 발송될 수 있습니다.
              </p>
            </div>
          </section>

          {/* 4. 환경 설정 */}
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

          {/* 5. 계정 관련 작업 */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              계정 관련 작업
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              비밀번호 변경, 상세 보안 설정, 계정 탈퇴 요청 등은 아래 버튼을 통해 진행할 수 있습니다.
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
              <a
                href="/account/security"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                인증 · 계정 보안 설정
              </a>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                비밀번호 변경
              </button>
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

export default MemberAccountPage;
