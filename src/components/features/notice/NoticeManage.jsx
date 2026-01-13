import React, { useEffect, useMemo, useState } from "react";
import NoticeApi from "../../../api/NoticeApi";
import { useSelector } from "react-redux";

/* ================= 공통 ================= */
const EMPTY_FORM = {
  title: "",
  author: "",
  content: "",
  importance: "NORMAL",
  startDate: "",
  endDate: "",
};

const getId = (n) => n?.noticeId ?? n?.id ?? null;

const fmt = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

/* ================= 컴포넌트 ================= */
const NoticeManage = () => {
  const loginState = useSelector((state) => state.loginSlice);

  const [notices, setNotices] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);

  const [removeTick, setRemoveTick] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  /* ================= 목록 로딩 ================= */
  useEffect(() => {
    const funcs = NoticeApi.config?.funcs || {};
    const fetchAll =
      funcs.all ||
      funcs.readAll ||
      funcs.getAll ||
      funcs.list ||
      funcs.readPage;

    if (!fetchAll) return;

    fetchAll().then((res) => {
      const payload = res?.data ?? res;
      let data = [];

      if (Array.isArray(payload)) data = payload;
      else if (Array.isArray(payload?.data)) data = payload.data;
      else if (Array.isArray(payload?.content)) data = payload.content;
      else if (Array.isArray(payload?.result)) data = payload.result;

      setNotices(data.map((n) => ({ ...n, id: getId(n) })));
    });
  }, [removeTick]);

  /* ================= 검색 + 정렬 ================= */
  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    return notices
      .filter((n) => {
        if (!q) return true;
        return (
          (n?.title ?? "").toLowerCase().includes(q) ||
          (n?.content ?? "").toLowerCase().includes(q) ||
          (n?.nickname ?? n?.author ?? "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (a?.pinned && !b?.pinned) return -1;
        if (!a?.pinned && b?.pinned) return 1;
        return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
      });
  }, [notices, query]);

  /* ================= 페이징 ================= */
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));

  const pageData = filteredSorted.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query]);

  /* ================= 모달 ================= */
  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, author: loginState?.nickname ?? "" });
    setModalOpen(true);
  };

  const openEdit = (n) => {
    setEditing({ ...n, id: getId(n) });
    setForm({
      title: n?.title ?? "",
      author: loginState?.nickname ?? "",
      content: n?.content ?? "",
      importance: n?.importance ?? "NORMAL",
      startDate: n?.startDate ?? "",
      endDate: n?.endDate ?? "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  /* ================= API ================= */
  const saveNotice = async () => {
    if (editing?.id) {
      await NoticeApi.config.funcs.update(editing.id, {
        title: form.title,
        content: form.content,
        importance: form.importance,
      });
    } else {
      await NoticeApi.config.funcs.create({
        title: form.title,
        content: form.content,
        importance: form.importance,
        userId: loginState?.userId ?? null,
      });
    }
    closeModal();
    setRemoveTick((v) => v + 1);
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    await NoticeApi.config.funcs.delete(id);
    setRemoveTick((v) => v + 1);
  };

  const togglePin = (id) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  /* ================= JSX ================= */
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
      {/* 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <h1 className="text-3xl font-extrabold text-sky-800">공지사항</h1>

        <div className="flex w-full sm:w-auto gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="공지 검색…"
            className="w-full sm:w-64 rounded-xl border border-sky-200 px-3 py-2"
          />
          <button
            onClick={openCreate}
            className="rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold whitespace-nowrap"
          >
            공지 등록
          </button>
        </div>
      </div>

      {/* 리스트 */}
      <ul className="mt-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
        {pageData.map((n) => (
          <li key={n.id} className="rounded-2xl border p-5 shadow-sm">
            <header className="flex justify-between items-start gap-2">
              <h2 className="text-lg font-bold text-sky-800 break-words">
                {n.title}
              </h2>
              {/* {n.pinned && (
                <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  고정
                </span>
              )} */}
            </header>

            <p className="mt-2 text-sm text-sky-600">
              {(n.nickname ?? n.author) || ""} · {fmt(n.createdAt)}
            </p>

            <p className="mt-3 text-sky-900 break-words">
              {(n.content || "").length > 120
                ? n.content.slice(0, 120) + "…"
                : n.content}
            </p>

            <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
              {/* <span className="text-xs font-semibold text-sky-600">
                중요도: {n.importance}
              </span> */}

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(n)}
                  className="rounded-xl bg-sky-600 px-3 py-1.5 text-sm text-white"
                >
                  수정
                </button>
                <button
                  onClick={() => deleteNotice(n.id)}
                  className="rounded-xl bg-sky-100 px-3 py-1.5 text-sm text-sky-700"
                >
                  삭제
                </button>
                {/* <button
                  onClick={() => togglePin(n.id)}
                  className="rounded-xl border px-3 py-1.5 text-sm"
                >
                  {n.pinned ? "고정 해제" : "고정"}
                </button> */}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지 */}
      <div className="mt-8 flex justify-center gap-3">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          다음
        </button>
      </div>

      {/* 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-extrabold text-sky-800 mb-4">
              {editing ? "공지 수정" : "공지 등록"}
            </h2>

            <input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              placeholder="제목"
              className="w-full mb-2 rounded-xl border px-3 py-2"
            />

            <input
              value={form.author}
              readOnly
              className="w-full mb-2 rounded-xl border px-3 py-2 bg-slate-50"
            />

            <textarea
              value={form.content}
              onChange={(e) =>
                setForm((p) => ({ ...p, content: e.target.value }))
              }
              rows={6}
              placeholder="내용"
              className="w-full mb-3 rounded-xl border px-3 py-2"
            />

            <div className="flex justify-end gap-2">
              <button onClick={closeModal}>취소</button>
              <button
                onClick={saveNotice}
                className="rounded-xl bg-sky-600 px-4 py-2 text-white"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeManage;
