import React, { useState } from "react";

const GradePolicyManage = () => {
  // ───────────────── 성적 정책 더미 ─────────────────
  const [policies, setPolicies] = useState([
    {
      id: 1,
      name: "기본 성적 정책",
      midterm: 30,
      final: 40,
      assignment: 20,
      attendance: 10,
      active: true,
    },
    {
      id: 2,
      name: "프로젝트 중심 정책",
      midterm: 20,
      final: 30,
      assignment: 40,
      attendance: 10,
      active: false,
    },
  ]);

  // ───────────────── 신규 정책 ─────────────────
  const [form, setForm] = useState({
    name: "",
    midterm: 0,
    final: 0,
    assignment: 0,
    attendance: 0,
  });

  // ───────────────── 합계 계산 ─────────────────
  const calcTotal = (p) =>
    Number(p.midterm) +
    Number(p.final) +
    Number(p.assignment) +
    Number(p.attendance);

  // ───────────────── 입력 처리 ─────────────────
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ───────────────── 정책 추가 ─────────────────
  const handleAddPolicy = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("정책명을 입력해주세요.");
      return;
    }

    if (calcTotal(form) !== 100) {
      alert("성적 반영 비율의 합은 100%여야 합니다.");
      return;
    }

    setPolicies((prev) => [
      ...prev.map((p) => ({ ...p, active: false })),
      {
        id: Date.now(),
        ...form,
        active: true,
      },
    ]);

    setForm({
      name: "",
      midterm: 0,
      final: 0,
      assignment: 0,
      attendance: 0,
    });

    alert("새 성적 정책이 추가되었습니다. (더미)");
  };

  // ───────────────── 정책 활성화 ─────────────────
  const handleActivate = (id) => {
    setPolicies((prev) =>
      prev.map((p) => ({
        ...p,
        active: p.id === id,
      }))
    );
    alert("선택한 정책이 활성화되었습니다. (더미)");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-5 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 성적 산정 기준은 과목 성적 계산에 즉시 반영됩니다.
      </div>

      {/* 신규 정책 등록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          성적 정책 등록
        </h3>

        <form
          onSubmit={handleAddPolicy}
          className="grid gap-3 md:grid-cols-5"
        >
          <input
            type="text"
            placeholder="정책명"
            value={form.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            className="md:col-span-5 rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="중간 (%)"
            value={form.midterm}
            onChange={(e) =>
              handleChange("midterm", e.target.value)
            }
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="기말 (%)"
            value={form.final}
            onChange={(e) =>
              handleChange("final", e.target.value)
            }
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="과제 (%)"
            value={form.assignment}
            onChange={(e) =>
              handleChange("assignment", e.target.value)
            }
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="출석 (%)"
            value={form.attendance}
            onChange={(e) =>
              handleChange("attendance", e.target.value)
            }
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <div className="md:col-span-5 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              합계: {calcTotal(form)}%
            </p>
            <button
              type="submit"
              className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
            >
              정책 추가
            </button>
          </div>
        </form>
      </div>

      {/* 정책 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          성적 정책 목록
        </h3>

        <div className="space-y-3">
          {policies.map((p) => (
            <div
              key={p.id}
              className="rounded-md border border-slate-100 bg-slate-50 px-3 py-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-800">
                  {p.name}
                </p>
                {p.active ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] text-emerald-700">
                    적용 중
                  </span>
                ) : (
                  <button
                    onClick={() => handleActivate(p.id)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] hover:bg-slate-50"
                  >
                    적용
                  </button>
                )}
              </div>

              <p className="mt-1 text-[0.75rem] text-slate-600">
                중간 {p.midterm}% · 기말 {p.final}% · 과제{" "}
                {p.assignment}% · 출석 {p.attendance}%
              </p>
            </div>
          ))}

          {policies.length === 0 && (
            <p className="py-3 text-center text-slate-400">
              등록된 성적 정책이 없습니다.
            </p>
          )}
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 과목별 정책 적용,
        변경 이력 관리 기능이 추가됩니다.
      </p>
    </div>
  );
};

export default GradePolicyManage;

