import React, { useState, useEffect } from "react";
import { getPostsByBoard } from "../../../api/BoardApi";
import CommentApi from "../../../api/CommentApi";
import { useSelector } from "react-redux";

/* ================= 유틸 ================= */
const pick = (obj, keys, fallback = "") => {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "")
      return obj[k];
  }
  return fallback;
};

const getPostId = (post) => post?.postId ?? post?.id;

const createTempComment = (content) => ({
  commentId: `temp-${Date.now()}`,
  content,
  user: { nickname: "익명" },
  isTemp: true,
});

/* ================= 컴포넌트 ================= */
export default function CommunityBoard() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);

  const loginState = useSelector((state) => state.loginSlice);

  /* ================= 게시글 조회 ================= */
  useEffect(() => {
    setLoading(true);
    getPostsByBoard()
      .then((res) => {
        const data = res?.data?.data || res?.data || res;
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  /* ================= 댓글 조회 ================= */
  const fetchComments = async (postId) => {
    try {
      const listFunc =
        CommentApi?.config?.funcs?.listByPost || CommentApi?.listByPost;
      if (!listFunc) return;

      const res = await listFunc(postId);
      const list = res?.data || res || [];

      // ✅ 서버 댓글은 무조건 isTemp 제거 (정규화)
      const normalized = Array.isArray(list)
        ? list.map((c) => ({ ...c, isTemp: false }))
        : [];

      setComments((prev) => ({
        ...prev,
        [postId]: normalized,
      }));
    } catch (e) {
      console.error("댓글 로드 실패", e);
    }
  };

  useEffect(() => {
    if (!selectedPost) return;
    const postId = getPostId(selectedPost);
    if (postId) fetchComments(postId);
  }, [selectedPost]);

  /* ================= 댓글 등록 ================= */
  const addComment = async () => {
    if (!commentInput.trim() || !selectedPost) return;

    const postId = getPostId(selectedPost);
    if (!postId) return;

    const tempComment = createTempComment(commentInput);

    // 1. 임시 댓글 즉시 표시
    setComments((prev) => ({
      ...prev,
      [postId]: [tempComment, ...(prev[postId] || [])],
    }));

    setCommentInput("");

    // 2. 5초 후 임시 상태 해제 (서버 지연 대비)
    const tempTimer = setTimeout(() => {
      setComments((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).map((c) =>
          c.commentId === tempComment.commentId
            ? { ...c, isTemp: false }
            : c
        ),
      }));
    }, 5000);

    try {
      // 3. 서버 저장
      await CommentApi.create(postId, {
        content: tempComment.content,
        email: loginState?.email || "test@aaa.com",
        postId,
      });

      // 4. 서버 기준으로 다시 동기화
      await fetchComments(postId);

      clearTimeout(tempTimer);
    } catch (e) {
      console.error("댓글 등록 실패", e);

      clearTimeout(tempTimer);

      // 실패 시 임시 댓글 제거
      setComments((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).filter(
          (c) => c.commentId !== tempComment.commentId
        ),
      }));

      alert("댓글 등록 실패");
    }
  };

  const modalPostId = getPostId(selectedPost);

  /* ================= 렌더 ================= */
  return (
    <div className="w-full min-h-screen bg-sky-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-sky-900 mb-8">
          자유 게시판
        </h1>

        <div className="bg-white p-6 rounded-3xl border border-sky-100">
          {loading ? (
            <p className="text-center py-10">로딩 중...</p>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div
                  key={getPostId(post)}
                  onClick={() => setSelectedPost(post)}
                  className="cursor-pointer rounded-2xl bg-sky-50 p-5 hover:bg-white hover:shadow"
                >
                  <h3 className="font-bold text-lg">
                    {pick(post, ["title"], "제목 없음")}
                  </h3>
                  <div className="text-xs text-sky-400 mt-2">
                    {post.user?.nickname || "익명"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= 모달 ================= */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-sky-400 text-xl font-bold hover:text-sky-600"
              aria-label="모달 닫기"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {selectedPost.title}
            </h2>

            <p className="mb-6 whitespace-pre-wrap">
              {selectedPost.content}
            </p>

            <hr className="mb-4" />

            <h3 className="font-bold mb-3">
              댓글 {comments[modalPostId]?.length || 0}
            </h3>

            <div className="space-y-3 mb-4">
              {(comments[modalPostId] || []).map((c) => (
                <div
                  key={c.commentId}
                  className={`rounded-xl p-3 text-sm ${
                    c.isTemp
                      ? "bg-sky-100 animate-pulse"
                      : "bg-sky-50"
                  }`}
                >
                  <div className="font-bold text-sky-700">
                    {c.user?.nickname || "익명"}
                    {c.isTemp && (
                      <span className="ml-2 text-xs">(등록 중)</span>
                    )}
                  </div>
                  <div>{c.content}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 border rounded-xl px-4 py-2"
                placeholder="댓글 입력..."
              />
              <button
                onClick={addComment}
                className="bg-sky-600 text-white px-4 py-2 rounded-xl font-bold"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
