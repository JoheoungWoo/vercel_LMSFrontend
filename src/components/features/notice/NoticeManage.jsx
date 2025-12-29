import React, { useEffect, useMemo, useState } from "react";
import NoticeApi from "../../../api/NoticeApi";
import { useSelector } from "react-redux";

const EMPTY_FORM = {
  title: "",
  author: "",
  content: "",
  importance: "NORMAL",
  startDate: "",
  endDate: "",
};

const getId = (n) => n?.noticeId ?? n?.id ?? null;

/** 날짜 포맷 */
const fmt = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const NoticeManage = () => {
  const [notices, setNotices] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);

  const [removeTick, setRemoveTick] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // ✅ 너 프로젝트는 loginSlice.js 로그도 있었고, 지금은 state.loginSlice 쓰고 있음
  const loginState = useSelector((state) => state.loginSlice); // 그대로 둠

  const [loadingList, setLoadingList] = useState(false);

  const openEdit = (n) => {
    const id = getId(n);
    setEditing({ ...n, id });

    setForm({
      title: n?.title ?? "",
      author: loginState?.nickname ?? "", // ✅ 작성자는 로그인 닉네임으로 고정
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

  const remove = async (noticeId) => {
    if (!noticeId) return console.error("삭제 불가: noticeId 없음");
    await NoticeApi.config.funcs.remove(noticeId);
    setRemoveTick((v) => v + 1);
  };

  // ✅ 새 공지
  const openCreate = () => {
    setEditing(null);
    setForm({
      ...EMPTY_FORM,
      author: loginState?.nickname ?? "", // ✅ 여기서 한번에 세팅 (덮어쓰기 버그 제거)
    });
    setModalOpen(true);
  };

  // ✅ 고정 토글 (서버 기능 없으면 로컬만)
  const togglePin = async (id) => {
    setNotices((prev) =>
      prev.map((n) => (getId(n) === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  // ✅ 목록 로딩
  useEffect(() => {
    setLoadingList(true);

    const funcs = NoticeApi.config?.funcs || {};
    const fetchAll =
      funcs.all ||
      funcs.readAll ||
      funcs.getAll ||
      funcs.list ||
      funcs.readPage;

    if (!fetchAll) {
      console.error(
        "NoticeApi.config.funcs 안에 전체조회 함수가 없습니다.",
        funcs
      );
      setLoadingList(false);
      return;
    }

    fetchAll()
      .then((res) => {
        const payload = res?.data ?? res;

        let data;
        if (Array.isArray(payload)) data = payload;
        else if (Array.isArray(payload?.data)) data = payload.data;
        else if (Array.isArray(payload?.content)) data = payload.content;
        else if (Array.isArray(payload?.result)) data = payload.result;
        else data = [];

        // ✅ id 정규화 (렌더 key/토글 등에 사용)
        setNotices(data.map((n) => ({ ...n, id: getId(n) })));
      })
      .catch((err) => {
        console.error("공지 불러오기 실패:", err);
        setNotices([]);
      })
      .finally(() => setLoadingList(false));
  }, [removeTick]);

  /** 검색 + 정렬 */
  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    return notices
      .filter((n) => {
        if (!q) return true;
        const title = (n?.title ?? "").toLowerCase();
        const content = (n?.content ?? "").toLowerCase();
        const author = (n?.nickname ?? n?.author ?? "").toLowerCase(); // ✅ nickname 우선
        return title.includes(q) || content.includes(q) || author.includes(q);
      })
      .sort((a, b) => {
        if (a?.pinned && !b?.pinned) return -1;
        if (!a?.pinned && b?.pinned) return 1;
        return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
      });
  }, [notices, query]);

  /** 페이징 */
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const pageData = filteredSorted.slice((page - 1) * pageSize, page * pageSize);

  const saveNotice = async () => {
    try {
      // ✅ 서버 DTO에 맞게 payload 구성
      if (editing?.id) {
        // PUT /api/notice/update : body에 noticeId 포함
        const payload = {
          noticeId: editing.id,
          title: form.title,
          content: form.content,
        };
        await NoticeApi.config.funcs.update(payload);
      } else {
        // POST /api/notice/create : userId 같이 보내서 백엔드가 user 세팅
        const payload = {
          title: form.title,
          content: form.content,
          userId: loginState?.userId ?? null,
        };
        await NoticeApi.config.funcs.create(payload);
      }

      closeModal();
      setRemoveTick((v) => v + 1);
    } catch (e) {
      console.error("공지 저장 실패:", e);
    }
  };

  return (
    <div className="w-full max-w-[80%] max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
      {/* 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <h1 className="text-3xl font-extrabold text-sky-800">공지사항</h1>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="공지 검색…"
            className="rounded-xl border border-sky-200 px-3 py-2"
          />
          <button
            onClick={openCreate}
            className="rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold"
          >
            공지 등록
          </button>
        </div>
      </div>

      {/* 리스트 */}
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {pageData.map((n) => (
          <li
            key={n.id} // ✅ noticeId 기반
            className="rounded-2xl border border-sky-100 p-5 shadow-sm"
          >
            <header className="flex justify-between items-start">
              <h2 className="text-lg font-bold text-sky-800">{n.title}</h2>
              {n.pinned && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  고정
                </span>
              )}
            </header>

            <p className="mt-2 text-sm text-sky-600">
              {(n.nickname ?? n.author) || ""} · {fmt(n.createdAt)}
            </p>

            <p className="mt-3 text-sky-900">
              {(n.content || "").length > 120
                ? (n.content || "").slice(0, 120) + "…"
                : n.content}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs font-semibold text-sky-600">
                중요도: {n.importance ?? "NORMAL"}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(n)}
                  className="rounded-xl bg-sky-600 px-3 py-1.5 text-sm text-white"
                >
                  수정
                </button>
                <button
                  onClick={() => remove(n.id)} // ✅ noticeId로 삭제
                  className="rounded-xl bg-sky-100 px-3 py-1.5 text-sm text-sky-700"
                >
                  삭제
                </button>
                <button
                  onClick={() => togglePin(n.id)}
                  className="rounded-xl border px-3 py-1.5 text-sm"
                >
                  {n.pinned ? "고정 해제" : "고정"}
                </button>
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

      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="w-[520px] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-xl font-extrabold text-sky-800">
                {editing ? "공지 수정" : "공지 등록"}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-lg px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
              >
                닫기
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="제목"
                className="w-full rounded-xl border border-sky-200 px-3 py-2"
              />

              {/* ✅ 작성자는 nickname으로 자동 / 수정 불가 */}
              <input
                value={loginState?.nickname ?? form.author}
                readOnly
                placeholder="작성자"
                className="w-full rounded-xl border border-sky-200 px-3 py-2 bg-slate-50"
              />

              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                placeholder="내용"
                rows={6}
                className="w-full rounded-xl border border-sky-200 px-3 py-2"
              />

              <div className="flex gap-2">
                <select
                  value={form.importance}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, importance: e.target.value }))
                  }
                  className="w-full rounded-xl border border-sky-200 px-3 py-2"
                >
                  <option value="NORMAL">NORMAL</option>
                  <option value="HIGH">HIGH</option>
                </select>

                <button
                  onClick={closeModal}
                  className="rounded-xl bg-sky-100 px-4 py-2 text-sky-700 font-semibold"
                >
                  취소
                </button>

                <button
                  onClick={saveNotice}
                  className="rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold"
                >
                  {editing ? "수정 저장" : "공지 등록"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeManage;
