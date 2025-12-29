import React, { useState, useEffect } from "react";
import PostApi from "../../../api/PostApi";

export default function CommunityBoard() {
  const [active, setActive] = useState("FREE");
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const BOARDS = [
    {
      key: "FREE",
      title: "자유게시판",
      desc: "자유롭게 이야기하고 소통하세요",
    },
    { key: "QNA", title: "질문 게시판", desc: "질문하고 답변을 받아보세요" },
    { key: "NOTICE", title: "공지사항", desc: "중요한 학교 공지 안내" },
  ];

  // // 게시글 불러오기
  // useEffect(() => {
  //   setLoading(true);

  //   getPostsByBoard("자유게시판")
  //     .then((res) => {
  //       const {data}=  res
  //       console.log(data)
  //       setPosts(data)
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert("게시글 불러오기 실패");
  //     })
  //     .finally(() => setLoading(false));
  // }, ["자유게시판"]);

  // 댓글 추가
  const addComment = () => {
    if (!commentInput.trim() || !selectedPost) return;

    setComments((prev) => ({
      ...prev,
      [selectedPost.id]: [
        ...(prev[selectedPost.id] || []),
        {
          text: commentInput,
          date: new Date().toLocaleString(),
        },
      ],
    }));

    setCommentInput("");
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto bg-gradient-to-b from-sky-50 to-white px-4 py-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-sky-900 mb-1">커뮤니티</h1>
        <p className="text-sky-700 mb-5 text-sm">
          자유게시판 · 질문 게시판 · 공지사항
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {BOARDS.map((b) => (
            <button
              key={b.key}
              onClick={() => setActive(b.key)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold
                ${
                  active === b.key
                    ? "bg-sky-600 text-white"
                    : "bg-white border border-sky-200 text-sky-700"
                }`}
            >
              {b.title}
            </button>
          ))}
        </div>
        <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
          <ul className="space-y-3">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((Post) => (
                <li
                  key={Post.postId}
                  onClick={() => setSelectedPost(Post)}
                  className="cursor-pointer rounded-lg border border-sky-100 p-3 hover:bg-sky-50"
                >
                  <div className="text-sm font-medium text-sky-900">
                    {Post.title}
                  </div>
                  <div className="text-xs text-sky-600 mt-0.5">
                    {Post.createdAt}
                  </div>
                </li>
              ))
            ) : (
              <li className="text-sm text-sky-400 text-center py-6">
                게시글이 없습니다.
              </li>
            )}
          </ul>
        </section>
      </div>
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-sky-900">
                {selectedPost.title}
              </h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-sky-500 hover:text-sky-700"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <p className="text-sky-800 mb-4 whitespace-pre-line">
              {selectedPost.content}
            </p>

            <div className="text-xs text-sky-500 mb-6">
              {selectedPost.author} · {selectedPost.date}
            </div>

            {/* Comments / Answers */}
            {selectedPost.board !== "NOTICE" ? (
              <>
                <h3 className="text-sm font-semibold text-sky-900 mb-2">
                  {selectedPost.board === "QNA" ? "답변" : "댓글"}
                </h3>

                <ul className="space-y-2 mb-4">
                  {(comments[selectedPost.id] || []).map((c, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-sky-50 px-3 py-2 text-sm"
                    >
                      {c.text}
                      <div className="text-xs text-sky-500 mt-1">{c.date}</div>
                    </li>
                  ))}
                </ul>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 rounded-lg border border-sky-200 px-3 py-2 text-sm"
                    placeholder={
                      selectedPost.board === "QNA"
                        ? "답변을 입력하세요"
                        : "댓글을 입력하세요"
                    }
                  />
                  <button
                    onClick={addComment}
                    className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    등록
                  </button>
                </div>
              </>
            ) : (
              <div className="text-sm text-sky-500">
                공지사항은 댓글을 작성할 수 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
