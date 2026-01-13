// src/components/admin/AdminSystemCommunitySummary.jsx
import React, { useEffect, useState } from "react";
import NoticeApi from "../../api/NoticeApi";
import PostApi from "../../api/PostApi";
import CommentApi from "../../api/CommentApi";

const AdminSystemCommunitySummary = () => {
  const [notices, setNotices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    NoticeApi.config?.funcs?.readAll?.().then((res) => {
      const data = res?.data ?? res;
      setNotices(Array.isArray(data) ? data : data?.content ?? []);
    });

    PostApi.config?.funcs?.readAll?.().then((res) => {
      const data = res?.data ?? res;
      setPosts(Array.isArray(data) ? data : data?.content ?? []);
    });

    CommentApi.config?.funcs?.all?.().then((res) => {
      const data = res?.data ?? res;
      setComments(Array.isArray(data) ? data : data?.content ?? []);
    });
  }, []);

  const reportedComments = comments.filter((c) => c.reported).length;
  const todayPosts = posts.filter((p) => {
    const created = new Date(p.createAt || p.createdAt);
    const today = new Date();
    return created.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="space-y-6">
      {/* 공지사항 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📢</span>
          <h2 className="font-bold text-gray-800">공지사항</h2>
        </div>
        <div className="space-y-2">
          {notices.slice(0, 3).map((n) => (
            <div
              key={n.noticeId || n.id}
              className="text-xs text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200"
            >
              <span className="font-medium">• {n.title}</span>
            </div>
          ))}
          {notices.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">
              등록된 공지가 없습니다
            </p>
          )}
        </div>
      </div>

      {/* 게시글 현황 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="font-bold text-gray-800">게시글 현황</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              전체 게시글
            </span>
            <span className="font-bold text-lg text-gray-800">
              {posts.length}개
            </span>
          </div>
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">오늘 작성</span>
            <span className="font-bold text-lg text-gray-800">
              {todayPosts}개
            </span>
          </div>
        </div>
      </div>

      {/* 댓글 관리 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💬</span>
          <h2 className="font-bold text-gray-800">댓글 관리</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">전체 댓글</span>
            <span className="font-bold text-lg text-gray-800">
              {comments.length}개
            </span>
          </div>
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              신고된 댓글
            </span>
            <span className="font-bold text-lg text-gray-800">
              {reportedComments}개
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemCommunitySummary;
