// src/pages/admin/PostModeration.jsx
import React, { useEffect, useMemo, useState } from "react";
import PostApi from "../../../api/PostApi";

/* ================= 유틸 ================= */
const pick = (obj, keys, fallback = "") => {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "") {
      return obj[k];
    }
  }
  return fallback;
};

const formatDate = (v) => {
  if (!v) return "-";
  const d = new Date(v);
  if (!Number.isNaN(d.getTime())) return d.toLocaleString();
  return String(v);
};

/* ================= 컴포넌트 ================= */
const PostModeration = () => {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [boardType, setBoardType] = useState("ALL");

  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [reloadTick, setReloadTick] = useState(0);

  /* ================= 목록 조회 ================= */
  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const funcs = PostApi.config?.funcs || {};
      const fetchAll =
        funcs.all ||
        funcs.readAll ||
        funcs.getAll ||
        funcs.list ||
        funcs.readPage;

      if (!fetchAll) throw new Error("PostApi 전체 조회 함수 없음");

      const res = await fetchAll();
      const payload = res?.data ?? res;

      let data = [];
      if (Array.isArray(payload)) data = payload;
      else if (Array.isArray(payload?.data)) data = payload.data;
      else if (Array.isArray(payload?.content)) data = payload.content;
      else if (Array.isArray(payload?.result)) data = payload.result;

      setPosts(data);
    } catch (e) {
      console.error(e);
      setError("게시글 목록을 불러오지 못했습니다.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [reloadTick]);

  /* ================= 필터 ================= */
  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    return posts.filter((p) => {
      const type = String(
        pick(p, ["boardType", "type", "category"], "")
      ).toUpperCase();

      const title = String(pick(p, ["title", "postTitle"], "")).toLowerCase();
      const content = String(
        pick(p, ["content", "postContent"], "")
      ).toLowerCase();
      const writer = String(
        pick(p, ["nickname", "writer", "userName", "email"], "")
      ).toLowerCase();

      const typeOk = boardType === "ALL" ? true : type === boardType;
      const keywordOk = !k
        ? true
        : title.includes(k) ||
          content.includes(k) ||
          writer.includes(k);

      return typeOk && keywordOk;
    });
  }, [posts, keyword, boardType]);

  /* ================= 상세 ================= */
  const onSelect = async (p) => {
    const id = pick(p, ["postId", "id", "post_id"]);
    if (!id) return;

    setSelectedId(id);
    setDetail(null);

    try {
      setDetailLoading(true);

      const funcs = PostApi.config?.funcs || {};
      const fetchOne =
        funcs.one || funcs.readOne || funcs.getOne || funcs.detail;

      if (!fetchOne) {
        setDetail(p);
        return;
      }

      const res = await fetchOne(id);
      setDetail(res?.data ?? res);
    } catch (e) {
      console.error(e);
      setDetail(p);
    } finally {
      setDetailLoading(false);
    }
  };

  /* ================= 삭제 (Soft Delete 전제) ================= */
  const onDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      const funcs = PostApi.config?.funcs || {};
      const remove =
        funcs.delete ||
        funcs.remove ||
        funcs.deleteOne;

      if (!remove) {
        console.error("PostApi 삭제 함수 없음", funcs);
        return;
      }

      await remove(id);
      setReloadTick((v) => v + 1);

      if (selectedId === id) {
        setSelectedId(null);
        setDetail(null);
      }
    } catch (e) {
      console.error(e);
      alert("삭제 실패 (서버/권한 확인)");
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4 mt-4 shrink-0">
        <div>
          <h2 className="text-xl font-bold">게시글 관리</h2>
          <p className="text-sm text-gray-500">
            목록 조회 · 검색 · 상세 확인 · 삭제
          </p>
        </div>
        <button
          onClick={() => setReloadTick((v) => v + 1)}
          className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
        >
          새로고침
        </button>
      </div>

      {/* 필터 */}
      <div className="flex flex-col md:flex-row gap-2 mb-4 shrink-0">
        <select
          value={boardType}
          onChange={(e) => setBoardType(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white text-sm"
        >
          <option value="ALL">전체</option>
          <option value="FREE">FREE</option>
          <option value="NOTICE">NOTICE</option>
        </select>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="제목/내용/작성자 검색"
          className="flex-1 px-3 py-2 rounded-lg border text-sm"
        />
      </div>

      {/* 본문 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden">
        {/* 리스트 */}
        <div className="lg:col-span-2 rounded-2xl border bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b flex justify-between shrink-0">
            <div className="text-sm font-semibold">
              목록 ({filtered.length})
            </div>
            {loading && (
              <div className="text-xs text-gray-500">불러오는 중…</div>
            )}
          </div>

          {error ? (
            <div className="p-4 text-sm text-red-600">{error}</div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">
                  표시할 게시글이 없습니다.
                </div>
              ) : (
                filtered.map((p, idx) => {
                  const id = pick(p, ["postId", "id", "post_id"]);
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
                      <div className="flex justify-between gap-3">
                        <div>
                          <div className="font-semibold">
                            {pick(p, ["title", "postTitle"], "(제목 없음)")}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(
                              pick(p, ["createdAt", "created_at", "regDate"])
                            )}
                          </div>
                        </div>

                        {id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(id);
                            }}
                            className="text-xs px-2 py-1 rounded-lg border hover:text-red-600 hover:border-red-300"
                          >
                            삭제
                          </button>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* 상세 */}
        <div className="rounded-2xl border bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b text-sm font-semibold shrink-0">
            상세
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!selectedId ? (
              <div className="text-center text-sm text-gray-500">
                게시글을 선택하세요.
              </div>
            ) : detailLoading ? (
              <div className="text-sm text-gray-500">
                상세 불러오는 중…
              </div>
            ) : !detail ? (
              <div className="text-sm text-gray-500">
                상세 데이터 없음
              </div>
            ) : (
              <div className="space-y-3">
                <div className="font-bold">
                  {pick(detail, ["title", "postTitle"], "(제목 없음)")}
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {pick(detail, ["content", "postContent"], "(내용 없음)")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModeration;
