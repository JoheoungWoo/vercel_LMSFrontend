// src/pages/community/ExtracurricularCancelPage.js
import React, { useMemo, useState } from "react";

/** 날짜 포맷 */
const dt = (iso) =>
  new Date(iso).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });

/** 상태 계산 (신청 마감 기준) */
const getStatus = (p) => {
  if (p.cancelled) return "취소완료";
  const now = Date.now();
  if (new Date(p.applyUntil).getTime() < now) return "마감";
  const left = new Date(p.applyUntil).getTime() - now;
  if (left < 1000 * 60 * 60 * 24 * 2) return "마감임박";
  return "진행예정";
};

/** 더미: 내 신청 목록 */
const MY_APPLIES = [
  {
    id: 101,
    title: "리더십 캠프 1기",
    dept: "학생처",
    category: "리더십",
    startAt: new Date(Date.now() + 864e5 * 3).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 4).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 2).toISOString(),
    place: "체육관 세미나홀",
    point: 20,
    cancelled: false,
  },
  {
    id: 102,
    title: "현직자 취업 멘토링",
    dept: "취업지원센터",
    category: "취업",
    startAt: new Date(Date.now() + 864e5 * 7).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 7 + 36e5 * 3).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 6).toISOString(),
    place: "IT관 302",
    point: 5,
    cancelled: false,
  },
  {
    id: 103,
    title: "교내 봉사데이",
    dept: "사회봉사센터",
    category: "봉사",
    startAt: new Date(Date.now() + 864e5 * 1).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 1 + 36e5 * 5).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 1 - 36e5 * 12).toISOString(),
    place: "중앙광장",
    point: 10,
    cancelled: false,
  },
  {
    id: 104,
    title: "창업 아이디어톤",
    dept: "창업지원단",
    category: "창업",
    startAt: new Date(Date.now() + 864e5 * 11).toISOString(),
    endAt: new Date(Date.now() + 864e5 * 12).toISOString(),
    applyUntil: new Date(Date.now() + 864e5 * 10).toISOString(),
    place: "메이커스페이스",
    point: 15,
    cancelled: true, // 이미 취소된 예시
  },
];

const REASONS = [
  "개인 사정(일정 변경)",
  "건강 문제",
  "중복 신청/오신청",
  "다른 프로그램 선택",
  "기타",
];

export default function ExtracurricularCancelPage() {
  const [items, setItems] = useState(MY_APPLIES);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체"); // 전체/진행예정/마감임박/마감/취소완료
  const [sort, setSort] = useState("start"); // start | title | dept
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // 선택 상태
  const [checked, setChecked] = useState(() => new Set());
  // 취소 사유 (항목별 개별 입력)
  const [reasons, setReasons] = useState({});
  const setReason = (id, value) =>
    setReasons((p) => ({ ...p, [id]: { ...(p[id] || {}), reason: value } }));
  const setMemo = (id, value) =>
    setReasons((p) => ({ ...p, [id]: { ...(p[id] || {}), memo: value } }));

  // 모달 & 토스트
  const [confirmModal, setConfirmModal] = useState({ open: false, targets: [] });
  const [toast, setToast] = useState(null);

  /** 검색/필터/정렬 */
  const processed = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = items.filter((p) => {
      const status = getStatus(p);
      if (filter !== "전체" && status !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.dept.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.place.toLowerCase().includes(q)
      );
    });

    arr.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title, "ko");
      if (sort === "dept") return a.dept.localeCompare(b.dept, "ko");
      // start
      return new Date(a.startAt) - new Date(b.startAt);
    });

    return arr;
  }, [items, query, filter, sort]);

  /** 페이징 */
  const total = processed.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = processed.slice((page - 1) * pageSize, page * pageSize);

  /** 체크박스 */
  const toggle = (id) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const allIds = pageData.map((p) => p.id);
  const allChecked = allIds.every((id) => checked.has(id)) && allIds.length > 0;
  const toggleAll = () =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (allChecked) {
        allIds.forEach((id) => next.delete(id));
      } else {
        allIds.forEach((id) => next.add(id));
      }
      return next;
    });

  /** 취소 버튼 (모달 오픈) */
  const openCancelModal = (targetIds) => {
    if (targetIds.length === 0) return;
    setConfirmModal({ open: true, targets: targetIds });
  };

  /** 실제 취소 처리 */
  const doCancel = async () => {
    const targetIds = confirmModal.targets;
    // 간단 검증: 사유 필수
    const invalid = targetIds.filter((id) => !(reasons[id]?.reason || "").trim());
    if (invalid.length) {
      setToast({ type: "error", msg: "취소 사유를 입력해 주세요." });
      return;
    }

    // 서버 연동 예시:
    // await axios.post("/api/programs/cancel", { items: targetIds.map(id => ({ id, ...reasons[id] })) });

    setItems((prev) =>
      prev.map((p) =>
        targetIds.includes(p.id) ? { ...p, cancelled: true } : p
      )
    );
    setChecked((_) => new Set());
    setConfirmModal({ open: false, targets: [] });
    setToast({ type: "success", msg: `총 ${targetIds.length}건 취소 완료` });
    // 토스트 자동 숨김
    setTimeout(() => setToast(null), 2200);
  };

  /** 상태 뱃지 */
  const StatusBadge = ({ status }) => {
    const cls =
      status === "진행예정"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : status === "마감임박"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : status === "마감"
        ? "bg-slate-100 text-slate-600 border-slate-200"
        : "bg-rose-50 text-rose-700 border-rose-200";
    return (
      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      {/* 헤더/툴바 */}
      <div className="sticky top-0 z-10 border-b border-sky-100 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-sky-800">비교과 프로그램 취소</h1>
            <p className="text-sky-600 mt-1">내가 신청한 프로그램을 선택해 취소할 수 있어요.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            {/* 검색 */}
            <div className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-white px-3 py-2 shadow-sm">
              <svg aria-hidden viewBox="0 0 20 20" className="size-5 text-sky-500" fill="currentColor">
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l3.39 3.39a1 1 0 0 1-1.42 1.42l-3.38-3.4ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z" />
              </svg>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="제목/부서/장소 검색…"
                className="w-72 max-w-[68vw] bg-transparent outline-none placeholder:text-sky-400/80 text-sky-900"
                aria-label="검색"
              />
            </div>

            {/* 필터 */}
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sky-800 font-medium"
              aria-label="상태 필터"
            >
              {["전체", "진행예정", "마감임박", "마감", "취소완료"].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* 정렬 */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sky-800 font-medium"
              aria-label="정렬"
            >
              <option value="start">시작일순</option>
              <option value="title">제목순</option>
              <option value="dept">부서순</option>
            </select>

            {/* 선택 취소 */}
            <button
              onClick={() => openCancelModal([...checked])}
              disabled={[...checked].length === 0}
              className="rounded-xl bg-rose-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 disabled:opacity-40"
            >
              선택 취소
            </button>
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {pageData.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center text-sky-700">
            표시할 항목이 없습니다.
          </div>
        ) : (
          <>
            {/* 일괄 체크 */}
            <div className="mb-3 flex items-center gap-3 text-sky-700">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  className="size-4 accent-sky-600"
                />
                <span className="text-sm">이 페이지 전체 선택</span>
              </label>
              <span className="text-sm opacity-70">선택 {checked.size}건</span>
            </div>

            <ul className="space-y-4">
              {pageData.map((p) => {
                const status = getStatus(p);
                const disabled = status === "취소완료";
                const reasonVal = reasons[p.id]?.reason ?? "";
                const memoVal = reasons[p.id]?.memo ?? "";

                return (
                  <li
                    key={p.id}
                    className="rounded-3xl border border-sky-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <article className="p-5 sm:p-6">
                      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            disabled={disabled}
                            checked={checked.has(p.id)}
                            onChange={() => toggle(p.id)}
                            className="mt-1 size-4 accent-sky-600"
                            aria-label={`${p.title} 선택`}
                          />
                          <div className="min-w-0">
                            <h2 className="text-lg sm:text-xl font-bold text-sky-900">
                              {p.title}
                            </h2>
                            <div className="mt-1 text-sm text-sky-700 flex flex-wrap gap-x-2 gap-y-1">
                              <span className="font-semibold">{p.dept}</span>
                              <span className="opacity-50">•</span>
                              <span>{p.category}</span>
                              <span className="opacity-50">•</span>
                              <span>{p.place}</span>
                              <span className="opacity-50">•</span>
                              <span>
                                {dt(p.startAt)} ~ {dt(p.endAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <StatusBadge status={status} />
                          <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 border border-sky-200">
                            +{p.point}p
                          </span>
                        </div>
                      </header>

                      {/* 취소 사유 입력 */}
                      <div className="mt-4 grid gap-3 sm:grid-cols-5">
                        <label className="sm:col-span-2 flex flex-col gap-1">
                          <span className="text-sm font-semibold text-sky-700">
                            취소 사유<span className="text-rose-500">*</span>
                          </span>
                          <select
                            disabled={disabled}
                            value={reasonVal}
                            onChange={(e) => setReason(p.id, e.target.value)}
                            className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-sky-800 outline-none focus:ring-2 focus:ring-sky-300"
                          >
                            <option value="">선택하세요</option>
                            {REASONS.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="sm:col-span-3 flex flex-col gap-1">
                          <span className="text-sm font-semibold text-sky-700">메모 (선택)</span>
                          <input
                            disabled={disabled}
                            value={memoVal}
                            onChange={(e) => setMemo(p.id, e.target.value)}
                            className="rounded-xl border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                            placeholder="환불 계좌/연락 가능 시간 등"
                          />
                        </label>
                      </div>

                      {/* 액션 */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          disabled={disabled}
                          onClick={() => openCancelModal([p.id])}
                          className={`rounded-xl px-3.5 py-2 text-sm font-semibold ${
                            disabled
                              ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed"
                              : "bg-rose-600 text-white hover:bg-rose-700"
                          }`}
                        >
                          이 항목만 취소
                        </button>
                        <button
                          disabled={[...checked].length === 0}
                          onClick={() => openCancelModal([...checked])}
                          className="rounded-xl bg-rose-50 px-3.5 py-2 text-sm font-semibold text-rose-700 border border-rose-200 hover:bg-rose-100 disabled:opacity-40"
                        >
                          선택 항목 일괄 취소
                        </button>
                      </div>

                      {/* 환불/유의사항 */}
                      <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/50 p-3 text-xs text-sky-700">
                        ※ 마감 이후 취소 시 포인트 환급이 제한될 수 있으며, 프로그램별 규정이 다를 수 있습니다.
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            {/* 페이지네이션 */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-sm text-sky-700 disabled:opacity-40"
              >
                이전
              </button>
              <div className="text-sky-700 text-sm">
                {page} / {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-sm text-sky-700 disabled:opacity-40"
              >
                다음
              </button>
            </div>
          </>
        )}
      </main>

      {/* 확인 모달 */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-sky-900/25 backdrop-blur-sm"
            onClick={() => setConfirmModal({ open: false, targets: [] })}
          />
          <div className="relative z-40 w-full max-w-md rounded-2xl border border-sky-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
              <h3 className="text-lg font-bold text-sky-800">취소 확인</h3>
              <button
                className="rounded-xl px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-50"
                onClick={() => setConfirmModal({ open: false, targets: [] })}
              >
                닫기
              </button>
            </div>

            <div className="px-5 py-4 space-y-3">
              <p className="text-sky-900">
                선택한 <b>{confirmModal.targets.length}</b>건을 취소하시겠어요?
              </p>
              <ul className="max-h-40 overflow-auto text-sm text-sky-700 list-disc pl-5">
                {confirmModal.targets.map((id) => {
                  const it = items.find((x) => x.id === id);
                  return <li key={id}>{it?.title}</li>;
                })}
              </ul>
              <div className="rounded-xl bg-sky-50 border border-sky-100 p-3 text-xs text-sky-700">
                ※ 마감 이후 취소는 포인트 환급이 제한되며, 사유 미기재 시 접수가 거절될 수 있습니다.
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-sky-100 px-5 py-4">
              <button
                onClick={() => setConfirmModal({ open: false, targets: [] })}
                className="rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-50"
              >
                돌아가기
              </button>
              <button
                onClick={doCancel}
                className="rounded-xl bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                취소 확정
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className={`rounded-2xl px-4 py-2 shadow-lg text-white ${
              toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"
            }`}
          >
            {toast.msg}
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-sm text-sky-600/80">
        © {new Date().getFullYear()} Extracurricular Cancel
      </footer>
    </div>
  );
}
