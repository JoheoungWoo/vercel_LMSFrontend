import React, { useEffect, useState } from "react";
import CommentApi from "../../../api/CommentApi";

const CommentModeration = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadTick, setReloadTick] = useState(0);

  /* ================= 목록 조회 ================= */
  useEffect(() => {
    setLoading(true);

    const funcs = CommentApi.config?.funcs || {};
    const fetchAll = funcs.all || funcs.list;

    if (!fetchAll) {
      console.error("CommentApi 전체 조회 함수 없음", funcs);
      setComments([]);
      setLoading(false);
      return;
    }

    fetchAll()
      .then((res) => {
        const payload = res?.data ?? res;

        let data = [];
        if (Array.isArray(payload)) data = payload;
        else if (Array.isArray(payload?.data)) data = payload.data;
        else if (Array.isArray(payload?.content)) data = payload.content;
        else if (Array.isArray(payload?.result)) data = payload.result;

        setComments(data);
      })
      .catch((e) => {
        console.error("댓글 불러오기 실패:", e);
        setComments([]);
      })
      .finally(() => setLoading(false));
  }, [reloadTick]);

  /* ================= 숨김 / 복구 ================= */
  const toggleHidden = async (comment) => {
    try {
      if (comment.hidden) {
        await CommentApi.config.funcs.restore(comment.id);
      } else {
        await CommentApi.config.funcs.hide(comment.id);
      }
      setReloadTick((v) => v + 1);
    } catch (e) {
      console.error("댓글 상태 변경 실패:", e);
    }
  };

  /* ================= 삭제 ================= */
const deleteOne = async (commentId) => {
  if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

  try {
    await CommentApi.config.funcs.delete(commentId);
    setReloadTick((v) => v + 1);
  } catch (e) {
    console.error("댓글 삭제 실패:", e);
  }
};
  /* ================= JSX ================= */
  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 신고된 댓글을 검토하고 숨김 처리할 수 있습니다.
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
              <th className="px-2 py-2">작성자</th>
              <th className="px-2 py-2">댓글 내용</th>
              <th className="px-2 py-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-slate-400">
                  불러오는 중…
                </td>
              </tr>
            )}

            {!loading &&
              comments.map((c, idx) => {
                // ✅ 작성자 안전 처리
                const author =
                  c.author ||
                  c.authorName ||
                  c.writer ||
                  c.username ||
                  c.user?.nickname ||
                  c.user?.name ||
                  "알 수 없음";

                return (
                  <tr
                    key={c.id}
                    className={`border-b border-slate-100 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    }`}
                  >
                    <td className="px-2 py-2 text-slate-700">
                      {author}
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

                    <td className="px-2 py-2 text-center space-x-1">
                      <button
                        onClick={() => deleteOne(c.commentId)}
                        className="rounded-md border px-2 py-1 text-[0.7rem] text-rose-600"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}

            {!loading && comments.length === 0 && (
              <tr>
                <td colSpan={3} className="px-2 py-4 text-center text-slate-400">
                  댓글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentModeration;
