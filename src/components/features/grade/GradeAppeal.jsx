import React, { useState } from "react";

const GradeAppeal = () => {
  // ───────────────── 수강 과목 더미 ─────────────────
  const courses = [
    { id: 1, code: "CS301", name: "웹 프로그래밍" },
    { id: 2, code: "CS302", name: "자료구조" },
    { id: 3, code: "CS303", name: "운영체제" },
  ];

  // ───────────────── 이의 신청 목록 더미 ─────────────────
  const [appeals, setAppeals] = useState([
    {
      id: 1,
      course: "웹 프로그래밍",
      reason: "과제 점수 누락이 있는 것 같습니다.",
      status: "대기",
      response: "",
    },
    {
      id: 2,
      course: "자료구조",
      reason: "중간 시험 채점 기준 확인 요청드립니다.",
      status: "반려",
      response: "채점 기준에 따라 정상 처리되었습니다.",
    },
  ]);

  // ───────────────── 신규 이의 신청 ─────────────────
  const [form, setForm] = useState({
    courseId: "",
    reason: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.courseId || !form.reason.trim()) {
      alert("과목과 사유를 입력해주세요.");
      return;
    }

    const selectedCourse = courses.find(
      (c) => c.id === Number(form.courseId)
    );

    setAppeals((prev) => [
      {
        id: Date.now(),
        course: selectedCourse.name,
        reason: form.reason,
        status: "대기",
        response: "",
      },
      ...prev,
    ]);

    setForm({ courseId: "", reason: "" });
    alert("성적 이의 신청이 접수되었습니다. (더미)");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-5 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 성적 이의 신청은 성적 공개 기간 내에만 가능합니다.
      </div>

      {/* 이의 신청 폼 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          성적 이의 신청
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 과목 선택 */}
          <div>
            <label className="mb-1 block text-xs text-slate-500">
              과목 선택
            </label>
            <select
              value={form.courseId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  courseId: e.target.value,
                }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">과목을 선택하세요</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* 사유 입력 */}
          <div>
            <label className="mb-1 block text-xs text-slate-500">
              이의 신청 사유
            </label>
            <textarea
              rows={4}
              value={form.reason}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  reason: e.target.value,
                }))
              }
              placeholder="이의 신청 사유를 구체적으로 작성해주세요."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          {/* 제출 */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
            >
              이의 신청 제출
            </button>
          </div>
        </form>
      </div>

      {/* 이의 신청 내역 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          이의 신청 내역
        </h3>

        <div className="space-y-3">
          {appeals.map((a) => (
            <div
              key={a.id}
              className="rounded-md border border-slate-100 bg-slate-50 px-3 py-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-800">
                  {a.course}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.7rem] ${
                    a.status === "대기"
                      ? "bg-amber-50 text-amber-700"
                      : a.status === "승인"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {a.status}
                </span>
              </div>

              <p className="mt-2 text-[0.8rem] text-slate-700">
                <span className="font-medium">사유:</span>{" "}
                {a.reason}
              </p>

              {a.response && (
                <p className="mt-2 text-[0.75rem] text-slate-500">
                  <span className="font-medium">처리 의견:</span>{" "}
                  {a.response}
                </p>
              )}
            </div>
          ))}

          {appeals.length === 0 && (
            <p className="py-3 text-center text-slate-400">
              성적 이의 신청 내역이 없습니다.
            </p>
          )}
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 이의 신청 결과는 담당 교수 또는 학사팀 검토 후
        반영됩니다.
      </p>
    </div>
  );
};

export default GradeAppeal;
