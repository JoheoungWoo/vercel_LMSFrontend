import React, { useState } from "react";

const CommentModeration = () => {
  // ───────────────── 댓글 더미 ─────────────────
  const initialComments = [
    {
      id: 1,
      author: "김학생",
      content: "이 강의 정말 도움이 많이 됐어요!",
      reported: false,
      hidden: false,
      createdAt: "2025-09-10",
    },
    {
      id: 2,
      author: "이예제",
      content: "과제 설명이 너무 불친절한 것 같아요.",
      reported: true,
      hidden: false,
      createdAt: "2025-09-11",
    },
    {
      id: 3,
      author: "박테스트",
      content: "이런 수업 처음 봅니다 ㅋㅋ",
      reported: true,
      hidden: true,
      createdAt: "2025-09-12",
    },
  ];

  const [comments, setComments] = useState(initialComments);

  // ───────────────── 숨김 / 복구 ─────────────────
  const toggleHidden = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, hidden: !c.hidden } : c
      )
    );
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 신고된 댓글을 검토하고 숨김 처리할 수 있습니다.
      </div>

      {/* 댓글 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
              <th className="px-2 py-2">작성자</th>
              <th className="px-2 py-2">댓글 내용</th>
              <th className="px-2 py-2 text-center">신고</th>
              <th className="px-2 py-2 text-center">상태</th>
              <th className="px-2 py-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c, idx) => (
              <tr
                key={c.id}
                className={`border-b border-slate-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <td className="px-2 py-2 text-slate-700">
                  {c.author}
                </td>
                <td className="px-2 py-2 text-slate-800">
                  {c.hidden ? (
                    <span className="italic text-slate-400">
                      (숨김 처리된 댓글)
                    </span>
                  ) : (
                    c.content
                  )}
                </td>
                <td className="px-2 py-2 text-center">
                  {c.reported ? "🚨" : "-"}
                </td>
                <td className="px-2 py-2 text-center">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.7rem] ${
                      c.hidden
                        ? "bg-slate-200 text-slate-600"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {c.hidden ? "숨김" : "노출"}
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <button
                    onClick={() => toggleHidden(c.id)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50"
                  >
                    {c.hidden ? "복구" : "숨김"}
                  </button>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-2 py-4 text-center text-slate-400"
                >
                  댓글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 신고 사유, 신고 횟수, 자동 숨김 기준이
        서버에서 관리됩니다.
      </p>
    </div>
  );
};

export default CommentModeration;
