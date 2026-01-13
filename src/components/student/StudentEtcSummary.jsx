// src/components/student/StudentEtcSummary.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStudentGrade } from "../../hook/grade/useStudentGrade";
import UserApi from "../../api/UserApi";
import SSHistoryApi from "../../api/SSHistoryApi";

const StudentEtcSummary = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const email = loginState?.email;

  /* ================= 성적 요약 ================= */
  const { gpaInfo } = useStudentGrade(email);

  /* ================= 내 정보 요약 ================= */
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    if (!email) return;
    UserApi.config.funcs
      .findByKeyword("my", email)
      .then(setUserInfo)
      .catch(() => {});
  }, [email]);

  /* ================= 학적 요약 ================= */
  const [statusCount, setStatusCount] = useState(0);
  const [latestHistory, setLatestHistory] = useState(null);

  useEffect(() => {
    if (!email) return;
    SSHistoryApi.config.funcs
      .findByKeywordHttp("my", null, email, "get")
      .then((res) => {
        const list = res || [];
        setStatusCount(list.length);

        const latest = list.sort(
          (a, b) => new Date(b.changeDate) - new Date(a.changeDate)
        )[0];

        setLatestHistory(latest || null);
      })
      .catch(() => {});
  }, [email]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 space-y-6">
      <h3 className="text-lg font-bold text-gray-800">학사 요약</h3>

      {/* 성적 */}
      <div className="rounded-xl bg-indigo-50 p-4">
        <p className="text-sm text-indigo-600 font-semibold">성적</p>
        <p className="text-2xl font-bold text-indigo-800">
          GPA {gpaInfo?.gpa ?? "-"}
        </p>
        <p className="text-xs text-indigo-500">
          취득학점 {gpaInfo?.totalCredit ?? 0} / 과목{" "}
          {gpaInfo?.subjectCount ?? 0}
        </p>
      </div>

      {/* 내 정보 */}
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm text-slate-600 font-semibold">내 정보</p>
        <p className="font-bold text-slate-800">{userInfo.nickname}</p>
        <p className="text-xs text-slate-500">
          {userInfo.deptName} · {userInfo.studentNumber}
        </p>
      </div>

      {/* 학적 */}
      <div className="rounded-xl bg-emerald-50 p-4 space-y-1">
        <p className="text-sm text-emerald-600 font-semibold">학적 신청</p>

        <p className="text-2xl font-bold text-emerald-700">{statusCount}건</p>

        {latestHistory ? (
          <>
            <p className="text-xs text-emerald-700">
              최근 신청: {latestHistory.changeType} ·{" "}
              {latestHistory.approveType}
            </p>
            <p className="text-xs text-emerald-600 truncate">
              사유: {latestHistory.reason}
            </p>
            <p className="text-[11px] text-emerald-500">
              신청일: {latestHistory.changeDate}
            </p>
          </>
        ) : (
          <p className="text-xs text-emerald-500">진행 중인 신청 없음</p>
        )}
      </div>
    </div>
  );
};

export default StudentEtcSummary;
