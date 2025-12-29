import React, { useEffect, useState } from "react";

// 원형 출결 게이지 컴포넌트 (애니메이션 포함)
function CircleGauge({ percent, color, duration = 1200 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.round(progress * percent);
      setCurrent(value);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [percent, duration]);

  const angle = (current / 100) * 360;

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
      {/* 퍼센트에 따라 채워지는 링 */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${color} ${angle}deg, #e5e7eb ${angle}deg)`,
        }}
      />

      {/* 안쪽 흰 원 + 퍼센트 텍스트 */}
      <div className="absolute inset-[6px] md:inset-[8px] rounded-full bg-white flex items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold" style={{ color }}>
          {current}%
        </span>
      </div>
    </div>
  );
}

export default function AttendancePage() {
  // 🔹 실제로는 로그인 정보에서 받아올 값 (예: "PROFESSOR" / "STUDENT")
  const role = "PROFESSOR"; // 필요에 따라 "STUDENT"로 바꿔서 테스트

  // 🔹 학생 데이터 (각 학생별: 출결률 + 강의별 출결까지 포함)
  const students = [
    {
      id: "20250001",
      name: "김유라",
      major: "컴퓨터공학과",
      grade: "3학년",
      status: "재학",
      password: "1234", // 데모용
      photo: "/images/student-default.png",
      weeklyRate: 92,
      totalRate: 88,
      lectures: [
        { lecture: "웹 프로그래밍", attended: 12, total: 13 },
        { lecture: "자료구조", attended: 11, total: 13 },
        { lecture: "네트워크", attended: 10, total: 12 },
        { lecture: "운영체제", attended: 9, total: 12 },
        { lecture: "교양 영어", attended: 7, total: 8 },
      ],
    },
    {
      id: "20250002",
      name: "홍길동",
      major: "소프트웨어공학과",
      grade: "2학년",
      status: "재학",
      password: "5678",
      photo: "/images/student-default.png",
      weeklyRate: 75,
      totalRate: 62,
      lectures: [
        { lecture: "웹 프로그래밍", attended: 9, total: 13 },
        { lecture: "자료구조", attended: 10, total: 13 },
        { lecture: "네트워크", attended: 7, total: 12 },
        { lecture: "운영체제", attended: 6, total: 12 },
        { lecture: "교양 영어", attended: 5, total: 8 },
      ],
    },
  ];

  // 공통 상태
  const [selectedStudent, setSelectedStudent] = useState(null);

  // 🔹 PROFESSOR용 (이름 검색)
  const [search, setSearch] = useState("");

  // 🔹 STUDENT용 (이름 + 비밀번호)
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // 교수 모드: 이름으로만 검색
  const filteredStudents =
    role === "STUDENT"
      ? students.filter((s) => s.name.includes(search.trim()))
      : [];

  // 교수: 검색 리스트에서 학생 선택
  const handleSelectStudentProfessor = (student) => {
    setSelectedStudent(student);
  };

  // 학생: 이름 + 비밀번호로 본인 인증
  const handleStudentLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const target = students.find((s) => s.name === nameInput.trim());

    if (!target) {
      setLoginError("해당 이름의 학생을 찾을 수 없습니다.");
      setSelectedStudent(null);
      return;
    }

    if (target.password !== passwordInput) {
      setLoginError("비밀번호가 일치하지 않습니다.");
      setSelectedStudent(null);
      return;
    }

    setSelectedStudent(target);
    setLoginError("");
  };

  // 선택된 학생 기준 강의별 출결
  const lectureAttendance = selectedStudent?.lectures || [];

  // 선택된 학생 기준 출결률
  const weeklyRate = selectedStudent?.weeklyRate || 0;
  const totalRate = selectedStudent?.totalRate || 0;

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        출결 관리
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상단 왼쪽 - 역할에 따른 학생 정보 접근 방식 */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
          {role === "PROFESSOR" ? (
            <>
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
                학생 검색
              </h2>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              />

              <div className="mt-4 max-h-32 overflow-y-auto space-y-1">
                {search.trim() === "" ? (
                  <p className="text-xs md:text-sm text-gray-400">
                    이름을 입력하면 학생 목록이 표시됩니다.
                  </p>
                ) : filteredStudents.length === 0 ? (
                  <p className="text-xs md:text-sm text-gray-400">
                    해당하는 학생이 없습니다.
                  </p>
                ) : (
                  filteredStudents.map((stu) => (
                    <button
                      key={stu.id}
                      onClick={() => handleSelectStudentProfessor(stu)}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-sky-50 text-sm md:text-base flex justify-between"
                    >
                      <span>{stu.name}</span>
                      <span className="text-gray-500 text-xs md:text-sm">
                        {stu.id}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
                학생 본인 인증
              </h2>

              <form onSubmit={handleStudentLogin} className="space-y-3">
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                  />
                </div>

                {loginError && (
                  <p className="text-xs md:text-sm text-red-500">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full mt-2 bg-sky-500 hover:bg-sky-600 text-white text-sm md:text-base font-semibold py-2 rounded-lg transition-colors"
                >
                  내 정보 보기
                </button>
              </form>
            </>
          )}

          {/* 공통: 선택된 학생 정보 카드 */}
          {selectedStudent && (
            <div className="mt-5 border-t border-gray-100 pt-4 flex gap-4 items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={selectedStudent.photo}
                  alt={selectedStudent.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/80?text=Photo";
                  }}
                />
              </div>
              <div className="space-y-1 text-sm md:text-base text-gray-700">
                <p>
                  <span className="font-semibold">이름:</span>{" "}
                  {selectedStudent.name}
                </p>
                <p>
                  <span className="font-semibold">학번:</span>{" "}
                  {selectedStudent.id}
                </p>
                <p>
                  <span className="font-semibold">학과:</span>{" "}
                  {selectedStudent.major}
                </p>
                <p>
                  <span className="font-semibold">학년:</span>{" "}
                  {selectedStudent.grade}
                </p>
                <p>
                  <span className="font-semibold">학적 상태:</span>{" "}
                  {selectedStudent.status}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 상단 오른쪽 - 강의별 출결 현황 (학생에 따라 변경) */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
            강의별 출결 현황
          </h2>

          {!selectedStudent ? (
            <p className="text-xs md:text-sm text-gray-400">
              좌측에서 학생을 선택하거나 로그인하면 강의별 출결 현황이
              표시됩니다.
            </p>
          ) : lectureAttendance.length === 0 ? (
            <p className="text-xs md:text-sm text-gray-400">
              등록된 강의 출결 정보가 없습니다.
            </p>
          ) : (
            <ul className="space-y-3 text-sm md:text-base">
              {lectureAttendance.map((item, idx) => {
                const rate = Math.round((item.attended / item.total) * 100);
                return (
                  <li
                    key={idx}
                    className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.lecture}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        출석 {item.attended} / {item.total}
                      </p>
                    </div>
                    <span
                      className={`text-xs md:text-sm font-semibold ${
                        rate >= 90
                          ? "text-green-600"
                          : rate >= 80
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    >
                      {rate}%
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* 하단 왼쪽 - 이번 주 출결 게이지 (학생별) */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
            이번 주 출결
          </h2>
          <CircleGauge percent={weeklyRate} color="#38bdf8" />
          <p className="mt-3 text-xs md:text-sm text-gray-500">
            이번 주 전체 수업 기준 출석률
          </p>
        </div>

        {/* 하단 오른쪽 - 전체 출결 게이지 (학생별) */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
            전체 출결
          </h2>
          <CircleGauge percent={totalRate} color="#34d399" />
          <p className="mt-3 text-xs md:text-sm text-gray-500">
            학기 전체 수업 기준 출석률
          </p>
        </div>
      </div>
    </div>
  );
}
