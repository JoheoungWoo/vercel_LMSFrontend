export default function MyPostModalContentComponent() {
  return (
    <div className="space-y-4">
      {/* ===== 필터 영역 ===== */}
      <div className="flex flex-wrap gap-2 rounded-lg bg-slate-50 p-3">
        <select className="rounded-md border px-3 py-1.5 text-sm">
          <option>전체 게시판</option>
          <option>자유게시판</option>
          <option>질문게시판</option>
          <option>자료공유</option>
        </select>

        <select className="rounded-md border px-3 py-1.5 text-sm">
          <option>전체 상태</option>
          <option>공개</option>
          <option>비공개</option>
        </select>

        <select className="rounded-md border px-3 py-1.5 text-sm">
          <option>최신순</option>
          <option>조회순</option>
        </select>
      </div>

      {/* ===== 내가 쓴 글 리스트 ===== */}
      <div className="space-y-2">
        {/* 게시글 카드 */}
        <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50">
          <div className="space-y-1">
            <p className="font-medium text-slate-800">
              React 과제 질문 있습니다
            </p>
            <div className="flex gap-3 text-xs text-slate-500">
              <span>자유게시판</span>
              <span>2025-03-20</span>
              <span>조회 23</span>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-700">
                공개
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="rounded-md border px-2 py-1 text-xs hover:bg-slate-100">
              보기
            </button>
            <button className="rounded-md border px-2 py-1 text-xs hover:bg-slate-100">
              수정
            </button>
            <button className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-500 hover:bg-red-50">
              삭제
            </button>
          </div>
        </div>

        {/* 게시글 카드 2 */}
        <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50">
          <div className="space-y-1">
            <p className="font-medium text-slate-800">
              DB 설계 관련 조언 부탁드립니다
            </p>
            <div className="flex gap-3 text-xs text-slate-500">
              <span>질문게시판</span>
              <span>2025-03-18</span>
              <span>조회 45</span>
              <span className="rounded bg-slate-200 px-2 py-0.5 text-slate-600">
                비공개
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="rounded-md border px-2 py-1 text-xs hover:bg-slate-100">
              보기
            </button>
            <button className="rounded-md border px-2 py-1 text-xs hover:bg-slate-100">
              수정
            </button>
            <button className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-500 hover:bg-red-50">
              삭제
            </button>
          </div>
        </div>
      </div>

      {/* ===== Empty State (데이터 없을 때) ===== */}
      {/* 
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-slate-400">
        아직 작성한 게시글이 없습니다.
      </div>
      */}
    </div>
  );
}
