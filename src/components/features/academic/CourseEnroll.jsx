import React, { useState } from "react";

const CourseEnroll = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CS301",
      name: "웹 프로그래밍",
      professor: "김교수",
      credit: 3,
      time: "월·수 09:00-10:15",
      enrolled: 42,
      capacity: 45,
      isEnrolled: false,
    },
    {
      id: 2,
      code: "CS205",
      name: "자료구조",
      professor: "이교수",
      credit: 3,
      time: "화·목 13:00-14:15",
      enrolled: 40,
      capacity: 40,
      isEnrolled: false,
    },
    {
      id: 3,
      code: "CS410",
      name: "React 심화",
      professor: "박교수",
      credit: 3,
      time: "금 10:00-12:50",
      enrolled: 28,
      capacity: 30,
      isEnrolled: false,
    },
  ]);

  const handleEnroll = (id) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isEnrolled: true, enrolled: c.enrolled + 1 } : c
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">수강신청</h1>

      <div className="space-y-3">
        {courses.map((course) => {
          const isFull = course.enrolled >= course.capacity;

          return (
            <div
              key={course.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                    <span className="text-sm text-gray-500">{course.code}</span>
                    <span className="text-sm text-gray-500">
                      {course.credit}학점
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>담당: {course.professor}</p>
                    <p>시간: {course.time}</p>
                    <p>
                      정원: {course.enrolled}/{course.capacity}
                    </p>
                  </div>
                </div>

                <div className="ml-4">
                  {course.isEnrolled ? (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded inline-block">
                      신청완료
                    </span>
                  ) : isFull ? (
                    <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded inline-block">
                      마감
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      신청
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseEnroll;
