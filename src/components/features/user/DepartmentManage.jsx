import React, { useState } from "react";

const DepartmentManage = () => {
  /** 학과 더미 데이터 */
  const [departments, setDepartments] = useState([
    { id: 1, code: "CS", name: "컴퓨터공학과", active: true },
    { id: 2, code: "EE", name: "전자공학과", active: true },
    { id: 3, code: "ME", name: "기계공학과", active: false },
  ]);

  /** 모달 상태 */
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  /** 입력 폼 상태 */
  const [form, setForm] = useState({
    code: "",
    name: "",
  });

  /** 모달 열기 */
  const openCreate = () => {
    setEditing(null);
    setForm({ code: "", name: "" });
    setIsOpen(true);
  };

  const openEdit = (dept) => {
    setEditing(dept);
    setForm({ code: dept.code, name: dept.name });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setForm({ code: "", name: "" });
    setEditing(null);
  };

  /** 저장 (추가 / 수정) */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.code.trim() || !form.name.trim()) return;

    // 코드 중복 체크 (수정 시 자기 자신 제외)
    const duplicated = departments.some(
      (d) => d.code === form.code && d.id !== editing?.id
    );
    if (duplicated) {
      alert("이미 존재하는 학과 코드입니다.");
      return;
    }

    if (editing) {
      // 수정
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === editing.id ? { ...d, ...form } : d
        )
      );
    } else {
      // 추가
      setDepartments((prev) => [
        ...prev,
        {
          id: Date.now(),
          code: form.code,
          name: form.name,
          active: true,
        },
      ]);
    }

    closeModal();
  };

  /** 활성 / 비활성 토글 */
  const toggleActive = (id) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, active: !d.active } : d
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">학과 관리</h1>
      <p className="mb-4 text-sm text-slate-500">
        학과 추가, 수정 및 사용 여부를 관리합니다.
      </p>

      {/* 상단 버튼 */}
      <div className="mb-3">
        <button
          onClick={openCreate}
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          + 학과 추가
        </button>
      </div>

      {/* 학과 테이블 */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">학과 코드</th>
              <th className="px-4 py-2 text-left">학과명</th>
              <th className="px-4 py-2 text-center">상태</th>
              <th className="px-4 py-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr
                key={dept.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-2 font-medium">{dept.code}</td>
                <td className="px-4 py-2">{dept.name}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold
                      ${
                        dept.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {dept.active ? "사용 중" : "비활성"}
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => openEdit(dept)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => toggleActive(dept.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    {dept.active ? "비활성화" : "활성화"}
                  </button>
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  등록된 학과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">
              {editing ? "학과 수정" : "학과 추가"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold">
                  학과 코드
                </label>
                <input
                  value={form.code}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      code: e.target.value.toUpperCase(),
                    }))
                  }
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="예: CS"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  학과명
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="예: 컴퓨터공학과"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded border px-4 py-2 text-sm"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManage;
