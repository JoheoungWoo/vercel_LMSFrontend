import React, { useState } from "react";

const CourseManage = () => {
  // ───────────────── 강의 목록 더미 ─────────────────
  const [courses] = useState([
    {
      id: 1,
      code: "CS301",
      name: "웹 프로그래밍",
      semester: "2025-2학기",
      professor: "김교수",
      credit: 3,
      sectionCount: 2,
      enrolled: 42,
      status: "운영 중", // 운영 중 | 종료 | 예정
    },
    {
      id: 2,
      code: "CS205",
      name: "자료구조",
      semester: "2025-2학기",
      professor: "이교수",
      credit: 3,
      sectionCount: 1,
      enrolled: 38,
      status: "운영 중",
    },
    {
      id: 3,
      code: "CS410",
      name: "React 심화",
      semester: "2025-1학기",
      professor: "박교수",
      credit: 3,
      sectionCount: 1,
      enrolled: 30,
      status: "종료",
    },
  ]);

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 학기별 개설된 강의 목록입니다. 강의를 선택해 상세 운영 화면으로
        이동할 수 있습니다.
      </div>

      {/* 상단 액션 */}
      <div className="flex flex-wrap gap-2 text-[0.75rem]">
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          새 강의 개설 (더미)
        </button>
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
          학기 필터 (더미)
        </button>
      </div>

      {/* 강의 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
              <th className="px-2 py-2">과목</th>
              <th className="px-2 py-2">학기</th>
              <th className="px-2 py-2">담당교수</th>
              <th className="px-2 py-2">학점</th>
              <th className="px-2 py-2">분반</th>
              <th className="px-2 py-2">수강 인원</th>
              <th className="px-2 py-2 text-center">상태</th>
              <th className="px-2 py-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, idx) => (
              <tr
                key={c.id}
                className={`border-b border-slate-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <td className="px-2 py-2 align-middle">
                  <p className="font-medium text-slate-800">{c.name}</p>
                  <p className="text-[0.7rem] text-slate-500">{c.code}</p>
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {c.semester}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {c.professor}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {c.credit}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {c.sectionCount}
                </td>
                <td className="px-2 py-2 align-middle text-slate-700">
                  {c.enrolled}명
                </td>
                <td className="px-2 py-2 text-center align-middle">
                  <span
                    className={[
                      "rounded-full px-2 py-0.5 text-[0.7rem]",
                      c.status === "운영 중"
                        ? "bg-emerald-50 text-emerald-700"
                        : c.status === "종료"
                        ? "bg-slate-200 text-slate-600"
                        : "bg-sky-50 text-sky-700",
                    ].join(" ")}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-2 py-2 text-center align-middle">
                  <button className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50">
                    운영 관리
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-2 py-4 text-center text-slate-400"
                >
                  개설된 강의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ “운영 관리” 버튼 클릭 시 분반 관리, 주차별 수업, 출석, 과제 관리
        화면(ClassSectionManage)로 이동하는 구조를 권장합니다.
      </p>
    </div>
  );
};

export default CourseManage;
