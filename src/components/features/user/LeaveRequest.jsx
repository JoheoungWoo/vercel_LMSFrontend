import React, { useState } from "react";

const LeaveRequest = () => {
  /** 신청 목록 (더미) */
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "결석",
      date: "2025-09-18",
      reason: "몸살로 인한 병원 진료",
      status: "대기",
    },
    {
      id: 2,
      type: "조퇴",
      date: "2025-09-10",
      reason: "가족 행사",
      status: "승인",
    },
    {
      id: 3,
      type: "공결",
      date: "2025-09-05",
      reason: "공모전 참가",
      status: "반려",
    },
  ]);

  /** 신규 신청 폼 */
  const [form, setForm] = useState({
    type: "결석",
    date: "",
    reason: "",
  });

  /** 신청 등록 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.reason.trim()) return;

    setRequests((prev) => [
      {
        id: Date.now(),
        ...form,
        status: "대기",
      },
      ...prev,
    ]);

    setForm({
      type: "결석",
      date: "",
      reason: "",
    });
  };

  /** 신청 취소 (대기 상태만 가능) */
  const cancelRequest = (id) => {
    if (!window.confirm("신청을 취소하시겠습니까?")) return;
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
      <h1 className="mb-2 text-2xl font-bold">결석 · 공결 신청</h1>
      <p className="mb-4 text-sm text-slate-500">
        결석, 조퇴, 공결에 대한 사유를 등록하고 처리 상태를 확인합니다.
      </p>

      {/* 신청 폼 */}
      <div className="mb-6 rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">
          신청 작성
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-3">
          <select
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, type: e.target.value }))
            }
            className="rounded border px-3 py-2 text-sm"
          >
            <option value="결석">결석</option>
            <option value="조퇴">조퇴</option>
            <option value="공결">공결</option>
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, date: e.target.value }))
            }
            className="rounded border px-3 py-2 text-sm"
          />

          <input
            type="text"
            placeholder="사유 입력"
            value={form.reason}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, reason: e.target.value }))
            }
            className="rounded border px-3 py-2 text-sm md:col-span-3"
          />

          <div className="md:col-span-3 text-right">
            <button
              type="submit"
              className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              신청 제출
            </button>
          </div>
        </form>
      </div>

      {/* 신청 목록 */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">유형</th>
              <th className="px-4 py-2 text-left">날짜</th>
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
                <td className="px-4 py-2 font-medium">{r.type}</td>
                <td className="px-4 py-2">{r.date}</td>
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
                  colSpan={5}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  신청 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[0.75rem] text-slate-400">
        ※ 실제 서비스에서는 증빙 파일 업로드 및 교수/관리자 승인 절차가
        포함됩니다.
      </p>
    </div>
  );
};

export default LeaveRequest;

