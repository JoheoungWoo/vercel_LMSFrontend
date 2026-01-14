import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
import { doLogin } from "../api/UserApi";

// 기본 상태
const initialState = {
  email: "",
  nickname: "",
};

/**
 * 1️⃣ 쿠키에서 사용자 정보 읽기
 * - LocalStorage를 보지 않고 오직 쿠키만 확인합니다.
 * - 서브도메인 간 공유된 쿠키를 읽어와 초기 상태를 결정합니다.
 */
const loadMemberCookie = () => {
  const userInfo = getCookie("user");

  // 쿠키가 존재하면 파싱 및 디코딩
  if (userInfo) {
    if (userInfo.nickname) {
      userInfo.nickname = decodeURIComponent(userInfo.nickname);
    }
    return userInfo;
  }

  return null;
};

const loginSlice = createSlice({
  name: "loginSlice",
  // 초기값: 쿠키에 데이터가 있으면 사용, 없으면 기본값(GUEST)
  initialState: loadMemberCookie() || initialState,
  reducers: {
    login: (state, action) => {
      const payload = action.payload;

      // 쿠키 저장 (domain: ".greenunivercity.store" 설정 필수)
      setCookie("user", JSON.stringify(payload), 1);

      return payload;
    },
    logout: (state) => {
      // 쿠키 삭제
      removeCookie("user");

      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const payload = action.payload;

        // 로그인 성공 시 쿠키에 저장
        if (!payload.error) {
          setCookie("user", JSON.stringify(payload), 1);
        }
        return { ...state, ...payload };
      })
      .addCase(loginPostAsync.pending, () => console.log("login pending"))
      .addCase(loginPostAsync.rejected, () => console.log("login rejected"));
  },
});

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  doLogin(param)
);

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
