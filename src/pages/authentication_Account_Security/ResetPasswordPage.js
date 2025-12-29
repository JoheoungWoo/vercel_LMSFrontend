import React, { useState } from "react";

/// 일단은 복붙 해놨으나 추후에 해석 및 수정 필요합니다.
const PasswordResetPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    emailOrId: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("weak");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "newPassword") {
      updatePasswordStrength(value);
    }
  };

  const updatePasswordStrength = (value) => {
    if (!value) {
      setPasswordStrength("weak");
      return;
    }
    const lengthScore = value.length >= 10;
    const mixScore =
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[^A-Za-z0-9]/.test(value);

    if (lengthScore && mixScore) {
      setPasswordStrength("strong");
    } else if (value.length >= 8) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  const handleNextStep1 = (e) => {
    e.preventDefault();
    setError("");

    if (!form.emailOrId.trim()) {
      setError("이메일 또는 아이디를 입력해주세요.");
      return;
    }

    // TODO: 서버에 비밀번호 재설정 요청(인증코드 발송 API)
    // 성공 시 다음 단계로
    setStep(2);
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    setError("");

    if (!form.code.trim()) {
      setError("인증코드를 입력해주세요.");
      return;
    }

    // TODO: 서버에 인증코드 검증 요청
    // 성공 시 다음 단계로
    setStep(3);
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    setError("");

    if (!form.newPassword || !form.confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    // TODO: 서버에 최종 비밀번호 변경 요청
    alert("비밀번호가 재설정되었습니다. (더미)");
  };

  const renderPasswordStrengthText = () => {
    if (passwordStrength === "strong") return "비밀번호 강도: 강함";
    if (passwordStrength === "medium") return "비밀번호 강도: 보통";
    return "비밀번호 강도: 낮음";
  };

  const strengthBarClass = () => {
    if (passwordStrength === "strong") return "bg-emerald-500 w-3/3";
    if (passwordStrength === "medium") return "bg-amber-400 w-2/3";
    return "bg-red-400 w-1/3";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-10">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            비밀번호 재설정
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            계정에 다시 접근할 수 있도록 비밀번호를 재설정합니다.
          </p>
        </header>

        {/* 단계 표시 */}
        <div className="mb-6 flex items-center justify-between text-[0.75rem] text-slate-500">
          <div className="flex flex-1 items-center gap-2">
            <div
              className={`h-2 flex-1 rounded-full ${
                step >= 1 ? "bg-sky-500" : "bg-slate-200"
              }`}
            />
            <div
              className={`h-2 flex-1 rounded-full ${
                step >= 2 ? "bg-sky-500" : "bg-slate-200"
              }`}
            />
            <div
              className={`h-2 flex-1 rounded-full ${
                step >= 3 ? "bg-sky-500" : "bg-slate-200"
              }`}
            />
          </div>
          <span className="ml-3 text-[0.7rem]">
            {step === 1 && "1단계 · 계정 확인"}
            {step === 2 && "2단계 · 인증코드 입력"}
            {step === 3 && "3단계 · 새 비밀번호 설정"}
          </span>
        </div>

        {/* 카드 */}
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700">
                  이메일 또는 아이디
                </label>
                <input
                  type="text"
                  value={form.emailOrId}
                  onChange={(e) =>
                    handleChange("emailOrId", e.target.value)
                  }
                  placeholder="학교 이메일 또는 계정 아이디를 입력하세요."
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
                <p className="mt-1 text-[0.7rem] text-slate-500">
                  입력한 연락처로 비밀번호 재설정용 인증코드가 발송됩니다.
                </p>
              </div>

              {error && (
                <p className="text-[0.75rem] text-red-500">{error}</p>
              )}

              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600"
              >
                인증코드 보내기
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700">
                  인증코드
                </label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  placeholder="메일 또는 문자로 받은 인증코드를 입력하세요."
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
                <p className="mt-1 text-[0.7rem] text-slate-500">
                  인증코드는 일정 시간 후 만료될 수 있습니다.
                </p>
              </div>

              {error && (
                <p className="text-[0.75rem] text-red-500">{error}</p>
              )}

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  이전 단계
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600"
                >
                  다음 단계로
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmitNewPassword} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700">
                  새 비밀번호
                </label>
                <input
                  type="password"
                  value={form.newPassword}
                  onChange={(e) =>
                    handleChange("newPassword", e.target.value)
                  }
                  placeholder="새 비밀번호를 입력하세요."
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
                <p className="mt-1 text-[0.7rem] text-slate-500">
                  최소 8자 이상, 영문 대/소문자, 숫자, 특수문자 조합을 추천합니다.
                </p>

                {/* 비밀번호 강도 표시 */}
                <div className="mt-2">
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className={`h-1.5 rounded-full ${strengthBarClass()}`} />
                  </div>
                  <p className="mt-1 text-[0.7rem] text-slate-500">
                    {renderPasswordStrengthText()}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700">
                  새 비밀번호 확인
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="다시 한 번 입력하세요."
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
              </div>

              {error && (
                <p className="text-[0.75rem] text-red-500">{error}</p>
              )}

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  이전 단계
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600"
                >
                  비밀번호 재설정 완료
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 하단 안내 */}
        <p className="mt-4 text-[0.7rem] text-slate-400">
          ※ 이 페이지는 예시용 더미 화면입니다. 실제 서비스에서는 서버와 연동하여
          인증코드 발송 및 비밀번호 재설정 처리를 진행해야 합니다.
        </p>
      </div>
    </div>
  );
};

export default PasswordResetPage;
