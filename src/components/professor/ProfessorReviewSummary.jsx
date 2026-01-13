import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import ReviewApi from "../../api/ReviewApi";

const ProfessorReviewSummary = ({ selectedOfferingId }) => {
  const userEmail =
    useSelector((state) => state.loginSlice?.email) || "professor@aaa.com";
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 조회
  useEffect(() => {
    if (!selectedOfferingId) return;

    setLoading(true);
    ReviewApi.config.funcs
      .findByKeywordHttp("course", selectedOfferingId, userEmail, "get")
      .then((result) => {
        // selectedOfferingId와 매칭되는 리뷰만 필터링 (필요시)
        setReviews(result || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedOfferingId, userEmail]);

  // 평균 평점 및 최신 코멘트 계산
  const stats = useMemo(() => {
    if (reviews.length === 0) {
      return { avgRating: 0, totalReviews: 0, recentComments: [] };
    }

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);

    // 최신 3개 코멘트 (createdAt 기준 정렬)
    const recentComments = [...reviews]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    return {
      avgRating: parseFloat(avgRating),
      totalReviews: reviews.length,
      recentComments,
    };
  }, [reviews]);

  // 평점 별 표시
  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="text-center text-slate-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        ⭐ 강의 평가
      </h3>

      <div className="space-y-4">
        {/* 평균 평점 */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
          <div>
            <p className="text-sm text-slate-600 mb-1">평균 평점</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-orange-600">
                {stats.avgRating}
              </span>
              <span className="text-sm text-slate-500">/ 5.0</span>
            </div>
            <div className="text-orange-500 text-xl mt-1">
              {renderStars(stats.avgRating)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">총 리뷰</p>
            <p className="text-2xl font-bold text-slate-700">
              {stats.totalReviews}
            </p>
          </div>
        </div>

        {/* 최신 코멘트 3개 */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 mb-2">
            💬 최근 평가 코멘트
          </p>

          {stats.recentComments.length > 0 ? (
            stats.recentComments.map((review) => (
              <div
                key={review.reviewId}
                className="p-3 bg-slate-50 rounded-lg border border-slate-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">
                    {review.studentNickname || "익명"}
                  </span>
                  <span className="text-orange-500 text-sm">
                    {renderStars(review.rating)}
                  </span>
                </div>
                <p className="text-xs text-slate-700 line-clamp-2">
                  {review.comment}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 text-center py-4">
              아직 평가가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessorReviewSummary;
