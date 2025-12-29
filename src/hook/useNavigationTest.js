import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slice/loginSlice";

export const useNavigationTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Home = () => {
    alert(" ^ ^ ^ ^ ^ ^ 만 들 어 주 세 요 ^ ^ ^ ^ ^ ^ ^ ^ ^ ");
    navigate("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    alert("로그아웃 되었습니다");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/account/login");
  };

  const signUp = () => {
    navigate("/account/sign");
  };

  return { Home, handleLogout, handleLogin, signUp };
};
