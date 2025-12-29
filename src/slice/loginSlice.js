import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
import { doLogin } from "../api/UserApi";

const initialState = {
  email: "",
  nickname: "",
};
const loadAccounterCookie = () => {
  const userInfo = getCookie("user");
  console.log("1)userInfo:", userInfo);
  if (userInfo && userInfo.nickname)
    userInfo.nickname = decodeURIComponent(userInfo.nickname);
  return userInfo;
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadAccounterCookie() || initialState, //쿠키가 없다면 초기값 사용
  reducers: {
    login: (state, action) => {
      console.log("login....");
      const payload = action.payload;
      setCookie("user", JSON.stringify(payload), 1);
      return payload;
    },
    logout: (state, action) => {
      console.log("logout....");
      removeCookie("user");
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
        const payload = action.payload;
        //정상적인 로그인시에만 저장
        if (!payload.error) setCookie("member", JSON.stringify(payload), 1); //일
        return action.payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  doLogin(param)
);
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
