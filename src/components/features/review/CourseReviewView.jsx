import React from "react";

const CourseReviewView = () => {
  // ───────────────── 더미 평가 데이터 ─────────────────
  const reviews = [
    {
      id: 1,
      courseTitle: "웹 프로그래밍",
      professor: "홍길동",
      semester: "2025-1학기",
      rating: 5,
      content:
        "실습 위주의 수업이라 이해가 잘 되었고, 과제 피드백도 빠른 편이었습니다.",
      submittedAt: "2025-06-10",
    },
    {
      id: 2,
      courseTitle: "자료구조",
      professor: "이순신",
      semester: "2025-1학기",
      rating: 4,
      content:
        "난이도는 있었지만 설명이 체계적이어서 도움이 되었습니다.",
      submittedAt: "2025-06-12",
    },
  ];

  // ───────────────── 평점 표시 ─────────────────
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="pr-[5%] pt-6 space-y-4">
      <div>
        <h1 className="text-3xl font-extrabold mb-2">
          내가 작성한 강의 평가
        </h1>
        <hr className="mb-4" />
      </div>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          아직 작성한 강의 평가가 없습니다.
        </div>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            {/* 상단 정보 */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">
                  {review.courseTitle}
                </h2>
                <p className="text-sm text-gray-600">
                  {review.professor} · {review.semester}
                </p>
              </div>

              <div className="text-sm text-gray-500">
                작성일: {review.submittedAt}
              </div>
            </div>

            {/* 평점 */}
            <div className="mt-3 text-orange-500 font-semibold">
              {renderStars(review.rating)}{" "}
              <span className="ml-1 text-gray-600">
                ({review.rating}/5)
              </span>
            </div>

            {/* 평가 내용 */}
            <div className="mt-3">
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {review.content}
              </p>
            </div>

            {/* 하단 안내 */}
            <div className="mt-4 text-xs text-gray-400">
              ※ 작성된 강의 평가는 수정할 수 없습니다.
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseReviewView;
