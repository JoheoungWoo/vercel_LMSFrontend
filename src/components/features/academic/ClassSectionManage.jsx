import React, { useState } from "react";

const ClassSectionManage = () => {
  // ───────────────── 강의 기본정보 더미 ─────────────────
  const course = {
    code: "CS301",
    name: "웹 프로그래밍",
    semester: "2025-2학기",
    dayTime: "월 · 수 09:00 ~ 10:15",
    room: "IT관 301호",
    enrolled: 42,
  };

  // ───────────────── 주차별 강의 진행 상황 더미 ─────────────────
  const weeks = [
    {
      week: 1,
      title: "OT 및 웹 기본 개념",
      dateRange: "9/2 ~ 9/8",
      status: "완료",
      materials: ["강의자료_1주차.pdf", "OT_슬라이드.pptx"],
      note: "수업 운영 안내 및 프로젝트 개요 설명",
    },
    {
      week: 2,
      title: "HTML & CSS 기초",
      dateRange: "9/9 ~ 9/15",
      status: "완료",
      materials: ["강의자료_2주차.pdf"],
      note: "간단한 정적 페이지 실습",
    },
    {
      week: 3,
      title: "JavaScript 기초",
      dateRange: "9/16 ~ 9/22",
      status: "진행 중",
      materials: ["강의자료_3주차.pdf", "실습예제.zip"],
      note: "변수, 함수, DOM 조작 기초",
    },
    {
      week: 4,
      title: "React 컴포넌트 기초",
      dateRange: "9/23 ~ 9/29",
      status: "예정",
      materials: [],
      note: "컴포넌트, Props, 상태 소개",
    },
  ];

  const [selectedWeek, setSelectedWeek] = useState(3);
  const currentWeek = weeks.find((w) => w.week === selectedWeek) || weeks[0];

  // ───────────────── 강의자료 관리 더미 ─────────────────
  const [materials] = useState([
    {
      id: 1,
      week: 1,
      title: "강의자료_1주차.pdf",
      uploadedAt: "2025-09-02",
      type: "PDF",
    },
    {
      id: 2,
      week: 2,
      title: "강의자료_2주차.pdf",
      uploadedAt: "2025-09-09",
      type: "PDF",
    },
    {
      id: 3,
      week: 3,
      title: "실습예제.zip",
      uploadedAt: "2025-09-16",
      type: "ZIP",
    },
  ]);

  // ───────────────── 오늘 수업 더미 ─────────────────
  const todayClass = {
    date: "2025-09-18",
    time: "09:00 ~ 10:15",
    topic: "JavaScript 기초 (실습 중심)",
    plan: [
      "지난 시간 내용 간단 복습",
      "JavaScript 변수/함수 개념 정리",
      "DOM 조작 예제 코드 실습",
      "간단한 인터랙션 구현",
    ],
    todoForStudents: [
      "강의자료 3주차 사전 확인",
      "실습 코드 GitHub 업로드",
      "질문 사항은 수업 Q&A 게시판에 등록",
    ],
  };

  // ───────────────── 출석/과제 요약 더미 ─────────────────
  const stats = {
    attendanceRate: 95,
    latestAssignment: {
      title: "과제 1 - 개인 웹 페이지 제작",
      dueDate: "2025-09-22",
      submitted: 39,
      total: 42,
    },
  };

  // ───────────────── 실시간 수업 공지 ─────────────────
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "3주차 수업 안내",
      content: "오늘 수업은 실습 비중이 높으니 노트북 지참 바랍니다.",
      createdAt: "09:18 08:30",
    },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim())
      return;

    const newItem = {
      id: Date.now(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      createdAt: "지금 (더미)",
    };
    setAnnouncements((prev) => [newItem, ...prev]);
    setNewAnnouncement({ title: "", content: "" });
  };

  // ───────────────── 출석 체크 ─────────────────
  const initialStudents = [
    { id: 1, studentId: "20250001", name: "김학생", status: "출석" },
    { id: 2, studentId: "20250002", name: "이예제", status: "출석" },
    { id: 3, studentId: "20250003", name: "박테스트", status: "지각" },
    { id: 4, studentId: "20250004", name: "최샘플", status: "미등록" },
  ];
  const [attendance, setAttendance] = useState(initialStudents);

  const handleAttendanceChange = (id, value) => {
    setAttendance((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: value } : s))
    );
  };

  // ───────────────── 과제 공지/마감 ─────────────────
  const [assignments] = useState([
    {
      id: 1,
      title: "과제 1 - 개인 웹 페이지 제작",
      dueDate: "2025-09-22",
      status: "진행 중",
      submitted: 39,
      total: 42,
    },
    {
      id: 2,
      title: "과제 2 - JavaScript 이벤트 처리",
      dueDate: "2025-10-01",
      status: "예정",
      submitted: 0,
      total: 42,
    },
  ]);

  // ───────────────── 수업 노트 ─────────────────
  const [classNote, setClassNote] = useState(
    "오늘 수업: DOM 조작 실습 위주로 진행, 일부 학생이 이벤트 리스너 개념을 어려워함."
  );

  const handleSaveNote = (e) => {
    e.preventDefault();
    // 실제로는 API 호출 예정, 지금은 알림만
    alert("수업 노트가 임시 저장되었습니다. (더미)");
  };

  // ───────────────── JSX ─────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            수업 운영 · {course.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            강의자료, 주차별 수업, 공지, 출석, 과제, 수업 노트를 한 곳에서
            관리합니다.
          </p>
        </header>

        {/* 강의 정보 + 출석/과제 요약 */}
        <section className="mb-6 grid gap-3 md:grid-cols-[2fr,1.3fr]">
          {/* 강의 정보 */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">강의 정보</h2>
            <p className="mt-1 text-xs text-slate-500">
              현재 수업을 운영 중인 강의 기본 정보입니다.
            </p>
            <div className="mt-3 space-y-1.5 text-[0.8rem] text-slate-700">
              <p>
                <span className="text-slate-500">학기:</span>{" "}
                <span className="font-medium">{course.semester}</span>
              </p>
              <p>
                <span className="text-slate-500">과목:</span>{" "}
                <span className="font-medium">
                  {course.name} ({course.code})
                </span>
              </p>
              <p>
                <span className="text-slate-500">시간:</span> {course.dayTime}
              </p>
              <p>
                <span className="text-slate-500">강의실:</span> {course.room}
              </p>
              <p>
                <span className="text-slate-500">수강 인원:</span>{" "}
                {course.enrolled}명
              </p>
            </div>
          </div>

          {/* 출석 · 과제 요약 */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              출석 · 과제 요약
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              전체 출석률과 가장 최근 과제 현황입니다.
            </p>

            <div className="mt-3 space-y-2 text-[0.8rem] text-slate-700">
              <div>
                <p className="text-[0.75rem] text-slate-500">출석률</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {stats.attendanceRate}%
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${stats.attendanceRate}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[0.75rem] text-slate-500">최근 과제</p>
                <p className="mt-1 font-medium text-slate-800">
                  {stats.latestAssignment.title}
                </p>
                <p className="text-[0.75rem] text-slate-600">
                  마감일: {stats.latestAssignment.dueDate}
                </p>
                <p className="mt-1 text-[0.75rem] text-slate-600">
                  제출: {stats.latestAssignment.submitted} /{" "}
                  {stats.latestAssignment.total}명
                </p>
              </div>

              <div className="mt-2 flex flex-wrap gap-2 text-[0.75rem]">
                <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
                  출석 관리 페이지로 이동
                </button>
                <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
                  과제 관리 페이지로 이동
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 오늘 수업 + 실시간 공지 */}
        <section className="mb-6 grid gap-5 lg:grid-cols-[1.5fr,1.2fr]">
          {/* 오늘 수업 */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">오늘 수업</h2>
            <p className="mt-1 text-xs text-slate-500">
              오늘 진행 예정인 수업 내용입니다.
            </p>

            <div className="mt-3 space-y-2 text-[0.8rem] text-slate-700">
              <p>
                <span className="text-slate-500">날짜:</span> {todayClass.date}
              </p>
              <p>
                <span className="text-slate-500">시간:</span> {todayClass.time}
              </p>
              <p>
                <span className="text-slate-500">주제:</span>{" "}
                <span className="font-medium">{todayClass.topic}</span>
              </p>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[0.75rem] font-medium text-slate-700">
                  수업 진행 계획
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {todayClass.plan.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[0.75rem] font-medium text-slate-700">
                  학생 공지/당부 사항
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {todayClass.todoForStudents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 실시간 수업 공지 */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              실시간 수업 공지
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              수업 중 또는 직전에 안내할 내용을 간단히 등록할 수 있습니다.
              (현재는 로컬 상태만 반영)
            </p>

            {/* 공지 작성 폼 */}
            <form
              onSubmit={handleAddAnnouncement}
              className="mt-3 space-y-2 text-[0.8rem]"
            >
              <input
                type="text"
                placeholder="공지 제목"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              />
              <textarea
                rows={3}
                placeholder="공지 내용을 입력하세요."
                value={newAnnouncement.content}
                onChange={(e) =>
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              />
              <button
                type="submit"
                className="rounded-md bg-sky-500 px-3 py-1.5 text-[0.8rem] font-medium text-white shadow-sm hover:bg-sky-600"
              >
                공지 등록 (더미)
              </button>
            </form>

            {/* 공지 리스트 */}
            <div className="mt-3 max-h-40 space-y-2 overflow-y-auto text-[0.8rem]">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <p className="text-[0.75rem] font-semibold text-slate-800">
                    {a.title}
                  </p>
                  <p className="mt-1 text-[0.75rem] text-slate-600">
                    {a.content}
                  </p>
                  <p className="mt-1 text-[0.7rem] text-slate-400">
                    {a.createdAt}
                  </p>
                </div>
              ))}
              {announcements.length === 0 && (
                <p className="py-3 text-center text-[0.8rem] text-slate-400">
                  등록된 공지가 없습니다.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 강의자료 관리 + 주차별 진행 */}
        <section className="mb-6 grid gap-5 lg:grid-cols-[1.5fr,1.2fr]">
          {/* 강의자료 관리 */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              강의자료 관리
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              업로드된 강의자료 목록입니다. (다운로드/업로드는 더미 버튼)
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
              <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
                강의자료 업로드 (더미)
              </button>
            </div>

            <div className="mt-3 overflow-x-auto text-[0.8rem]">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                    <th className="px-2 py-2">주차</th>
                    <th className="px-2 py-2">제목</th>
                    <th className="px-2 py-2">유형</th>
                    <th className="px-2 py-2">업로드일</th>
                    <th className="px-2 py-2 text-center">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m, idx) => (
                    <tr
                      key={m.id}
                      className={`border-b border-slate-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-2 py-1.5 align-middle text-slate-700">
                        {m.week}주차
                      </td>
                      <td className="px-2 py-1.5 align-middle text-slate-800">
                        {m.title}
                      </td>
                      <td className="px-2 py-1.5 align-middle text-slate-700">
                        {m.type}
                      </td>
                      <td className="px-2 py-1.5 align-middle text-slate-700">
                        {m.uploadedAt}
                      </td>
                      <td className="px-2 py-1.5 text-center align-middle">
                        <button className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.7rem] text-slate-700 hover:bg-slate-50">
                          다운로드
                        </button>
                      </td>
                    </tr>
                  ))}
                  {materials.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-2 py-4 text-center text-slate-400"
                      >
                        등록된 강의자료가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 주차별 강의 진행 상황 */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              주차별 강의 진행 상황
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              주차를 선택해 진행 상태와 수업 요약을 확인합니다.
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem]">
              {weeks.map((w) => (
                <button
                  key={w.week}
                  type="button"
                  onClick={() => setSelectedWeek(w.week)}
                  className={[
                    "rounded-full border px-3 py-1",
                    selectedWeek === w.week
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {w.week}주차
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-[0.8rem] text-slate-700">
              <p className="text-[0.75rem] text-slate-500">
                {currentWeek.dateRange}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {currentWeek.week}주차 · {currentWeek.title}
              </p>
              <p className="mt-1 text-[0.8rem] text-slate-600">
                {currentWeek.note}
              </p>

              <p className="mt-2 text-[0.75rem] text-slate-500">
                상태:{" "}
                <span className="font-medium text-slate-800">
                  {currentWeek.status}
                </span>
              </p>

              <div className="mt-3">
                <p className="text-[0.75rem] font-medium text-slate-700">
                  수업 자료
                </p>
                {currentWeek.materials.length > 0 ? (
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {currentWeek.materials.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-[0.75rem] text-slate-500">
                    등록된 수업 자료가 없습니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 출석 체크 + 과제 공지/마감 + 수업 노트 */}
        <section className="mb-6 grid gap-5 lg:grid-cols-[1.5fr,1.2fr]">
          {/* 출석 체크 */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">출석 체크</h2>
            <p className="mt-1 text-xs text-slate-500">
              오늘 수업 출석 상태를 간단히 기록하는 예시입니다.
            </p>

            <div className="mt-3 overflow-x-auto text-[0.8rem]">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                    <th className="px-2 py-2">학번</th>
                    <th className="px-2 py-2">이름</th>
                    <th className="px-2 py-2 text-center">출석 상태</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((s, idx) => (
                    <tr
                      key={s.id}
                      className={`border-b border-slate-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-2 py-1.5 align-middle text-slate-700">
                        {s.studentId}
                      </td>
                      <td className="px-2 py-1.5 align-middle text-slate-800">
                        {s.name}
                      </td>
                      <td className="px-2 py-1.5 text-center align-middle">
                        <select
                          value={s.status}
                          onChange={(e) =>
                            handleAttendanceChange(s.id, e.target.value)
                          }
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[0.75rem] text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                        >
                          <option value="미등록">미등록</option>
                          <option value="출석">출석</option>
                          <option value="지각">지각</option>
                          <option value="결석">결석</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {attendance.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-2 py-4 text-center text-slate-400"
                      >
                        학생 목록이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 과제 공지/마감 + 수업 노트 */}
          <div className="space-y-4">
            {/* 과제 공지/마감 */}
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">
                과제 공지 / 마감
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                현재 등록된 과제와 마감 현황입니다.
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-[0.75rem]">
                <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm hover:bg-slate-50">
                  새 과제 등록 (더미)
                </button>
              </div>

              <div className="mt-3 space-y-2 text-[0.8rem]">
                {assignments.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <p className="text-[0.8rem] font-semibold text-slate-800">
                      {a.title}
                    </p>
                    <p className="text-[0.75rem] text-slate-600">
                      마감일: {a.dueDate}
                    </p>
                    <p className="mt-1 text-[0.75rem] text-slate-600">
                      제출: {a.submitted} / {a.total}명
                    </p>
                    <p className="mt-1 text-[0.75rem] text-slate-500">
                      상태: {a.status}
                    </p>
                  </div>
                ))}
                {assignments.length === 0 && (
                  <p className="py-3 text-center text-[0.8rem] text-slate-400">
                    등록된 과제가 없습니다.
                  </p>
                )}
              </div>
            </div>

            {/* 수업 노트 기능 */}
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">
                수업 노트
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                교수 개인용 메모 영역입니다. (학생에게는 공개되지 않는다는
                설정을 가정)
              </p>

              <form onSubmit={handleSaveNote} className="mt-3 space-y-2">
                <textarea
                  rows={4}
                  value={classNote}
                  onChange={(e) => setClassNote(e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                />
                <button
                  type="submit"
                  className="rounded-md bg-slate-800 px-3 py-1.5 text-[0.8rem] font-medium text-white shadow-sm hover:bg-slate-900"
                >
                  수업 노트 임시 저장 (더미)
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 하단 안내 */}
        <p className="mt-4 text-[0.75rem] text-slate-400">
          ※ 이 페이지는 예시용 더미 화면입니다. 실제 서비스에서는 강의 ID를
          기준으로 주차별 계획, 출석, 과제, 공지, 노트 데이터를 서버와 연동해야
          합니다.
        </p>
      </div>
    </div>
  );
};

export default ClassSectionManage;
