import React from "react";

const CourseNotice = () => {
  return (
    <div className="space-y-6">
      {/* ===== 강의 선택 ===== */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <label className="text-xs font-medium text-slate-600">강의 선택</label>
        <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm md:max-w-xs">
          <option>전체 강의</option>
          <option>웹 프로그래밍</option>
          <option>데이터베이스</option>
          <option>운영체제</option>
        </select>
      </div>

      {/* ===== 공지 리스트 ===== */}
      <div className="space-y-3">
        <NoticeItem
          title="📌 중간고사 일정 안내"
          course="웹 프로그래밍"
          date="2025-04-10"
          important
        />
        <NoticeItem
          title="과제 2 업로드 안내"
          course="데이터베이스"
          date="2025-04-08"
        />
        <NoticeItem
          title="보강 수업 일정 공지"
          course="운영체제"
          date="2025-04-05"
        />
      </div>

      {/* ===== 안내 문구 ===== */}
      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
        <p className="font-medium text-slate-600">💡 강의 공지 안내</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>중요 공지는 상단에 고정 표시됩니다.</li>
          <li>강의별 공지는 담당 교수님이 등록합니다.</li>
          <li>문의: 학과 사무실</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseNotice;

function NoticeItem({ title, course, date, important }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        important ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="mt-1 text-xs text-slate-500">{course}</p>
        </div>

        <div className="text-right">
          {important && (
            <span className="mb-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">
              중요
            </span>
          )}
          <p className="text-xs text-slate-400">{date}</p>
        </div>
      </div>
    </div>
  );
}
