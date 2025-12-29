// src/pages/admin/PostModeration.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getPosts, getPostDetail, deletePost } from "../../../api/PostApi";

const pick = (obj, keys, fallback = "") => {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "")
      return obj[k];
  }
  return fallback;
};

const formatDate = (v) => {
  if (!v) return "-";
  // createdAt이 ISO string / timestamp / LocalDateTime string 등일 수 있어 방어적으로 처리
  const d = new Date(v);
  if (!Number.isNaN(d.getTime())) return d.toLocaleString();
  return String(v);
};

const PostModeration = () => {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [boardType, setBoardType] = useState("ALL");

  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("게시글 목록을 불러오지 못했습니다. (CORS/경로/서버 확인)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return posts.filter((p) => {
      const t = String(
        pick(p, ["boardType", "type", "category"], "")
      ).toUpperCase();
      const title = String(pick(p, ["title", "postTitle"], "")).toLowerCase();
      const content = String(
        pick(p, ["content", "postContent"], "")
      ).toLowerCase();
      const writer = String(
        pick(p, ["nickname", "writer", "userName", "email"], "")
      ).toLowerCase();

      const typeOk = boardType === "ALL" ? true : t === boardType;
      const keywordOk = !k
        ? true
        : title.includes(k) || content.includes(k) || writer.includes(k);
      return typeOk && keywordOk;
    });
  }, [posts, keyword, boardType]);

  const onSelect = async (p) => {
    const id = pick(p, ["postId", "id", "post_id"]);
    if (!id) return;

    setSelectedId(id);
    setDetail(null);

    try {
      setDetailLoading(true);
      const d = await getPostDetail(id);
      setDetail(d);
    } catch (e) {
      console.error(e);
      // 상세 API가 없거나 DTO가 다르면 목록 데이터로라도 보여주기
      setDetail(p);
    } finally {
      setDetailLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    try {
      await deletePost(id);
      await load();
      if (selectedId === id) {
        setSelectedId(null);
        setDetail(null);
      }
    } catch (e) {
      console.error(e);
      alert("삭제 실패 (서버/권한/경로 확인)");
    }
  };

  return (
    <div className="w-full">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">게시글 관리</h2>
          <p className="text-sm text-gray-500">
            목록 조회 · 검색 · 상세 확인 · 삭제
          </p>
        </div>
        <button
          onClick={load}
          className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
        >
          새로고침
        </button>
      </div>

      {/* 필터 */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <select
          value={boardType}
          onChange={(e) => setBoardType(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white text-sm"
        >
          <option value="ALL">전체</option>
          <option value="FREE">FREE</option>
          <option value="DEPT">DEPT</option>
          <option value="NOTICE">NOTICE</option>
        </select>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="제목/내용/작성자 검색"
          className="flex-1 px-3 py-2 rounded-lg border text-sm"
        />
      </div>

      {/* 본문: 좌(리스트) + 우(상세) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 리스트 */}
        <div className="lg:col-span-2 rounded-2xl border bg-white overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="text-sm font-semibold">
              목록 <span className="text-gray-500">({filtered.length})</span>
            </div>
            {loading && (
              <div className="text-xs text-gray-500">불러오는 중...</div>
            )}
          </div>

          {error ? (
            <div className="p-4 text-sm text-red-600">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              표시할 게시글이 없습니다.
            </div>
          ) : (
            <div className="divide-y">
              {filtered.map((p, idx) => {
                const id = pick(p, ["postId", "id", "post_id"]);
                const title = pick(p, ["title", "postTitle"], "(제목 없음)");
                const type = String(
                  pick(p, ["boardType", "type", "category"], "-")
                ).toUpperCase();
                const writer = pick(
                  p,
                  ["nickname", "writer", "userName", "email"],
                  "-"
                );
                const createdAt = formatDate(
                  pick(p, ["createdAt", "created_at", "regDate", "createdDate"])
                );

                const active = String(id) === String(selectedId);

                return (
                  <button
                    key={id ?? idx}
                    onClick={() => onSelect(p)}
                    className={[
                      "w-full text-left px-4 py-3 hover:bg-gray-50",
                      active ? "bg-gray-50" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full border bg-white">
                            {type}
                          </span>
                          <span className="font-semibold truncate">
                            {title}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                          <span>작성자: {writer}</span>
                          <span>작성일: {createdAt}</span>
                          <span>ID: {id ?? "-"}</span>
                        </div>
                      </div>

                      {id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(id);
                          }}
                          className="shrink-0 text-xs px-2 py-1 rounded-lg border bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 상세 */}
        <div className="rounded-2xl border bg-white overflow-hidden">
          <div className="px-4 py-3 border-b">
            <div className="text-sm font-semibold">상세</div>
          </div>

          {!selectedId ? (
            <div className="p-8 text-center text-sm text-gray-500">
              왼쪽에서 게시글을 선택하세요.
            </div>
          ) : detailLoading ? (
            <div className="p-4 text-sm text-gray-500">상세 불러오는 중...</div>
          ) : !detail ? (
            <div className="p-4 text-sm text-gray-500">
              상세 데이터가 없습니다.
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">제목</div>
                <div className="font-bold">
                  {pick(detail, ["title", "postTitle"], "(제목 없음)")}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full border bg-white">
                  {String(
                    pick(detail, ["boardType", "type", "category"], "-")
                  ).toUpperCase()}
                </span>
                <span className="px-2 py-1 rounded-full border bg-white">
                  작성자:{" "}
                  {pick(
                    detail,
                    ["nickname", "writer", "userName", "email"],
                    "-"
                  )}
                </span>
                <span className="px-2 py-1 rounded-full border bg-white">
                  작성일:{" "}
                  {formatDate(
                    pick(detail, [
                      "createdAt",
                      "created_at",
                      "regDate",
                      "createdDate",
                    ])
                  )}
                </span>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">내용</div>
                <div className="text-sm whitespace-pre-wrap leading-6">
                  {pick(detail, ["content", "postContent"], "(내용 없음)")}
                </div>
              </div>

              <details className="text-xs text-gray-500">
                <summary className="cursor-pointer">원본 데이터 보기</summary>
                <pre className="mt-2 p-2 rounded-lg bg-gray-50 overflow-auto">
                  {JSON.stringify(detail, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModeration;
