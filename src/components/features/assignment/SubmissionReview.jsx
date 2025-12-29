// SubmissionReview.jsx
import React, { useState } from "react";

const dummySubmissions = [
  {
    id: 1,
    studentName: "홍길동",
    status: "제출",
    submittedAt: "2025-03-10 14:22",
    fileUrl: "/files/assignment1.pdf",
    score: 85,
    feedback: "잘 작성했습니다.",
  },
  {
    id: 2,
    studentName: "김철수",
    status: "미제출",
    submittedAt: null,
    fileUrl: null,
    score: null,
    feedback: "",
  },
];

const SubmissionReview = () => {
  const [submissions, setSubmissions] = useState(dummySubmissions);
  const [selectedId, setSelectedId] = useState(null);

  const selected = submissions.find((s) => s.id === selectedId);

  const updateSelected = (field, value) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === selectedId ? { ...s, [field]: value } : s))
    );
  };

  return (
    <div className="flex gap-6 w-full">
      {/* 제출물 목록 */}
      <div className="w-1/3 border rounded p-4">
        <h2 className="text-lg font-bold mb-3">제출물 목록</h2>
        <ul className="space-y-2">
          {submissions.map((s) => (
            <li
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`p-3 border rounded cursor-pointer ${
                selectedId === s.id ? "bg-blue-100" : ""
              }`}
            >
              <div className="font-semibold">{s.studentName}</div>
              <div className="text-sm text-gray-600">상태: {s.status}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* 상세 + 피드백 */}
      <div className="w-2/3 border rounded p-4">
        {!selected && <div className="text-gray-500">제출물을 선택하세요.</div>}

        {selected && (
          <>
            <h2 className="text-lg font-bold mb-4">
              {selected.studentName} 제출물
            </h2>

            {/* 제출 정보 */}
            <div className="mb-4">
              <div>제출 상태: {selected.status}</div>
              <div>제출 일시: {selected.submittedAt || "—"}</div>
              {selected.fileUrl && (
                <a
                  href={selected.fileUrl}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  파일 다운로드
                </a>
              )}
            </div>

            {/* 점수 입력 */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">점수</label>
              <input
                type="number"
                value={selected.score ?? ""}
                onChange={(e) => updateSelected("score", e.target.value)}
                className="border p-2 rounded w-32"
              />
            </div>

            {/* 피드백 */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">피드백</label>
              <textarea
                value={selected.feedback}
                onChange={(e) => updateSelected("feedback", e.target.value)}
                className="border p-2 rounded w-full h-32"
              />
            </div>

            {/* 액션 */}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                저장
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded">
                확정
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmissionReview;
