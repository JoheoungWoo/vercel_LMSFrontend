import React from "react";

const ProfessorCourseManagementPage = () => {
  const courses = [
    {
      id: 1,
      code: "CS301",
      name: "웹 프로그래밍",
      type: "전공",
      semester: "2025-2학기",
      dayTime: "월 · 수 09:00 ~ 10:15",
      room: "IT관 301호",
      enrolled: 42,
      status: "진행 중",
    },
    {
      id: 2,
      code: "CS220",
      name: "자료구조",
      type: "전공",
      semester: "2025-2학기",
      dayTime: "화 · 목 10:30 ~ 11:45",
      room: "IT관 204호",
      enrolled: 38,
      status: "진행 중",
    },
    {
      id: 3,
      code: "GE101",
      name: "대학생활과 진로",
      type: "교양",
      semester: "2025-2학기",
      dayTime: "금 13:00 ~ 14:30",
      room: "본관 102호",
      enrolled: 60,
      status: "준비 중",
    },
  ];

  const todayLectures = [
    {
      id: 1,
      time: "09:00 ~ 10:15",
      courseName: "웹 프로그래밍",
      room: "IT관 301호",
      note: "2주차: React 컴포넌트 기초",
    },
    {
      id: 2,
      time: "10:30 ~ 11:45",
      courseName: "자료구조",
      room: "IT관 204호",
      note: "연결 리스트 실습",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            강의 · 수업 관리 (교수)
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            담당 강의를 조회하고, 수업 일정 · 과제 · 공지 · 학생 관리를 한 곳에서
            확인할 수 있습니다.
          </p>
        </header>

        {/* 상단 요약 카드 */}
        <section className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">이번 학기 담당 강의 수</p>
            <p className="mt-1 text-xl font-semibold text-slate-800">
              {courses.length}개
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              전공 · 교양 강의를 포함한 전체 담당 과목 수입니다.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">오늘 수업</p>
            <p className="mt-1 text-xl font-semibold text-slate-800">
              {todayLectures.length}개
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              오늘 예정된 강의 시간과 강의실을 확인하세요.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">학기 정보</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              2025-2학기
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              학기별 강의 계획과 수업 자료는 각 강의 상세 페이지에서 관리합니다.
            </p>
          </div>
        </section>

        {/* 메인 레이아웃 */}
        <main className="grid gap-5 lg:grid-cols-[2fr,1.4fr]">
          {/* 왼쪽: 담당 강의 목록 */}
          <section className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              이번 학기 담당 강의
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              담당 중인 강의 목록입니다. 과제, 공지, 성적·출석 관리는 각 강의에서
              진행할 수 있습니다.
            </p>

            <div className="mt-3 space-y-3">
              {courses.map((c) => (
                <article
                  key={c.id}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-[0.8rem] text-slate-700"
                >
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-900">
                          {c.name}
                        </span>
                        <span className="rounded-full bg-slate-200 px-2 py-[2px] text-[0.65rem] text-slate-700">
                          {c.code}
                        </span>
                        <span className="rounded-full bg-sky-50 px-2 py-[2px] text-[0.65rem] text-sky-700">
                          {c.type}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.75rem] text-slate-600">
                        {c.semester} · {c.dayTime} · {c.room}
                      </p>
                      <p className="mt-1 text-[0.75rem] text-slate-500">
                        수강 인원: {c.enrolled}명 · 상태: {c.status}
                      </p>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2 md:mt-0 md:flex-col md:items-end">
                      <a
                        href="#"
                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1 text-[0.7rem] text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        강의 상세 / 강의계획서
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1 text-[0.7rem] text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        수업 자료 · 공지 관리
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1 text-[0.7rem] text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        성적 · 출석 관리
                      </a>
                    </div>
                  </div>
                </article>
              ))}

              {courses.length === 0 && (
                <p className="py-4 text-center text-[0.8rem] text-slate-400">
                  담당 중인 강의가 없습니다.
                </p>
              )}
            </div>
          </section>

          {/* 오른쪽: 오늘 수업 + 과제/공지 관리 요약 */}
          <section className="space-y-4">
            {/* 오늘 수업 일정 */}
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">
                오늘 수업 일정
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                오늘 진행 예정인 수업과 강의실 정보를 확인할 수 있습니다.
              </p>

              <div className="mt-3 space-y-2 text-[0.8rem] text-slate-700">
                {todayLectures.map((l) => (
                  <div
                    key={l.id}
                    className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <p className="text-[0.8rem] font-semibold text-slate-800">
                      {l.courseName}
                    </p>
                    <p className="text-[0.75rem] text-slate-600">
                      {l.time} · {l.room}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-slate-500">
                      오늘 수업 내용: {l.note}
                    </p>
                  </div>
                ))}
                {todayLectures.length === 0 && (
                  <p className="py-3 text-center text-[0.8rem] text-slate-400">
                    오늘 예정된 수업이 없습니다.
                  </p>
                )}
              </div>
            </div>

            {/* 과제 / 수업 공지 관리 더미 블록 */}
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">
                과제 · 수업 공지 관리
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                과제 등록, 마감일 관리, 수업 공지 등록은 강의별 관리 페이지에서
                진행합니다.
              </p>

              <ul className="mt-3 space-y-1.5 text-[0.8rem] text-slate-600">
                <li>· 새 과제 등록 및 마감일 설정</li>
                <li>· 제출 현황 확인 및 채점 진행</li>
                <li>· 수업 변경·휴강·보강 등 공지 등록</li>
              </ul>

              <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
                <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  과제 관리 페이지로 이동
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  수업 공지 관리 페이지로 이동
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* 하단 안내 */}
        <p className="mt-5 text-[0.75rem] text-slate-400">
          ※ 모든 데이터는 예시용 더미 값입니다. 실제 서비스에서는 교수 계정으로
          로그인한 사용자 정보를 기준으로 담당 강의 목록과 수업 일정을 불러와야 합니다.
        </p>
      </div>
    </div>
  );
};

export default ProfessorCourseManagementPage;
