import React, { useState } from "react";

const CourseReviewWrite = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [evaluationText, setEvaluationText] = useState("");
  const [rating, setRating] = useState("5");
  const [submittedMap, setSubmittedMap] = useState({}); // { [courseId]: true }

  const courses = [
    {
      id: 1,
      title: "웹 프로그래밍",
      professor: "홍길동",
      semester: "2025-1학기",
    },
    { id: 2, title: "자료구조", professor: "이순신", semester: "2025-1학기" },
    { id: 3, title: "운영체제", professor: "강감찬", semester: "2025-1학기" },
    { id: 4, title: "네트워크", professor: "유관순", semester: "2025-1학기" },
    {
      id: 5,
      title: "모바일 프로그래밍",
      professor: "신사임당",
      semester: "2025-1학기",
    },
    {
      id: 6,
      title: "알고리즘 기초",
      professor: "정약용",
      semester: "2025-1학기",
    },
    {
      id: 7,
      title: "데이터베이스 설계",
      professor: "안중근",
      semester: "2025-1학기",
    },
    {
      id: 8,
      title: "인공지능 개론",
      professor: "장영실",
      semester: "2025-1학기",
    },
    {
      id: 9,
      title: "소프트웨어 공학",
      professor: "유재석",
      semester: "2025-1학기",
    },
  ];

  const openModal = (course) => {
    // 이미 제출된 강의면 열지 않음 (버튼도 disabled 처리할 거라서 거의 방어용)
    if (submittedMap[course.id]) return;
    setSelectedCourse(course);
    setEvaluationText("");
    setRating("5");
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setEvaluationText("");
    setRating("5");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    // 데모라 서버 저장 대신 콘솔에 찍기만
    console.log("제출된 강의 평가:", {
      courseId: selectedCourse.id,
      title: selectedCourse.title,
      rating,
      evaluationText,
    });

    // 이 강의는 평가 완료 처리 → 버튼 회색 & 수정 불가
    setSubmittedMap((prev) => ({
      ...prev,
      [selectedCourse.id]: true,
    }));

    closeModal();
  };

  return (
    <div className="pr-[5%] pt-6">
      <div>
        <h1 className="text-3xl font-extrabold mb-2">강의 평가</h1>
        <hr className="mb-4" />

        <div className="space-y-2">
          {courses.map((course) => {
            const isSubmitted = !!submittedMap[course.id];

            return (
              <div
                key={course.id}
                className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50 transition"
              >
                {/* 왼쪽: 강의 정보 */}
                <div>
                  <div className="font-semibold text-lg">{course.title}</div>
                  <div className="text-sm text-gray-600">
                    {course.professor} · {course.semester}
                  </div>
                </div>

                {/* 오른쪽: 글쓰기 버튼 (pr-[5%]는 상위 div에 이미 적용) */}
                <button
                  onClick={() => openModal(course)}
                  disabled={isSubmitted}
                  className={`px-4 py-2 rounded text-sm font-semibold
                    ${
                      isSubmitted
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                >
                  {isSubmitted ? "작성 완료" : "글쓰기"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 모달 */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCourse.title} 강의 평가
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              교수: {selectedCourse.professor} · {selectedCourse.semester}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 평점 */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  평점 (1~5)
                </label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="5">5 - 매우 만족</option>
                  <option value="4">4 - 만족</option>
                  <option value="3">3 - 보통</option>
                  <option value="2">2 - 아쉬움</option>
                  <option value="1">1 - 매우 불만족</option>
                </select>
              </div>

              {/* 평가 내용 */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  강의에 대한 의견
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm min-h-[120px] resize-none"
                  placeholder="강의의 장점, 아쉬운 점, 개선되었으면 하는 점 등을 자유롭게 작성해주세요."
                  value={evaluationText}
                  onChange={(e) => setEvaluationText(e.target.value)}
                  required
                />
              </div>

              {/* 버튼 영역 */}
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border text-sm"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold"
                >
                  작성 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseReviewWrite;
