import React, { useEffect, useState } from "react";
import ReviewApi from "../../../api/ReviewApi";
import { useSelector } from "react-redux";

const CourseReviewView = () => {
  const [data, setData] = useState([]);

  const user = useSelector((state) => state.loginSlice);
  const isAdmin = user?.role === "ADMIN";

  // 관리자용 데이터 조회
  const fetchData = () => {
    ReviewApi.config.funcs
      .readAll(user?.email)
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch(console.error);
  };

  // 평점 표시
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pr-[5%] pt-6 space-y-4">
      <div>
        <h1 className="text-3xl font-extrabold mb-2">내가 작성한 강의 평가</h1>
        <hr className="mb-4" />
      </div>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          아직 작성한 강의 평가가 없습니다.
        </div>
      ) : (
        data.map((review) => (
          <div
            key={review.reviewId}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            {/* 상단 정보 */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{review.courseName}</h2>
                <p className="text-sm text-gray-600">
                  {review.studentNickname}
                </p>
              </div>

              <div className="text-sm text-gray-500">
                작성일: {new Date(review.createdAt).toLocaleString()}
              </div>
            </div>

            {/* 평점 */}
            <div className="mt-3 text-orange-500 font-semibold">
              {renderStars(review.rating)}{" "}
              <span className="ml-1 text-gray-600">({review.rating}/5)</span>
            </div>

            {/* 평가 내용 */}
            <div className="mt-3">
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {review.comment}
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
