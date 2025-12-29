import React, { useState } from "react";

const AbsenceApproval = () => {
  // ───────────────── 결석 신청 정보 (더미) ─────────────────
  const absenceInfo = {
    courseName: "웹 프로그래밍",
    professor: "김교수",
  };

  // ───────────────── 상태 관리 ─────────────────
  const [date, setDate] = useState("");        // 결석 날짜
  const [reason, setReason] = useState("");    // 사유
  const [file, setFile] = useState(null);      // 증빙 파일 (선택)
  const [submitted, setSubmitted] = useState(false); // 제출 여부

  // ───────────────── 파일 선택 ─────────────────
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ───────────────── 제출 처리 ─────────────────
  const handleSubmit = () => {
    if (!date || !reason.trim()) {
      alert("결석 날짜와 사유를 입력해주세요.");
      return;
    }

    // 실제 서비스에서는 여기서 API 호출
    setSubmitted(true);
    alert("결석 사유가 신청되었습니다. (더미)");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 강의 정보 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
        <h3 className="font-semibold text-slate-800">
          결석 사유 신청
        </h3>
        <p className="mt-1 text-[0.75rem] text-slate-500">
          과목: {absenceInfo.courseName} · 담당교수: {absenceInfo.professor}
        </p>
      </div>

      {/* 신청 폼 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-3">
        {!submitted ? (
          <>
            {/* 날짜 선택 */}
            <div className="mb-3">
              <label className="block text-[0.75rem] text-slate-600 mb-1">
                결석 날짜
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            {/* 사유 입력 */}
            <div className="mb-3">
              <label className="block text-[0.75rem] text-slate-600 mb-1">
                결석 사유
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="결석 사유를 간단히 입력하세요."
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            {/* 증빙 파일 */}
            <div className="mb-3">
              <label className="block text-[0.75rem] text-slate-600 mb-1">
                증빙 파일 (선택)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="text-[0.8rem]"
              />
              {file && (
                <p className="mt-1 text-[0.75rem] text-slate-500">
                  선택한 파일: {file.name}
                </p>
              )}
            </div>

            {/* 제출 버튼 */}
            <button
              onClick={handleSubmit}
              className="rounded-md bg-sky-500 px-4 py-1.5 text-[0.8rem] font-medium text-white hover:bg-sky-600"
            >
              결석 사유 제출
            </button>
          </>
        ) : (
          <>
            <p className="font-medium text-emerald-600">
              ✅ 결석 사유가 제출되었습니다.
            </p>
            <p className="mt-1 text-[0.75rem] text-slate-500">
              날짜: {date}
            </p>
            <p className="mt-1 text-[0.75rem] text-slate-500">
              사유: {reason}
            </p>
            {file && (
              <p className="mt-1 text-[0.75rem] text-slate-500">
                첨부 파일: {file.name}
              </p>
            )}
          </>
        )}
      </div>

      {/* 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 승인/반려 처리, 증빙 파일 검증이
        서버에서 이루어집니다.
      </p>
    </div>
  );
};

export default AbsenceApproval;
