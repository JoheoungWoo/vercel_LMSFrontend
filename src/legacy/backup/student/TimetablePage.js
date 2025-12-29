import { useState } from "react";

export default function TimeTablePage() {
  const [selectedLecture, setSelectedLecture] = useState(null);

  const days = ["월", "화", "수", "목", "금"];

  const periods = [
    "1교시 (09:00~10:00)",
    "2교시 (10:00~11:00)",
    "3교시 (11:00~12:00)",
    "4교시 (13:00~14:00)",
    "5교시 (14:00~15:00)",
    "6교시 (15:00~16:00)",
    "7교시 (16:00~17:00)",
    "8교시 (17:00~18:00)",
    "9교시 (19:00~20:00)",
    "10교시 (20:00~21:00)",
  ];

  const lectures = {
    월: [
      { name: "웹 프로그래밍", major: "컴퓨터공학" },
      { name: "웹 프로그래밍", major: "컴퓨터공학" }, // 연강 ▼
      { name: "웹 프로그래밍", major: "컴퓨터공학" }, // 연강 ▼ (3시간 연강)
      { name: "자료구조", major: "컴퓨터공학" },
      null,
      { name: "전공 세미나", major: "소프트웨어" },
      { name: "전공 세미나", major: "소프트웨어" }, // 연강
      null,
      { name: "팀 프로젝트", major: "소프트웨어" },
      null,
    ],

    화: [
      null,
      { name: "데이터베이스", major: "소프트웨어" },
      { name: "데이터베이스", major: "소프트웨어" }, // 연강
      { name: "컴퓨터 구조", major: "컴퓨터공학" },
      null,
      null,
      { name: "SQL 실습", major: "소프트웨어" },
      null,
      null,
      null,
    ],

    수: [
      { name: "운영체제", major: "컴퓨터공학" },
      { name: "운영체제", major: "컴퓨터공학" }, // 연강
      { name: "알고리즘", major: "컴퓨터공학" },
      null,
      { name: "팀 프로젝트", major: "소프트웨어" },
      { name: "팀 프로젝트", major: "소프트웨어" }, // 연강
      { name: "캡스톤 미팅", major: "종합설계" },
      { name: "캡스톤 미팅", major: "종합설계" }, // 연강
      null,
      null,
    ],

    목: [
      null,
      { name: "네트워크", major: "컴퓨터공학" },
      { name: "네트워크", major: "컴퓨터공학" }, // 연강
      { name: "모바일 프로그래밍", major: "소프트웨어" },
      null,
      null,
      { name: "모바일 프로그래밍", major: "소프트웨어" }, // 비정형 재연강
      null,
      { name: "스터디", major: "자율학습" },
      null,
    ],

    금: [
      null,
      null,
      { name: "교양 영어", major: "교양" },
      { name: "교양 영어", major: "교양" }, // 연강
      null,
      { name: "교양 체육", major: "교양" },
      null,
      null,
      null,
      null,
    ],
  };

  // 모달 내부 컨텐츠 (강의 이름 기준)
  const lectureInfoPage = {
    "웹 프로그래밍": {
      교수: "김교수",
      장소: "IT관 302호",
      설명: "HTML, CSS, JavaScript를 배우는 기초 웹 개발 수업.",
    },
    자료구조: {
      교수: "박교수",
      장소: "공학관 204호",
      설명: "스택, 큐, 리스트, 트리 등 자료 구조 집중 학습.",
    },
    "전공 세미나": {
      교수: "최교수",
      장소: "IT관 101호",
      설명: "현업 개발자들이 방문해 기술 트렌드를 소개합니다.",
    },
    데이터베이스: {
      교수: "강교수",
      장소: "IT관 202호",
      설명: "SQL, ERD, 트랜잭션 등을 배우는 핵심 전공.",
    },
    // 필요한 강의 더 추가 가능
  };

  const getBgClassByMajor = (major) => {
    switch (major) {
      case "컴퓨터공학":
        return "bg-blue-100";
      case "소프트웨어":
        return "bg-green-100";
      case "정보통신":
        return "bg-purple-100";
      case "교양":
        return "bg-yellow-100";
      case "종합설계":
        return "bg-pink-100";
      case "자율학습":
        return "bg-gray-100";
      default:
        return "bg-sky-50"; // 기본값
    }
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">📚 강의 시간표</h1>

      {/* 시간표 */}
      <div className="overflow-x-auto">
        <table className="min-w-[600px] md:min-w-full border-collapse border border-gray-300 text-center text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-3 py-3 bg-gray-100">
                교시
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border border-gray-300 px-3 py-3 bg-gray-100"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {periods.map((period, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-3 bg-gray-50 font-semibold whitespace-nowrap">
                  {period}
                </td>

                {days.map((day) => {
                  const lec = lectures[day][idx];

                  if (!lec) {
                    return (
                      <td
                        key={day}
                        className="border px-3 py-3 cursor-pointer transition hover:bg-sky-50"
                      >
                        -
                      </td>
                    );
                  }

                  const bgClass = getBgClassByMajor(lec.major);

                  return (
                    <td
                      key={day}
                      className={`border px-3 py-3 cursor-pointer transition text-center ${bgClass} hover:brightness-95`}
                      onClick={() => setSelectedLecture(lec)}
                    >
                      <div className="font-semibold">{lec.name}</div>
                      <div className="text-xs text-gray-700">{lec.major}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 모달 */}
      {selectedLecture && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-3">
              {selectedLecture.name}
            </h2>

            <div className="text-sm text-gray-700 space-y-1 mb-5">
              <p>
                <b>교수:</b>{" "}
                {lectureInfoPage[selectedLecture.name]?.교수 ?? "미정"}
              </p>
              <p>
                <b>장소:</b>{" "}
                {lectureInfoPage[selectedLecture.name]?.장소 ?? "미정"}
              </p>
              <p>
                <b>설명:</b>{" "}
                {lectureInfoPage[selectedLecture.name]?.설명 ??
                  "강의 정보가 없습니다."}
              </p>
            </div>

            <button
              onClick={() => setSelectedLecture(null)}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
