import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../api/UserApi"; // API 함수 별칭으로 임포트
import { login } from "../../slice/loginSlice"; // 리덕스 액션

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginSlice);
  console.log("loginState:", loginState);
  const [form, setForm] = useState({ email: "", pw: "" });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.email.trim()) return "이메일을 입력하세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "이메일 형식이 올바르지 않습니다.";
    if (!form.pw) return "비밀번호를 입력하세요.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    const v = validate();
    if (v) return setErrMsg(v);
    try {
      setLoading(true);
      // 1) 백엔드 로그인 호출
      const res = await doLogin({
        email: form.email,
        password: form.pw,
      });
      console.log("res:", res);
      // 2) 응답 체크 (프로젝트 응답 포맷에 맞게 조정)
      // 예: 스프링 시큐리티 successHandler가 { ok:true, user:{...} }를 리턴한다고 가정
      if (!res || res.ok === false) {
        return setErrMsg(res?.error || "이메일/비밀번호를 확인하세요.");
      }
      // 3) 스토어에 로그인 상태 저장
      // 쿠키 저장은 login 리듀서가 이미 처리(setCookie)하고 있음
      const user = { ...res };
      console.log("user:,", user);
      dispatch(login(user));
      alert(user.nickname + "님환영합니다");
      // "환영합니다 로그인에 성공했습니다"
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("로그인 정보가 올바르지 않습니다");
      setErrMsg("로그인 요청에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="bg-white shadow-xl rounded-xl w-96 p-8 text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">로그인</h2>

        <form onSubmit={onSubmit}>
          {/* 이메일 입력 */}
          <div className="mb-4 text-left">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이메일
            </label>
            <input
              type="text"
              id="email"
              name="email" // 로직 연결
              value={form.email} // 로직 연결
              onChange={onChange} // 로직 연결
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              autoComplete="username"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-4 text-left">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="pw" // 로직 연결
              value={form.pw} // 로직 연결
              onChange={onChange} // 로직 연결
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              autoComplete="current-password"
            />
          </div>

          {/* 에러 메시지 (로직 연결) */}
          {errMsg && (
            <p className="mb-4 text-red-600 text-sm text-center">{errMsg}</p>
          )}

          {/* 로그인 버튼 (로직 연결) */}
          <button
            type="submit"
            disabled={loading} // 로직 연결
            className="w-full py-3 mt-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
