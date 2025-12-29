import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doRegister } from "../../api/UserApi";

const JoinComponent = () => {
  const navigate = useNavigate();

  const initialState = {
    id: "",
    email: "",
    password: "",
    nickname: "",
    positon: "",
    role: "STUDENT",
  };
  const [form, setForm] = useState(initialState);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    // 1) 백엔드 회원가입
    const res = await doRegister(
      //   id: form.id,
      //   email: form.email,
      //   password: form.password,
      //   nickname: form.nickname,
      form
    );
    console.log("form:", form);
    console.log("res:", res);

    const user = { ...res };
    console.log("user:,", user);
    alert(user.nickname + "님 가입을 환영합니다");
    navigate("/");
  };
  const changeHandler = (e) => {
    console.log("선택이 되었어요", e.target.value);
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl w-[450px] p-8 text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">회원가입</h2>
        <form className="text-left space-y-4" onSubmit={onSubmit}>
          {/* 이름 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              name="nickname"
              type="text"
              placeholder="이름을 입력하세요"
              value={form.nickname}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          {/* 아이디 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <input
              name="id"
              type="text"
              placeholder="아이디를 입력하세요"
              value={form.id}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              name="password2"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.password2}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              name="email"
              type="email"
              placeholder="이메일 주소를 입력하세요"
              value={form.email}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <select name="role" value={form.role} onChange={changeHandler}>
              <option>학생</option>
              <option>교수</option>
            </select>
          </div>
          {/* 약관 동의 */}
          <div className="mt-6">
            <label className="flex items-start space-x-2">
              <input
                name="agree"
                type="checkbox"
                value={form.agree}
                onChange={onChange}
                className="mt-1 h-4 w-4 text-black border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                [필수] 이용약관에 동의합니다.
              </span>
            </label>
            {/* 약관 내용 스크롤 영역 */}
            <div className="mt-2 p-3 border border-gray-300 rounded-lg h-24 overflow-y-auto text-sm text-gray-600 bg-gray-50">
              아직 할게 너무 많이 남았다. <br />
              작업을 할때마다 머리가 너무너무너무 아프다 퇴소가 마렵습니다 중도
              포기 백기 들겠습니다
            </div>
          </div>
          {/* 에러 메시지 (로직 연결) */}
          {errMsg && (
            <p className="mb-4 text-red-600 text-sm text-center">{errMsg}</p>
          )}

          {/* 가입 완료 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-6 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "처리 중 ..." : "가입완료"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinComponent;
