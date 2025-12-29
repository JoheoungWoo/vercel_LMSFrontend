import React, { useState } from "react";
import UserApi from "../../../api/UserApi";
import { useSelector } from "react-redux";

const PasswordManage = () => {
  const [step, setStep] = useState(1); // 1: 이메일, 2: 코드, 3: 비밀번호
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [form, setForm] = useState({ newPass: "", confirm: "" });
  const [error, setError] = useState("");

  const user = useSelector((state) => state.loginSlice);
  const role = user?.role || "USER";

  console.log("현재 사용자 ROLE:", role);

  const sendEmail = () => {
    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      return;
    }
    alert("인증 코드가 발송되었습니다.");
    setStep(2);
    setError("");
  };

  const verifyCode = () => {
    if (!code.trim()) {
      setError("인증 코드를 입력해주세요.");
      return;
    }
    if (code !== "123456") {
      setError("인증 코드가 일치하지 않습니다.");
      return;
    }
    setStep(3);
    setError("");
  };

  const resetPassword = () => {
    if (!form.newPass || !form.confirm) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (form.newPass.length < 8) {
      setError("새 비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }
    if (form.newPass !== form.confirm) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // password, email 순서
    UserApi.changePassword(form.newPass, user.email).then((result) => {
      console.log(result);
    });

    alert("비밀번호가 변경되었습니다.");
    setStep(1);
    setEmail("");
    setCode("");
    setForm({ newPass: "", confirm: "" });
    setError("");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">비밀번호 재설정</h1>

      <div className="space-y-4 rounded-lg border bg-white p-4">
        {/* 1단계: 이메일 입력 */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full rounded border px-3 py-2"
                placeholder="등록된 이메일 입력"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              onClick={sendEmail}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              인증 코드 전송
            </button>
          </>
        )}

        {/* 2단계: 인증 코드 입력 */}
        {step === 2 && (
          <>
            <div className="text-sm text-gray-600 mb-2">
              {email}로 인증 코드를 전송했습니다.
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                인증 코드
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                className="w-full rounded border px-3 py-2"
                placeholder="6자리 코드 입력"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              onClick={verifyCode}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              인증 확인
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full rounded border px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              이메일 다시 입력
            </button>
          </>
        )}

        {/* 3단계: 새 비밀번호 입력 */}
        {step === 3 && (
          <>
            <div className="text-sm text-green-600 mb-2">
              인증이 완료되었습니다.
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                새 비밀번호
              </label>
              <input
                type="password"
                value={form.newPass}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, newPass: e.target.value }));
                  setError("");
                }}
                className="w-full rounded border px-3 py-2"
                placeholder="8자 이상"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                새 비밀번호 확인
              </label>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, confirm: e.target.value }));
                  setError("");
                }}
                className="w-full rounded border px-3 py-2"
                placeholder="다시 한 번 입력"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              onClick={resetPassword}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              비밀번호 변경
            </button>
          </>
        )}
      </div>

      {/* 테스트용 안내 */}
      <p className="mt-4 text-xs text-gray-400 text-center">
        테스트용 인증 코드: 123456
      </p>
    </div>
  );
};

export default PasswordManage;
