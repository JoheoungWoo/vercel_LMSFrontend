import React, { useState } from "react";

const SearchHistory = () => {
  const [keyword, setKeyword] = useState("");
  const [history, setHistory] = useState([]);

  /** 검색 실행 */
  const handleSearch = () => {
    if (!keyword.trim()) return;

    setHistory((prev) => {
      // 이미 존재하는 검색어 제거
      const filtered = prev.filter((k) => k !== keyword);

      // 최신 검색어 맨 앞에 추가
      const updated = [keyword, ...filtered];

      // 최대 10개까지만 유지
      return updated.slice(0, 10);
    });

    console.log("검색 실행:", keyword);
    setKeyword("");
  };

  /** 엔터키 검색 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /** 개별 삭제 */
  const removeKeyword = (target) => {
    setHistory((prev) => prev.filter((k) => k !== target));
  };

  /** 전체 삭제 */
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-xl rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-semibold text-slate-800">
        검색 기록
      </h2>

      {/* 검색 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어 입력"
          className="flex-1 rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-400"
        />
        <button
          onClick={handleSearch}
          className="rounded-md bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-600"
        >
          검색
        </button>
      </div>

      {/* 검색 기록 리스트 */}
      <div className="mt-3 space-y-2 text-sm">
        {history.length === 0 ? (
          <p className="text-center text-slate-400">
            검색 기록이 없습니다.
          </p>
        ) : (
          history.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-md border bg-slate-50 px-3 py-2"
            >
              {/* 검색어 클릭 → 다시 검색 */}
              <button
                onClick={() => console.log("다시 검색:", item)}
                className="text-left text-slate-700 hover:underline"
              >
                {item}
              </button>

              {/* 삭제 */}
              <button
                onClick={() => removeKeyword(item)}
                className="text-xs text-red-500 hover:underline"
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>

      {/* 전체 삭제 */}
      {history.length > 0 && (
        <div className="mt-3 text-right">
          <button
            onClick={clearHistory}
            className="text-xs text-slate-500 hover:underline"
          >
            전체 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
