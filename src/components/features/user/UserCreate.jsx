import React, { useEffect, useState } from "react";
import DepartmentApi from "../../../api/DepartmentApi";
import UserApi from "../../../api/UserApi";
import { useSelector } from "react-redux";

const UserCreate = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: "",
    role: "STUDENT",
    deptName: "",
  });
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);

  const user = useSelector((state) => state.loginSlice);
  const role = user?.role || "USER";

  console.log("현재 사용자 ROLE:", role);

  useEffect(() => {
    DepartmentApi.config.funcs.readAll().then(setDepartments);
  }, []);

  const handleSubmit = () => {
    const { email, password, nickname, role, deptName } = form;

    if (!email || !password || !nickname || !role || !deptName) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (password.length < 8 || password.length > 20) {
      setError("비밀번호는 8자 이상 20자 이하여야 합니다.");
      return;
    }
    if (nickname.length < 2 || nickname.length > 20) {
      setError("닉네임은 2자 이상 20자 이하여야 합니다.");
      return;
    }

    UserApi.config.funcs
      .writeOne(form, user.email)
      .then(() => {
        alert("사용자가 생성되었습니다.");
        setForm({
          email: "",
          password: "",
          nickname: "",
          role: "STUDENT",
          deptName: "",
        });
        setError("");
      })
      .catch(() => setError("사용자 생성 중 오류가 발생했습니다."));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">사용자 등록</h1>

      <div className="space-y-4 rounded-lg border bg-white p-5">
        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
              setError("");
            }}
            className="w-full rounded border px-3 py-2"
            placeholder="example@university.ac.kr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }));
              setError("");
            }}
            className="w-full rounded border px-3 py-2"
            placeholder="8자 이상 20자 이하"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">닉네임</label>
          <input
            value={form.nickname}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, nickname: e.target.value }));
              setError("");
            }}
            className="w-full rounded border px-3 py-2"
            placeholder="2자 이상 20자 이하"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">역할</label>
          <select
            value={form.role}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, role: e.target.value }));
              setError("");
            }}
            className="w-full rounded border px-3 py-2"
          >
            <option value="STUDENT">학생</option>
            <option value="PROFESSOR">교수</option>
            <option value="ADMIN">관리자</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">소속 학과</label>
          <select
            value={form.deptName}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, deptName: e.target.value }));
              setError("");
            }}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">학과 선택</option>
            {departments.map((d) => (
              <option key={d.departmentId} value={d.deptName}>
                {d.deptName}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          사용자 생성
        </button>
      </div>
    </div>
  );
};

export default UserCreate;
