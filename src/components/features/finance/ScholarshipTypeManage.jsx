import React, { useState } from "react";

const ScholarshipTypeManage = () => {
  // ───────────────── 장학금 유형 더미 ─────────────────
  const [types, setTypes] = useState([
    {
      id: 1,
      name: "성적 우수 장학금",
      description: "학업 성취도가 우수한 학생 대상",
      active: true,
    },
    {
      id: 2,
      name: "가계 곤란 장학금",
      description: "가정 형편이 어려운 학생 대상",
      active: true,
    },
    {
      id: 3,
      name: "근로 장학금",
      description: "교내 근로 참여 학생 대상",
      active: false,
    },
  ]);

  // ───────────────── 입력 상태 ─────────────────
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // ───────────────── 유형 추가 ─────────────────
  const handleAddType = () => {
    if (!name.trim()) {
      alert("장학금 유형명을 입력해주세요.");
      return;
    }

    const newType = {
      id: Date.now(),
      name,
      description,
      active: true,
    };

    setTypes((prev) => [...prev, newType]);
    setName("");
    setDescription("");
  };

  // ───────────────── 활성/비활성 토글 ─────────────────
  const toggleActive = (id) => {
    setTypes((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, active: !t.active } : t
      )
    );
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 장학금 유형을 관리하고 지급 대상에 활용합니다.
      </div>

      {/* 장학금 유형 등록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          장학금 유형 등록
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-[0.75rem] text-slate-600">
              유형명
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 성적 우수 장학금"
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-[0.75rem] text-slate-600">
              설명
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="간단한 설명"
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddType}
            className="rounded-md bg-sky-500 px-4 py-1.5 text-[0.8rem] font-medium text-white hover:bg-sky-600"
          >
            유형 추가
          </button>
        </div>
      </div>

      {/* 장학금 유형 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          장학금 유형 목록
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">유형명</th>
                <th className="px-2 py-2">설명</th>
                <th className="px-2 py-2 text-center">상태</th>
                <th className="px-2 py-2 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {types.map((t, idx) => (
                <tr
                  key={t.id}
                  className={`border-b border-slate-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="px-2 py-2 text-slate-800">
                    {t.name}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {t.description || "-"}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {t.active ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] text-emerald-700">
                        활성
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[0.7rem] text-slate-600">
                        비활성
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button
                      onClick={() => toggleActive(t.id)}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50"
                    >
                      {t.active ? "비활성화" : "활성화"}
                    </button>
                  </td>
                </tr>
              ))}
              {types.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    등록된 장학금 유형이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 비활성화된 장학금 유형은 장학금 지급 시 선택할 수 없도록
        처리하는 구조를 권장합니다.
      </p>
    </div>
  );
};

export default ScholarshipTypeManage;

