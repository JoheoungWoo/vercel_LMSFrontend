import React, { useState } from "react";

const CourseGrades = () => {
  // ───────────────── 학생 성적 더미 ─────────────────
  const [students, setStudents] = useState([
    {
      id: 1,
      studentId: "20250001",
      name: "김학생",
      midterm: 80,
      final: 85,
      assignment: 90,
    },
    {
      id: 2,
      studentId: "20250002",
      name: "이예제",
      midterm: 70,
      final: 75,
      assignment: 80,
    },
    {
      id: 3,
      studentId: "20250003",
      name: "박테스트",
      midterm: 60,
      final: 55,
      assignment: 65,
    },
  ]);

  // ───────────────── 점수 변경 ─────────────────
  const handleScoreChange = (id, field, value) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, [field]: Number(value) }
          : s
      )
    );
  };

  // ───────────────── 총점 계산 ─────────────────
  const calcTotal = (s) =>
    Math.round(
      s.midterm * 0.3 +
        s.final * 0.4 +
        s.assignment * 0.3
    );

  // ───────────────── 등급 계산 ─────────────────
  const calcGrade = (total) => {
    if (total >= 90) return "A";
    if (total >= 80) return "B";
    if (total >= 70) return "C";
    if (total >= 60) return "D";
    return "F";
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 중간·기말·과제 점수를 입력하면 총점과 등급이 자동 계산됩니다.
      </div>

      {/* 성적 테이블 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          과목 성적 관리
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2">학번</th>
                <th className="px-2 py-2">이름</th>
                <th className="px-2 py-2 text-center">중간</th>
                <th className="px-2 py-2 text-center">기말</th>
                <th className="px-2 py-2 text-center">과제</th>
                <th className="px-2 py-2 text-center">총점</th>
                <th className="px-2 py-2 text-center">등급</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => {
                const total = calcTotal(s);
                const grade = calcGrade(total);

                return (
                  <tr
                    key={s.id}
                    className={`border-b border-slate-100 ${
                      idx % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50/60"
                    }`}
                  >
                    <td className="px-2 py-2 text-slate-700">
                      {s.studentId}
                    </td>
                    <td className="px-2 py-2 font-medium text-slate-800">
                      {s.name}
                    </td>

                    {/* 중간 */}
                    <td className="px-2 py-2 text-center">
                      <input
                        type="number"
                        value={s.midterm}
                        onChange={(e) =>
                          handleScoreChange(
                            s.id,
                            "midterm",
                            e.target.value
                          )
                        }
                        className="w-14 rounded-md border border-slate-300 px-2 py-1 text-center text-[0.75rem]"
                      />
                    </td>

                    {/* 기말 */}
                    <td className="px-2 py-2 text-center">
                      <input
                        type="number"
                        value={s.final}
                        onChange={(e) =>
                          handleScoreChange(
                            s.id,
                            "final",
                            e.target.value
                          )
                        }
                        className="w-14 rounded-md border border-slate-300 px-2 py-1 text-center text-[0.75rem]"
                      />
                    </td>

                    {/* 과제 */}
                    <td className="px-2 py-2 text-center">
                      <input
                        type="number"
                        value={s.assignment}
                        onChange={(e) =>
                          handleScoreChange(
                            s.id,
                            "assignment",
                            e.target.value
                          )
                        }
                        className="w-14 rounded-md border border-slate-300 px-2 py-1 text-center text-[0.75rem]"
                      />
                    </td>

                    {/* 총점 */}
                    <td className="px-2 py-2 text-center font-semibold">
                      {total}
                    </td>

                    {/* 등급 */}
                    <td className="px-2 py-2 text-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.7rem] ${
                          grade === "A"
                            ? "bg-emerald-50 text-emerald-700"
                            : grade === "F"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {grade}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    수강 학생이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={() =>
              alert("성적이 저장되었습니다. (더미)")
            }
            className="rounded-md bg-sky-500 px-4 py-1.5 text-[0.8rem] font-medium text-white hover:bg-sky-600"
          >
            성적 저장
          </button>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 성적 입력 기간 제한,
        상대평가, 이의 신청 기능이 추가됩니다.
      </p>
    </div>
  );
};

export default CourseGrades;
