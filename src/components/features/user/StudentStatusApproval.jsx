import React, { useState } from "react";
import { useSelector } from "react-redux";

const StudentStatusSystem = () => {
  const user = useSelector((state) => state.loginSlice);
  const role = user?.role || "USER";

  console.log("현재 사용자 ROLE:", role);

  const isAdmin = role === "ADMIN";
  const [activeTab, setActiveTab] = useState("leave");

  // 결석·공결 신청
  const [leaveRequests, setLeaveRequests] = useState([
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
  ]);
  const [leaveForm, setLeaveForm] = useState({
    type: "결석",
    date: "",
    reason: "",
  });

  // 복학 신청
  const [returnRequests, setReturnRequests] = useState([
    { id: 1, semester: "2025-2학기", reason: "휴학 사유 해소", status: "대기" },
    { id: 2, semester: "2024-2학기", reason: "군 복무 종료", status: "승인" },
  ]);
  const [returnForm, setReturnForm] = useState({ semester: "", reason: "" });

  const submitLeave = () => {
    if (!leaveForm.date || !leaveForm.reason.trim()) return;
    setLeaveRequests((prev) => [
      { id: Date.now(), ...leaveForm, status: "대기" },
      ...prev,
    ]);
    setLeaveForm({ type: "결석", date: "", reason: "" });
  };

  const submitReturn = () => {
    if (!returnForm.semester || !returnForm.reason.trim()) return;
    setReturnRequests((prev) => [
      { id: Date.now(), ...returnForm, status: "대기" },
      ...prev,
    ]);
    setReturnForm({ semester: "", reason: "" });
  };

  const handleApproval = (type, id, decision) => {
    if (type === "leave") {
      setLeaveRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: decision } : r))
      );
    } else {
      setReturnRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: decision } : r))
      );
    }
  };

  const statusColor = (status) => {
    if (status === "승인") return "bg-green-100 text-green-700";
    if (status === "반려") return "bg-red-100 text-red-600";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        학적 관리{" "}
        {isAdmin && <span className="text-sm text-gray-500">(관리자)</span>}
      </h1>

      {/* 탭 */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("leave")}
          className={`px-4 py-2 font-medium ${
            activeTab === "leave"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          결석·공결 신청
        </button>
        <button
          onClick={() => setActiveTab("return")}
          className={`px-4 py-2 font-medium ${
            activeTab === "return"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          복학 신청
        </button>
      </div>

      {/* 결석·공결 신청 */}
      {activeTab === "leave" && (
        <div className="space-y-6">
          {!isAdmin && (
            <div className="border rounded-lg p-4 bg-white">
              <h2 className="font-semibold mb-4">신청 작성</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={leaveForm.type}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="border rounded px-3 py-2"
                  >
                    <option value="결석">결석</option>
                    <option value="조퇴">조퇴</option>
                    <option value="공결">공결</option>
                  </select>
                  <input
                    type="date"
                    value={leaveForm.date}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="사유 입력"
                    value={leaveForm.reason}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    className="border rounded px-3 py-2"
                  />
                </div>
                <button
                  onClick={submitLeave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  신청 제출
                </button>
              </div>
            </div>
          )}

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">유형</th>
                  <th className="px-4 py-2 text-left">날짜</th>
                  <th className="px-4 py-2 text-left">사유</th>
                  <th className="px-4 py-2 text-center">상태</th>
                  {isAdmin && <th className="px-4 py-2 text-center">관리</th>}
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-2">{r.type}</td>
                    <td className="px-4 py-2">{r.date}</td>
                    <td className="px-4 py-2">{r.reason}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs ${statusColor(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-2 text-center">
                        {r.status === "대기" ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() =>
                                handleApproval("leave", r.id, "승인")
                              }
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              승인
                            </button>
                            <button
                              onClick={() =>
                                handleApproval("leave", r.id, "반려")
                              }
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                            >
                              반려
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            처리완료
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 복학 신청 */}
      {activeTab === "return" && (
        <div className="space-y-6">
          {!isAdmin && (
            <div className="border rounded-lg p-4 bg-white">
              <h2 className="font-semibold mb-4">복학 신청 작성</h2>
              <div className="space-y-3">
                <select
                  value={returnForm.semester}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      semester: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">복학 희망 학기 선택</option>
                  <option value="2025-1학기">2025-1학기</option>
                  <option value="2025-2학기">2025-2학기</option>
                  <option value="2026-1학기">2026-1학기</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="복학 사유를 입력하세요"
                  value={returnForm.reason}
                  onChange={(e) =>
                    setReturnForm((prev) => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                />
                <button
                  onClick={submitReturn}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  복학 신청
                </button>
              </div>
            </div>
          )}

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">복학 학기</th>
                  <th className="px-4 py-2 text-left">사유</th>
                  <th className="px-4 py-2 text-center">상태</th>
                  {isAdmin && <th className="px-4 py-2 text-center">관리</th>}
                </tr>
              </thead>
              <tbody>
                {returnRequests.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-2">{r.semester}</td>
                    <td className="px-4 py-2">{r.reason}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs ${statusColor(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-2 text-center">
                        {r.status === "대기" ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() =>
                                handleApproval("return", r.id, "승인")
                              }
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              승인
                            </button>
                            <button
                              onClick={() =>
                                handleApproval("return", r.id, "반려")
                              }
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                            >
                              반려
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            처리완료
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentStatusSystem;
