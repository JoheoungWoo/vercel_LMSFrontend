import React from "react";

export default function AcademicInfoPage() {
  const menus = [
    {
      title: "성적 조회",
      desc: "현재 학기 및 전체 학기 성적을 조회할 수 있습니다.",
      link: "/academics/grades",
    },
    {
      title: "학점 관리",
      desc: "이수 학점 현황 및 졸업 요건 충족 여부를 확인하세요.",
      link: "/academics/credits",
    },
    {
      title: "성적표 출력",
      desc: "공식 성적증명서를 온라인으로 출력할 수 있습니다.",
      link: "/academics/transcript",
    },
    {
      title: "학적 정보",
      desc: "휴학, 복학, 전과 등 학적 변동 내역을 확인하세요.",
      link: "/academics/record",
    },
    {
      title: "학사 일정",
      desc: "등록, 수강신청, 성적정정 등 주요 일정을 확인하세요.",
      link: "/academics/calendar",
    },
    {
      title: "학위증명",
      desc: "학위증명서 온라인 발급 및 신청이 가능합니다.",
      link: "/academics/degree",
    },
    {
      title: "장학금",
      desc: "교내·교외 장학금 정보 및 신청 절차를 안내합니다.",
      link: "/academics/scholarships",
    },
    {
      title: "등록금",
      desc: "등록금 납부 내역 및 고지서를 확인할 수 있습니다.",
      link: "/academics/tuition",
    },
    {
      title: "이수체계",
      desc: "각 전공의 권장 이수체계 및 커리큘럼을 제공합니다.",
      link: "/academics/curriculum",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
        성적·학사 정보
      </h1>

      {/* Card grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menus.map((menu) => (
          <a
            key={menu.title}
            href={menu.link}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-sky-700 mb-2">
              {menu.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{menu.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
