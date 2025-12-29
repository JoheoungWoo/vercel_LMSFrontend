<div className="mt-6">
  <h3 className="text-xs font-semibold text-slate-700 mb-3">
    수강 중인 강의 선택
  </h3>

  <input
    type="text"
    placeholder="강의명 또는 교수명 검색"
    className="mb-4 w-full rounded-md border border-slate-200 px-3 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <div className="max-h-64 overflow-y-auto space-y-2 rounded-lg border border-slate-200 p-3">
    {/* 카드 반복 */}
  </div>
</div>
