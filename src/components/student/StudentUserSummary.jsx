// StudentUserSummary.jsx
import React, { useEffect, useState } from "react";
import NoticeApi from "../../api/NoticeApi";
import { getPostsByBoard } from "../../api/BoardApi";

/* ===== 유틸 ===== */
const getNoticeId = (n) => n?.noticeId ?? n?.id;
const getPostId = (p) => p?.postId ?? p?.id;

/* ===== 컴포넌트 ===== */
const StudentUserSummary = () => {
  const [notices, setNotices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingNotice, setLoadingNotice] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  /* 공지 요약 */
  useEffect(() => {
    setLoadingNotice(true);

    const funcs = NoticeApi.config?.funcs || {};
    const fetchAll =
      funcs.all ||
      funcs.readAll ||
      funcs.getAll ||
      funcs.list ||
      funcs.readPage;

    if (!fetchAll) {
      setNotices([]);
      setLoadingNotice(false);
      return;
    }

    fetchAll()
      .then((res) => {
        const payload = res?.data ?? res;
        let data = [];

        if (Array.isArray(payload)) data = payload;
        else if (Array.isArray(payload?.data)) data = payload.data;
        else if (Array.isArray(payload?.content)) data = payload.content;

        setNotices(data.map((n) => ({ ...n, id: getNoticeId(n) })).slice(0, 5));
      })
      .catch(() => setNotices([]))
      .finally(() => setLoadingNotice(false));
  }, []);

  /* 커뮤니티 요약 */
  useEffect(() => {
    setLoadingPost(true);
    getPostsByBoard()
      .then((res) => {
        const data = res?.data?.data || res?.data || res;
        setPosts(Array.isArray(data) ? data.slice(0, 5) : []);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoadingPost(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* 공지 요약 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="mb-3 font-semibold text-slate-800">📢 공지사항</h3>

        {loadingNotice ? (
          <p className="text-sm text-slate-400">로딩 중…</p>
        ) : notices.length === 0 ? (
          <p className="text-sm text-slate-400">공지사항이 없습니다.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {notices.map((n) => (
              <li
                key={n.id}
                className="flex justify-between gap-2 border-b pb-1 last:border-b-0"
              >
                <span className="truncate text-slate-700">
                  {n.importance === "HIGH" && (
                    <span className="mr-1 text-rose-600">[중요]</span>
                  )}
                  {n.title}
                </span>
                <span className="text-xs text-slate-400">{n.createdAt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 커뮤니티 요약 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="mb-3 font-semibold text-slate-800">💬 커뮤니티</h3>

        {loadingPost ? (
          <p className="text-sm text-slate-400">로딩 중…</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-slate-400">게시글이 없습니다.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {posts.map((p) => (
              <li key={getPostId(p)} className="border-b pb-1 last:border-b-0">
                <p className="truncate font-medium text-slate-700">
                  {p.title || "제목 없음"}
                </p>
                <p className="text-xs text-slate-400">
                  {p.user?.nickname || "익명"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentUserSummary;
