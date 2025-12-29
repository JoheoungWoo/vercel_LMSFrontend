import React, { useState } from "react";

const MyCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // 화면에 보이는 기본 강의 리스트 (7개)
  const dummyCourses = [
    {
      id: 101,
      title: "웹 프로그래밍",
      professor: "홍길동",
      date: "2025-01-10",
    },
    { id: 102, title: "자료구조", professor: "이순신", date: "2025-01-12" },
    { id: 103, title: "운영체제", professor: "강감찬", date: "2025-01-15" },
    { id: 104, title: "네트워크", professor: "유관순", date: "2025-01-20" },
    {
      id: 105,
      title: "모바일 프로그래밍",
      professor: "신사임당",
      date: "2025-01-22",
    },
    {
      id: 106,
      title: "알고리즘 기초",
      professor: "정약용",
      date: "2025-01-25",
    },
    {
      id: 107,
      title: "데이터베이스 설계",
      professor: "안중근",
      date: "2025-01-28",
    },
  ];

  // 🔸 유저 개인용 "내 강의 정보" 더미데이터 (모달에서 사용할 상세 정보)
  const userCourseDetails = {
    101: {
      courseId: 101,
      title: "웹 프로그래밍",
      professor: "홍길동",
      credit: 3,
      schedule: "월/수 10:00 ~ 12:00",
      progress: 72, // 진행률 %
      attendanceRate: 90, // 출석률 %
      attendance: [
        { week: 1, status: "출석" },
        { week: 2, status: "지각" },
        { week: 3, status: "결석" },
        { week: 4, status: "출석" },
      ],
      assignments: [
        {
          id: 1,
          title: "HTML Layout 과제",
          deadline: "2025-02-01",
          submitted: true,
          score: 88,
        },
        {
          id: 2,
          title: "CSS 반응형 실습",
          deadline: "2025-02-10",
          submitted: false,
          score: null,
        },
      ],
      exams: [
        { type: "중간고사", date: "2025-04-15", score: 92 },
        { type: "기말고사", date: "2025-06-20", score: null },
      ],
      notices: [
        { id: 1, title: "과제 제출 마감 안내 (2월 1일)", date: "2025-01-20" },
        { id: 2, title: "다음 주 수업 온라인 전환", date: "2025-01-22" },
      ],
      gradeSummary: {
        assignments: 40,
        midterm: 30,
        final: 30,
        totalScore: 89,
        grade: "A",
      },
    },
    102: {
      courseId: 102,
      title: "자료구조",
      professor: "이순신",
      credit: 3,
      schedule: "화/목 14:00 ~ 16:00",
      progress: 55,
      attendanceRate: 95,
      attendance: [
        { week: 1, status: "출석" },
        { week: 2, status: "출석" },
        { week: 3, status: "출석" },
        { week: 4, status: "지각" },
      ],
      assignments: [
        {
          id: 1,
          title: "리스트/스택 구현 과제",
          deadline: "2025-02-05",
          submitted: true,
          score: 93,
        },
      ],
      exams: [
        { type: "중간고사", date: "2025-04-20", score: null },
        { type: "기말고사", date: "2025-06-25", score: null },
      ],
      notices: [{ id: 1, title: "1주차 예제 코드 업로드", date: "2025-01-15" }],
      gradeSummary: {
        assignments: 20,
        midterm: 0,
        final: 0,
        totalScore: 20,
        grade: "진행 중",
      },
    },
    // 필요하면 103 ~ 107도 같은 구조로 복붙해서 채우면 됨
  };

  return (
    <div className="pr-[5%]">
      {/* 🔹 페이지 제목: 내 강의 정보 */}
      <div className="text-center pt-5 pb-5">
        <h1 className="font-extrabold text-4xl">강의 관리</h1>
      </div>
      <hr className="mb-4" />

      {/* 🔹 강의 리스트 */}
      <div className="space-y-3">
        {dummyCourses.map((course) => (
          <div
            key={course.id}
            onClick={() =>
              userCourseDetails[course.id] &&
              setSelectedCourse(userCourseDetails[course.id])
            }
            className="p-3 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-100 transition cursor-pointer"
          >
            <div>
              <div className="font-bold text-lg">{course.title}</div>
              <div className="text-sm text-gray-600">
                담당 교수: {course.professor}
              </div>
              <div className="text-sm text-gray-500">개강일: {course.date}</div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded font-semibold">
              내 강의정보
            </button>
          </div>
        ))}
      </div>

      {/* 🔹 모달: 내 강의 정보 */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6">
            {/* 모달 제목 */}
            <h2 className="text-2xl font-bold mb-4">내 강의 정보</h2>

            {/* 기본 정보 */}
            <div className="mb-4 border-b pb-3">
              <p className="text-lg font-semibold mb-1">
                {selectedCourse.title}
              </p>
              <p className="text-sm text-gray-700">
                교수: {selectedCourse.professor} · 학점: {selectedCourse.credit}
              </p>
              <p className="text-sm text-gray-700">
                수업 일정: {selectedCourse.schedule}
              </p>
            </div>

            {/* 진행 상황 & 출석률 */}
            <div className="mb-4 flex justify-between text-sm text-gray-700">
              <div>
                <span className="font-semibold">진행률: </span>
                {selectedCourse.progress}%
              </div>
              <div>
                <span className="font-semibold">출석률: </span>
                {selectedCourse.attendanceRate}%
              </div>
            </div>

            {/* 출석 정보 */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm mb-2">출석 정보</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {selectedCourse.attendance?.map((item) => (
                  <li key={item.week}>
                    {item.week}주차 – {item.status}
                  </li>
                ))}
              </ul>
            </div>

            {/* 과제 정보 */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm mb-2">과제</h3>
              {selectedCourse.assignments?.length ? (
                <ul className="text-sm text-gray-700 space-y-1">
                  {selectedCourse.assignments.map((a) => (
                    <li key={a.id}>
                      <span className="font-medium">{a.title}</span> (
                      <span>마감: {a.deadline}</span>) –{" "}
                      {a.submitted ? "제출 완료" : "미제출"}
                      {a.score !== null && ` · 점수: ${a.score}점`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">등록된 과제가 없습니다.</p>
              )}
            </div>

            {/* 시험 정보 */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm mb-2">시험</h3>
              {selectedCourse.exams?.length ? (
                <ul className="text-sm text-gray-700 space-y-1">
                  {selectedCourse.exams.map((e, idx) => (
                    <li key={idx}>
                      {e.type} – {e.date}{" "}
                      {e.score !== null && `· 점수: ${e.score}점`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  등록된 시험 정보가 없습니다.
                </p>
              )}
            </div>

            {/* 공지 정보 */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm mb-2">강의 공지</h3>
              {selectedCourse.notices?.length ? (
                <ul className="text-sm text-gray-700 space-y-1">
                  {selectedCourse.notices.map((n) => (
                    <li key={n.id}>
                      [{n.date}] {n.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  최근 공지사항이 없습니다.
                </p>
              )}
            </div>

            {/* 성적 요약 */}
            {selectedCourse.gradeSummary && (
              <div className="mb-5 border-t pt-3 text-sm text-gray-800">
                <h3 className="font-semibold text-sm mb-2">성적 요약</h3>
                <p>
                  과제: {selectedCourse.gradeSummary.assignments}점 · 중간:
                  {selectedCourse.gradeSummary.midterm}점 · 기말:
                  {selectedCourse.gradeSummary.final}점
                </p>
                <p className="mt-1">
                  총점:{" "}
                  <span className="font-semibold">
                    {selectedCourse.gradeSummary.totalScore}점
                  </span>{" "}
                  / 최종 등급:{" "}
                  <span className="font-semibold">
                    {selectedCourse.gradeSummary.grade}
                  </span>
                </p>
              </div>
            )}

            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="mt-2 w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
