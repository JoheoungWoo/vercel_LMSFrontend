import React, { useState } from "react";

const ScholarshipAssign = () => {
  // ───────────────── 장학금 종류 더미 ─────────────────
  const scholarshipTypes = [
    "성적 우수 장학금",
    "가계 곤란 장학금",
    "근로 장학금",
  ];

  // ───────────────── 학생 더미 ─────────────────
  const initialStudents = [
    {
      id: 1,
      studentId: "20250001",
      name: "김학생",
      major: "컴퓨터공학과",
      assigned: false,
    },
    {
      id: 2,
      studentId: "20250002",
      name: "이예제",
      major: "컴퓨터공학과",
      assigned: false,
    },
    {
      id: 3,
      studentId: "20250003",
      name: "박테스트",
      major: "소프트웨어학과",
      assigned: true,
    },
  ];

  const [students, setStudents] = useState(initialStudents);

  // ───────────────── 입력 상태 ─────────────────
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  // ───────────────── 지급 처리 (더미) ─────────────────
  const handleAssign = (id) => {
    if (!type || !amount) {
      alert("장학금 종류와 금액을 입력해주세요.");
      return;
    }

    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, assigned: true } : s
      )
    );

    alert("장학금이 지급 처리되었습니다. (더미)");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 장학금 대상 학생에게 장학금을 배정하는 화면입니다.
      </div>

      {/* 장학금 입력 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          장학금 정보 입력
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-[0.75rem] text-slate-600">
              장학금 종류
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            >
              <option value="">선택</option>
              {scholarshipTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-[0.75rem] text-slate-600">
              지급 금액
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="예: 1000000"
              className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>
        </div>
      </div>

      {/* 학생 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          장학금 대상 학생
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">학번</th>
                <th className="px-2 py-2">이름</th>
                <th className="px-2 py-2">학과</th>
                <th className="px-2 py-2 text-center">상태</th>
                <th className="px-2 py-2 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr
                  key={s.id}
                  className={`border-b border-slate-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="px-2 py-2 text-slate-700">
                    {s.studentId}
                  </td>
                  <td className="px-2 py-2 text-slate-800">
                    {s.name}
                  </td>
                  <td className="px-2 py-2 text-slate-700">
                    {s.major}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {s.assigned ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] text-emerald-700">
                        지급 완료
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[0.7rem] text-slate-600">
                        미지급
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {!s.assigned && (
                      <button
                        onClick={() => handleAssign(s.id)}
                        className="rounded-md bg-sky-500 px-2 py-1 text-[0.7rem] text-white hover:bg-sky-600"
                      >
                        지급
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    학생이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 지급 이력, 지급 취소, 회계 시스템 연동이
        포함됩니다.
      </p>
    </div>
  );
};

export default ScholarshipAssign;
