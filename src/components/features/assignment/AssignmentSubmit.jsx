import React, { useState } from "react";

const AssignmentSubmit = () => {
  // ───────────────── 과제 정보 (더미) ─────────────────
  const assignment = {
    title: "과제 1 - 개인 웹 페이지 제작",
    dueDate: "2025-09-22",
    description:
      "HTML, CSS를 활용해 간단한 개인 소개 웹 페이지를 제작하세요.",
  };

  // ───────────────── 상태 관리 ─────────────────
  const [file, setFile] = useState(null);       // 선택한 파일
  const [submitted, setSubmitted] = useState(false); // 제출 여부

  // ───────────────── 파일 선택 ─────────────────
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ───────────────── 제출 처리 ─────────────────
  const handleSubmit = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    // 실제 서비스에서는 여기서 API 호출
    setSubmitted(true);
    alert("과제가 제출되었습니다. (더미)");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 과제 정보 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
        <h3 className="font-semibold text-slate-800">{assignment.title}</h3>
        <p className="mt-1 text-[0.75rem] text-slate-500">
          마감일: {assignment.dueDate}
        </p>
        <p className="mt-2 text-slate-700">
          {assignment.description}
        </p>
      </div>

      {/* 제출 상태 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-3">
        {!submitted ? (
          <>
            <p className="text-slate-700 font-medium mb-2">
              📎 과제 파일 업로드
            </p>

            <input
              type="file"
              onChange={handleFileChange}
              className="block text-[0.8rem]"
            />

            {file && (
              <p className="mt-2 text-[0.75rem] text-slate-600">
                선택한 파일: <span className="font-medium">{file.name}</span>
              </p>
            )}

            <button
              onClick={handleSubmit}
              className="mt-3 rounded-md bg-sky-500 px-4 py-1.5 text-[0.8rem] font-medium text-white hover:bg-sky-600"
            >
              과제 제출
            </button>
          </>
        ) : (
          <>
            <p className="text-emerald-600 font-medium">
              ✅ 과제가 제출되었습니다.
            </p>
            <p className="mt-1 text-[0.75rem] text-slate-500">
              제출 파일: {file?.name}
            </p>
          </>
        )}
      </div>

      {/* 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 파일 저장, 재제출 제한, 마감 시간 검증이
        서버에서 처리됩니다.
      </p>
    </div>
  );
};

export default AssignmentSubmit;
