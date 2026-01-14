import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
import { doLogin } from "../api/userApi";

const initialState = {
  email: "",
  nickname: "",
  role: "STUDENT",
};

// 1️⃣ 쿠키 읽기
const loadAccounterCookie = () => {
  const userInfo = getCookie("user");
  if (userInfo && userInfo.nickname)
    userInfo.nickname = decodeURIComponent(userInfo.nickname);
  return userInfo;
};

// 2️⃣ localStorage 읽기
const loadUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.nickname) user.nickname = decodeURIComponent(user.nickname);
      return user;
    }
  } catch (e) {
    console.error("localStorage load error", e);
  }
  return null;
};

// 3️⃣ Redux Slice
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadAccounterCookie() || loadUserFromStorage() || initialState,
  reducers: {
    login: (state, action) => {
      const payload = action.payload;

      // 쿠키 저장 (기준)
      setCookie("user", JSON.stringify(payload), 1);

      // localStorage 동기화 (fallback/보조)
      localStorage.setItem("user", JSON.stringify(payload));

      return payload;
    },
    logout: (state) => {
      removeCookie("user");
      localStorage.removeItem("user"); // localStorage도 제거
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload.error) {
          setCookie("user", JSON.stringify(payload), 1); // 쿠키 기준
          localStorage.setItem("user", JSON.stringify(payload)); // localStorage 동기화
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
