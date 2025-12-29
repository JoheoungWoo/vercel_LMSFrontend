import { Link } from "react-router-dom";

export default function ClassOperationPage() {
  const boxStyle = `
    border border-gray-400 rounded-xl h-64 md:h-80 shadow-md p-6 md:p-5
    flex items-center justify-center cursor-pointer
    relative overflow-hidden bg-white
    transform transition-all duration-300

    before:content-[''] before:absolute before:inset-0
    before:bg-sky-300 before:translate-x-[-100%]
    before:transition-transform before:duration-500 before:ease-out

    hover:scale-105
    hover:before:translate-x-0
  `;

  return (
    <div>
      <div className="item-s-center content-center text-center">
        <h1 className="font-extrabold pt-5 pb-5 text-4xl">
          강의 / 수업 관리 (학생)
        </h1>
      </div>

      <hr />

      <div className="flex">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-10 w-full">
          <Link
            to="/courseenrollmentmanagement/student/CourseManagement"
            className={boxStyle}
          >
            <p className="text-xl md:text-2xl font-semibold relative z-10">
              강의 관리
            </p>
          </Link>

          <Link
            to="/courseenrollmentmanagement/student/timetable"
            className={boxStyle}
          >
            <p className="text-xl md:text-2xl font-semibold relative z-10">
              시간표
            </p>
          </Link>

          <Link
            to="/courseenrollmentmanagement/student/attendance"
            className={boxStyle}
          >
            <p className="text-xl md:text-2xl font-semibold relative z-10">
              출결
            </p>
          </Link>

          <Link
            to="/courseenrollmentmanagement/student/courseevaluation"
            className={boxStyle}
          >
            <p className="text-xl md:text-2xl font-semibold relative z-10">
              강의 평가
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
