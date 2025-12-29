import React, { useState } from "react";

const ReturnRequest = () => {
  /** 복학 신청 목록 (더미) */
  const [requests, setRequests] = useState([
    {
      id: 1,
      semester: "2025-2학기",
      reason: "휴학 사유 해소 및 복학 준비 완료",
      status: "대기",
    },
    {
      id: 2,
      semester: "2024-2학기",
      reason: "군 복무 종료",
      status: "승인",
    },
    {
      id: 3,
      semester: "2024-1학기",
      reason: "개인 사정",
      status: "반려",
    },
  ]);

  /** 신청 폼 */
  const [form, setForm] = useState({
    semester: "",
    reason: "",
  });

  /** 신청 등록 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.semester || !form.reason.trim()) return;

    setRequests((prev) => [
      {
        id: Date.now(),
        semester: form.semester,
        reason: form.reason,
        status: "대기",
      },
      ...prev,
    ]);

    setForm({ semester: "", reason: "" });
  };

  /** 신청 취소 (대기 상태만 가능) */
  const cancelRequest = (id) => {
    if (!window.confirm("복학 신청을 취소하시겠습니까?")) return;
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  /** 상태 뱃지 */
  const statusBadge = (status) => {
    if (status === "승인")
      return "bg-emerald-100 text-emerald-700";
    if (status === "반려")
      return "bg-red-100 text-red-600";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">복학 신청</h1>
      <p className="mb-4 text-sm text-slate-500">
        휴학 이후 복학을 희망하는 학기를 선택하여 신청합니다.
      </p>

      {/* 신청 폼 */}
      <div className="mb-6 rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">
          복학 신청 작성
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            value={form.semester}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, semester: e.target.value }))
            }
            className="w-full rounded border px-3 py-2 text-sm"
          >
            <option value="">복학 희망 학기 선택</option>
            <option value="2025-1학기">2025-1학기</option>
            <option value="2025-2학기">2025-2학기</option>
            <option value="2026-1학기">2026-1학기</option>
          </select>

          <textarea
            rows={3}
            placeholder="복학 사유를 입력하세요"
            value={form.reason}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, reason: e.target.value }))
            }
            className="w-full rounded border px-3 py-2 text-sm resize-none"
          />

          <div className="text-right">
            <button
              type="submit"
              className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              복학 신청
            </button>
          </div>
        </form>
      </div>

      {/* 신청 목록 */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">복학 학기</th>
              <th className="px-4 py-2 text-left">사유</th>
              <th className="px-4 py-2 text-center">상태</th>
              <th className="px-4 py-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr
                key={r.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-2 font-medium">{r.semester}</td>
                <td className="px-4 py-2 text-slate-700">{r.reason}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadge(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {r.status === "대기" ? (
                    <button
                      onClick={() => cancelRequest(r.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      취소
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  복학 신청 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 학적 상태(휴학 여부) 검증 후 승인 처리됩니다.
      </p>
    </div>
  );
};

export default ReturnRequest;

