import React, { useState, useEffect } from "react";
import UserApi from "../../../api/UserApi";
import { useSelector } from "react-redux";
import DepartmentApi from "../../../api/DepartmentApi";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [editing, setEditing] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [form, setForm] = useState({
    userId: null,
    email: "",
    nickname: "",
    password: "",
    role: "",
    deptName: "",
    delete: false,
  });

  const userSlice = useSelector((state) => state.loginSlice);

  useEffect(() => {
    loadUsers();
    departmentFetch();
  }, []);

  const loadUsers = () => {
    UserApi.config.funcs
      .readAll(userSlice.email)
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => {
        console.error("사용자 목록 불러오기 실패:", err);
      });
  };

  const departmentFetch = () => {
    DepartmentApi.config.funcs
      .readAll(userSlice.email)
      .then((result) => {
        console.log(result);
        setDepartments(result);
      })
      .catch((err) => {
        console.error("학과 목록 불러오기 실패:", err);
      });
  };

  const filteredUsers = users
    .filter((u) => {
      if (showDeleted) {
        return true;
      } else {
        return !u.delete;
      }
    })
    .filter((u) => {
      if (!keyword) return true;
      return (
        u.nickname?.toLowerCase().includes(keyword.toLowerCase()) ||
        u.studentNumber?.includes(keyword) ||
        u.email?.toLowerCase().includes(keyword.toLowerCase())
      );
    });

  const openEdit = (user) => {
    setEditing(user);
    setForm({
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      // password: user.password,
      role: user.role,
      deptName: user.deptName,
      delete: user.delete,
    });
  };

  const handleSave = () => {
    const payload = {
      userId: form.userId,
      email: form.email || null,
      nickname: form.nickname || null,
      role: form.role || null,
      deptName: form.deptName || null,
      password: form.password || null,
      delete: form.delete,
    };

    UserApi.config.funcs
      .updateOne(payload, userSlice.email)
      .then(() => {
        loadUsers();
        setEditing(null);
        alert("수정되었습니다.");
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  const handlePasswordReset = () => {
    if (!window.confirm("이 사용자의 비밀번호를 초기화하시겠습니까?")) return;

    const payload = {
      userId: editing.userId,
      password: "reset1234!", // 초기화 비밀번호
    };

    UserApi.config.funcs
      .updateOne(payload, userSlice.email)
      .then(() => {
        alert("비밀번호가 'reset1234!'로 초기화되었습니다.");
      })
      .catch((err) => {
        console.error("비밀번호 초기화 실패:", err);
        alert("비밀번호 초기화 중 오류가 발생했습니다.");
      });
  };

  const handleSoftDelete = (userId) => {
    if (!window.confirm("정말 비활성화하시겠습니까?")) return;
    UserApi.config.funcs
      .deleteOne(userId, userSlice.email)
      .then(() => {
        loadUsers();
        alert("비활성화되었습니다.");
      })
      .catch((err) => {
        console.error("비활성화 실패:", err);
        alert("비활성화 중 오류가 발생했습니다.");
      });
  };

  const handleRestore = (userId) => {
    if (!window.confirm("이 사용자를 복구하시겠습니까?")) return;

    // restore 엔드포인트 호출
    UserApi.config.funcs
      .findByKeywordHttp("restore", userId, userSlice.email, "post", null)
      .then(() => {
        loadUsers();
        alert("복구되었습니다.");
      })
      .catch((err) => {
        console.error("복구 실패:", err);
        alert("복구 중 오류가 발생했습니다.");
      });
  };

  const activeCount = users.filter((u) => !u.delete).length;
  const deletedCount = users.filter((u) => u.delete).length;

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">사용자 관리</h1>
      <p className="mb-4 text-sm text-slate-500">
        등록된 사용자 계정을 관리합니다.
      </p>

      <div className="mb-4 flex gap-3 text-sm">
        <div className="rounded-lg bg-green-50 px-3 py-2">
          <span className="text-green-600 font-semibold">
            활성: {activeCount}명
          </span>
        </div>
        <div className="rounded-lg bg-red-50 px-3 py-2">
          <span className="text-red-600 font-semibold">
            비활성: {deletedCount}명
          </span>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-3">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="닉네임, 학번, 이메일 검색"
          className="max-w-xs rounded border px-3 py-2 text-sm"
        />
        <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
            className="rounded cursor-pointer"
          />
          <span className="text-slate-600">비활성화된 사용자 표시</span>
        </label>
      </div>

      <div className="mb-2 text-xs text-slate-500">
        총 {filteredUsers.length}명 표시 중
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">상태</th>
              <th className="px-4 py-3 text-left font-semibold">닉네임</th>
              <th className="px-4 py-3 text-left font-semibold">학번</th>
              <th className="px-4 py-3 text-left font-semibold">이메일</th>
              <th className="px-4 py-3 text-left font-semibold">역할</th>
              <th className="px-4 py-3 text-left font-semibold">학과</th>
              <th className="px-4 py-3 text-center font-semibold">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.userId}
                className={`border-t transition-colors ${
                  u.delete
                    ? "bg-red-50/30 text-slate-400 hover:bg-red-50/50"
                    : "hover:bg-slate-50"
                }`}
              >
                <td className="px-4 py-3">
                  {u.delete ? (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                      비활성
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      활성
                    </span>
                  )}
                </td>
                <td
                  className={`px-4 py-3 ${
                    !u.delete && "font-medium text-slate-900"
                  }`}
                >
                  {u.nickname}
                </td>
                <td className="px-4 py-3">{u.studentNumber || "-"}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-xs">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">{u.deptName || "-"}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    {u.delete ? (
                      <button
                        onClick={() => handleRestore(u.userId)}
                        className="text-xs text-green-600 hover:text-green-800 hover:underline font-medium"
                      >
                        복구
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => openEdit(u)}
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          수정
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() => handleSoftDelete(u.userId)}
                          className="text-xs text-red-500 hover:text-red-700 hover:underline font-medium"
                        >
                          비활성화
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  {keyword
                    ? "검색 결과가 없습니다."
                    : "등록된 사용자가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">사용자 정보 수정</h2>
              <button
                onClick={() => setEditing(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  이메일
                </label>
                <input
                  value={form.email}
                  disabled
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm bg-slate-50 text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  닉네임
                </label>
                <input
                  value={form.nickname}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, nickname: e.target.value }))
                  }
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  비밀번호 (변경시만 입력)
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="변경하지 않으려면 비워두세요"
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">역할</label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="PROFESSOR">PROFESSOR</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="GUEST">GUEST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">학과</label>
                <select
                  value={form.deptName || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, deptName: e.target.value }))
                  }
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">학과 선택</option>
                  {departments.map((dept) => (
                    <option key={dept.departmentId} value={dept.deptName}>
                      {dept.deptName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.delete}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, delete: e.target.checked }))
                    }
                    className="rounded cursor-pointer"
                    id="deleteCheck"
                  />
                  <label
                    htmlFor="deleteCheck"
                    className="text-sm font-semibold text-red-600 cursor-pointer"
                  >
                    비활성화 처리
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditing(null)}
                  className="rounded border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManage;
