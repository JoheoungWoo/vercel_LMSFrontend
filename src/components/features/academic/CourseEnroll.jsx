import React, { useState, useEffect } from "react";
import ClassSectionApi from "../../../api/ClassSectionApi";
import EnrollmentApi from "../../../api/EnrollmentApi";
import { useSelector } from "react-redux";

const CourseEnroll = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myEnrollments, setMyEnrollments] = useState([]);

  const user = useSelector((state) => state.loginSlice);

  useEffect(() => {
    fetchSections();
    fetchMyEnrollments();
  }, []);

  const fetchSections = () => {
    setLoading(true);
    ClassSectionApi.config.funcs
      // .readAll()
      .findByKeywordHttp("filterall", user.userId, user.email, "get")
      .then((result) => {
        console.log("Sections:", result);
        setSections(result);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchMyEnrollments = () => {
    EnrollmentApi.config.funcs
      .findByKeywordHttp("myenroll", null, user.email, "get")
      .then((result) => {
        console.log("My Enrollments:", result);
        setMyEnrollments(result);
      })
      .catch(console.error);
  };

  const submitEnroll = (sectionId) => {
    const enrollData = {
      userId: user.userId,
      sectionId: sectionId,
      enrollDate: new Date().toISOString(),
    };

    EnrollmentApi.config.funcs
      .writeOne(enrollData, user.email)
      .then((result) => {
        alert("수강신청 완료!", result);
        console.log(result);
        fetchSections();
        fetchMyEnrollments();
      })
      .catch((error) => {
        alert(error.response?.data?.message || "수강신청 실패");
      });
  };

  const formatTime = (timeTables) => {
    if (!timeTables || timeTables.length === 0) return "시간 미정";

    const dayMap = {
      MONDAY: "월",
      TUESDAY: "화",
      WEDNESDAY: "수",
      THURSDAY: "목",
      FRIDAY: "금",
      SATURDAY: "토",
      SUNDAY: "일",
    };

    return timeTables
      .map(
        (t) =>
          `${dayMap[t.dayOfWeek]} ${t.startTime.slice(0, 5)}~${t.endTime.slice(
            0,
            5
          )}`
      )
      .join(", ");
  };

  const formatClassroom = (timeTables) => {
    if (!timeTables || timeTables.length === 0) return "";
    return timeTables.map((t) => t.classroomName).join(", ");
  };

  // 내가 이미 신청한 sectionId 목록
  const enrolledSectionIds = myEnrollments.map((e) => e.sectionId);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">수강신청</h1>
        <p className="text-sm text-gray-500 mt-1">
          원하는 강의를 선택하여 수강신청하세요.
        </p>
      </header>

      {/* 내 신청 현황 */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm font-medium text-blue-800">
          신청한 강의: {myEnrollments.length}개
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const isFull =
            section.currentCount >= section.maxCapacity || section.isFull;
          const isEnrolled = enrolledSectionIds.includes(section.sectionId);

          return (
            <div
              key={section.sectionId}
              className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* 과목명 & 분반 */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {section.courseName}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                      {section.sectionName}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {section.sectionTypeDisplay}
                    </span>
                  </div>

                  {/* 상세 정보 */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">담당:</span>{" "}
                      {section.professorName}
                    </p>
                    <p>
                      <span className="font-medium">학기:</span> {section.year}{" "}
                      {section.semester}
                    </p>
                    <p>
                      <span className="font-medium">시간:</span>{" "}
                      {formatTime(section.timeTables)}
                    </p>
                    <p>
                      <span className="font-medium">강의실:</span>{" "}
                      {formatClassroom(section.timeTables)}
                    </p>
                    <p>
                      <span className="font-medium">정원:</span>{" "}
                      <span
                        className={
                          isFull
                            ? "text-red-600 font-semibold"
                            : "text-gray-800"
                        }
                      >
                        {section.currentCount}/{section.maxCapacity}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({section.enrollmentRate.toFixed(0)}% 수강률)
                      </span>
                    </p>
                  </div>
                </div>

                {/* 신청 버튼 */}
                <div className="ml-4">
                  {isEnrolled ? (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-md inline-block font-medium">
                      신청완료
                    </span>
                  ) : isFull ? (
                    <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md inline-block font-medium">
                      정원마감
                    </span>
                  ) : (
                    <button
                      onClick={() => submitEnroll(section.sectionId)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                    >
                      신청
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {sections.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            수강 가능한 강의가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseEnroll;
