import React, { useEffect, useState } from "react";
import NoticeApi from "../../../api/NoticeApi";

const getId = (n) => n?.noticeId ?? n?.id ?? null;

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadTick, setReloadTick] = useState(0);

  // 공지 목록 조회
  useEffect(() => {
    setLoading(true);

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
      setNotices([]);
      setLoading(false);
      return;
    }

    fetchAll()
      .then((res) => {
        const payload = res?.data ?? res;

        let data = [];
        if (Array.isArray(payload)) data = payload;
        else if (Array.isArray(payload?.data)) data = payload.data;
        else if (Array.isArray(payload?.content)) data = payload.content;
        else if (Array.isArray(payload?.result)) data = payload.result;

        // id 정규화
        setNotices(data.map((n) => ({ ...n, id: getId(n) })));
      })
      .catch((err) => {
        console.error("공지 불러오기 실패:", err);
        setNotices([]);
      })
      .finally(() => setLoading(false));
  }, [reloadTick]);

  return (
    <div className="space-y-4 text-[0.85rem]">
      {/* 상단 안내 */}
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
        ※ 학사 및 수업 관련 주요 공지사항을 확인할 수 있습니다.
      </div>

      {/* 공지 목록 */}
      <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
        <h3 className="mb-3 font-semibold text-slate-800">공지사항</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-2 py-2 w-12 text-center">번호</th>
                <th className="px-2 py-2">제목</th>
                <th className="px-2 py-2">작성자</th>
                <th className="px-2 py-2 text-center">작성일</th>
                <th className="px-2 py-2 text-center">조회수</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">
                    불러오는 중…
                  </td>
                </tr>
              )}

              {!loading &&
                notices.map((n, idx) => (
                  <tr
                    key={n.id}
                    className={`border-b border-slate-100 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    } hover:bg-slate-50 cursor-pointer`}
                  >
                    <td className="px-2 py-2 text-center text-slate-500">
                      {n.importance === "HIGH" ? (
                        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[0.7rem] text-rose-600">
                          중요
                        </span>
                      ) : (
                        notices.length - idx
                      )}
                    </td>

                    <td className="px-2 py-2 text-slate-800">
                      <div className="flex items-center gap-2">
                        {n.importance === "HIGH" && (
                          <span className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[0.65rem] text-rose-600">
                            중요
                          </span>
                        )}
                        <span className="font-medium">{n.title}</span>
                      </div>
                    </td>

                    <td className="px-2 py-2 text-slate-700">
                      {n.author}
                    </td>

                    <td className="px-2 py-2 text-center text-slate-600">
                      {n.createdAt}
                    </td>

                    <td className="px-2 py-2 text-center text-slate-600">
                      {n.views}
                    </td>
                  </tr>
                ))}

              {!loading && notices.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-4 text-center text-slate-400"
                  >
                    등록된 공지사항이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-[0.75rem] text-slate-400">
        ※ 중요 공지는 상단에 고정되어 표시될 수 있습니다.
      </p>
    </div>
  );
};

export default NoticeList;
