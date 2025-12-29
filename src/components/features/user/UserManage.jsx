import React, { useState, useEffect } from "react";
import UserApi from "../../../api/UserApi";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [editing, setEditing] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [form, setForm] = useState({
    nickname: "",
    role: "",
    deptName: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    UserApi.config.funcs
      .readAll()
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => {
        console.error("사용자 목록 불러오기 실패:", err);
      });
  };

  const filteredUsers = users
    .filter((u) => {
      if (showDeleted) {
        // showDeleted 체크 시: 삭제된 사용자도 포함
        return true;
      } else {
        // showDeleted 체크 안 할 때: 활성 사용자만
        return !u.isDelete;
      }
    })
    .filter((u) => {
      // 키워드 검색 적용
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
      nickname: user.nickname,
      role: user.role,
      deptName: user.deptName,
      isDelete: user.isDelete,
    });
  };

  const handleSave = () => {
    const payload = { ...form, userId: editing.userId };
    UserApi.config.funcs
      .update(editing.userId, payload)
      .then(() => {
        loadUsers();
        setEditing(null);
        alert("수정되었습니다.");
      })
      .catch(() => alert("수정 중 오류가 발생했습니다."));
  };

  const handleSoftDelete = (userId) => {
    if (!window.confirm("정말 비활성화하시겠습니까?")) return;
    UserApi.config.funcs
      .update(userId, { isDelete: true })
      .then(() => {
        loadUsers();
        alert("비활성화되었습니다.");
      })
      .catch(() => alert("비활성화 중 오류가 발생했습니다."));
  };

  const handleRestore = (userId) => {
    if (!window.confirm("이 사용자를 복구하시겠습니까?")) return;
    UserApi.config.funcs
      .update(userId, { isDelete: false })
      .then(() => {
        loadUsers();
        alert("복구되었습니다.");
      })
      .catch(() => alert("복구 중 오류가 발생했습니다."));
  };

  const activeCount = users.filter((u) => !u.isDelete).length;
  const deletedCount = users.filter((u) => u.isDelete).length;

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
            onChange={(e) => setShowDeleted(e.target.checked)} // 상태 업데이트
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
                  u.isDelete
                    ? "bg-red-50/30 text-slate-400 hover:bg-red-50/50"
                    : "hover:bg-slate-50"
                }`}
              >
                <td className="px-4 py-3">
                  {u.isDelete ? (
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
                    !u.isDelete && "font-medium text-slate-900"
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
                    {u.isDelete === 1 ? (
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
                    ) : (
                      <button
                        onClick={() => handleRestore(u.userId)}
                        className="text-xs text-green-600 hover:text-green-800 hover:underline font-medium"
                      >
                        복구
                      </button>
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
                <label className="block text-sm font-semibold mb-1">역할</label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="STUDENT">학생</option>
                  <option value="PROFESSOR">교수</option>
                  <option value="ADMIN">관리자</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">학과</label>
                <input
                  value={form.deptName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, deptName: e.target.value }))
                  }
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
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
