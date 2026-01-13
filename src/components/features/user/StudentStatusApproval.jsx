import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SSHistoryApi from "../../../api/SSHistoryApi";

const StudentStatusSystem = () => {
  const user = useSelector((state) => state.loginSlice);
  const isAdmin = user?.role === "ADMIN";

  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [form, setForm] = useState({
    changeType: "", // 원래대로 기본값 LEAVE
    reason: "",
    userId: "",
  });

  // 관리자용 데이터 조회
  const fetchData = () => {
    SSHistoryApi.config.funcs
      .readAll(user?.email)
      .then(setData)
      .catch(console.error);
  };

  // 학생용 데이터 조회
  const studentFetchData = (statusHistoryId = null) => {
    SSHistoryApi.config.funcs
      .findByKeywordHttp(
        "my",
        null,
        user.email,
        "get",
        statusHistoryId ? { statusHistoryId } : {}
      )
      .then(setData)
      .catch(console.error);
  };

  // 초기 로드
  useEffect(() => {
    if (user?.email) {
      if (isAdmin) {
        fetchData();
      } else {
        studentFetchData(); // 학생은 전체 목록 조회
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, isAdmin]);

  const submit = () => {
    // alert로 안내하고 제출 취소 (디자인 원복 요청 반영)
    if (!form.changeType) {
      alert("유형을 선택해주세요.");
      return;
    }

    if (!form.reason.trim()) {
      alert("사유를 입력해주세요.");
      return;
    }

    const payload = {
      ...form,
      userId: user.userId,
    };

    SSHistoryApi.config.funcs
      .writeOne(payload, user?.email)
      .then((response) => {
        console.log(payload);
        alert("제출 완료");
        setForm({ changeType: "", reason: "", userId: "" });

        if (response?.statusHistoryId) {
          studentFetchData(response.statusHistoryId);
        } else {
          studentFetchData();
        }
      })
      .catch(() => {
        alert("제출 실패");
      });
  };

  /* ================= ADMIN 전용 ================= */

  const handleApprove = (statusHistoryId) => {
    SSHistoryApi.config.funcs
      .findByKeywordHttp("approved", null, user.email, "post", {
        statusHistoryId,
      })
      .then(fetchData)
      .catch(console.error);
  };

  const handleReject = (statusHistoryId) => {
    SSHistoryApi.config.funcs
      .findByKeywordHttp("rejected", null, user.email, "post", {
        statusHistoryId,
      })
      .then(fetchData)
      .catch(console.error);
  };

  const pendingList = data.filter((v) => v.approveType === "대기");
  const completedList = data.filter((v) => v.approveType !== "대기");

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">학적 관리</h1>

      {/* ================= 관리자 UI ================= */}
      {isAdmin && (
        <>
          {/* 탭 */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("PENDING")}
              className={`px-4 py-2 rounded ${
                activeTab === "PENDING"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              미승인
            </button>

            <button
              onClick={() => setActiveTab("COMPLETED")}
              className={`px-4 py-2 rounded ${
                activeTab === "COMPLETED"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              승인/반려
            </button>
          </div>

          {/* 미승인 */}
          {activeTab === "PENDING" && (
            <div className="bg-white border rounded overflow-hidden overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">ID</th>
                    <th className="px-4 py-3 text-left text-sm">유저ID</th>
                    <th className="px-4 py-3 text-left text-sm">날짜</th>
                    <th className="px-4 py-3 text-left text-sm">유형</th>
                    <th className="px-4 py-3 text-left text-sm">사유</th>
                    <th className="px-4 py-3 text-left text-sm">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-6 text-center text-gray-400"
                      >
                        미승인 내역 없음
                      </td>
                    </tr>
                  ) : (
                    pendingList.map((item) => (
                      <tr key={item.statusHistoryId} className="border-t">
                        <td className="px-4 py-3">{item.statusHistoryId}</td>
                        <td className="px-4 py-3">{item.userId}</td>
                        <td className="px-4 py-3">{item.changeDate}</td>
                        <td className="px-4 py-3">{item.changeType}</td>
                        <td className="px-4 py-3">{item.reason}</td>
                        <td className="px-4 py-3 space-x-2">
                          <button
                            onClick={() => handleApprove(item.statusHistoryId)}
                            className="px-2 py-1 bg-green-500 text-white rounded"
                          >
                            승인
                          </button>
                          <button
                            onClick={() => handleReject(item.statusHistoryId)}
                            className="px-2 py-1 bg-red-500 text-white rounded"
                          >
                            반려
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 승인/반려 */}
          {activeTab === "COMPLETED" && (
            <div className="bg-white border rounded overflow-hidden overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">ID</th>
                    <th className="px-4 py-3 text-left text-sm">유저ID</th>
                    <th className="px-4 py-3 text-left text-sm">날짜</th>
                    <th className="px-4 py-3 text-left text-sm">유형</th>
                    <th className="px-4 py-3 text-left text-sm">사유</th>
                    <th className="px-4 py-3 text-left text-sm">결과</th>
                  </tr>
                </thead>
                <tbody>
                  {completedList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-6 text-center text-gray-400"
                      >
                        처리 내역 없음
                      </td>
                    </tr>
                  ) : (
                    completedList.map((item) => (
                      <tr key={item.statusHistoryId} className="border-t">
                        <td className="px-4 py-3">{item.statusHistoryId}</td>
                        <td className="px-4 py-3">{item.userId}</td>
                        <td className="px-4 py-3">{item.changeDate}</td>
                        <td className="px-4 py-3">{item.changeType}</td>
                        <td className="px-4 py-3">{item.reason}</td>
                        <td className="px-4 py-3">{item.approveType}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ================= 학생 신청 UI ================= */}
      {!isAdmin && (
        <>
          {/* 신청 폼 (학생) */}
          <div className="bg-white border rounded p-4 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <select
                value={form.changeType}
                onChange={(e) =>
                  setForm({ ...form, changeType: e.target.value })
                }
                className="border rounded px-3 py-2"
              >
                <option value="">선택해주세요</option>
                <option value="LEAVE">LEAVE</option>
                <option value="RETURN">RETURN</option>
                <option value="GRADUATED">GRADUATED</option>
                <option value="EXPELLED">EXPELLED</option>
              </select>

              <textarea
                placeholder="사유를 입력하세요"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                rows={6}
                className="border rounded px-3 py-2 resize-y"
              />
            </div>

            <button
              onClick={submit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              신청
            </button>
          </div>

          {/* 신청 내역 */}
          <div className="bg-white border rounded overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">유형</th>
                  <th className="px-4 py-3 text-left text-sm">날짜</th>
                  <th className="px-4 py-3 text-left text-sm">사유</th>
                  <th className="px-4 py-3 text-left text-sm">상태</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      신청 내역 없음
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.statusHistoryId} className="border-t">
                      <td className="px-4 py-3">{item.changeType}</td>
                      <td className="px-4 py-3">{item.changeDate}</td>
                      <td className="px-4 py-3">{item.reason}</td>
                      <td className="px-4 py-3">{item.approveType}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentStatusSystem;
