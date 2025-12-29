import React, { useMemo, useState } from "react";

const SupportServicesPage = () => {
  const services = [
    {
      id: 1,
      category: "멘토링",
      title: "학생 멘토링 프로그램",
      type: "멘토링",
      description:
        "선배 학생과의 1:1 또는 소그룹 멘토링을 통해 학업, 학교생활, 진로에 대한 전반적인 상담을 진행합니다.",
      target: "재학생",
      period: "상시 모집 (학기 중)",
    },
    {
      id: 2,
      category: "진로·취업",
      title: "진로·취업 상담",
      type: "진로·취업",
      description:
        "진로 탐색부터 이력서/자기소개서 작성, 포트폴리오 구성까지 진로·취업 전반에 대한 개별 상담을 제공합니다.",
      target: "3, 4학년 우선",
      period: "사전 예약제",
    },
    {
      id: 3,
      category: "교수 멘토링",
      title: "전공 교수와의 멘토링",
      type: "교수 멘토링",
      description:
        "전공 교수와의 정기 멘토링을 통해 전공 공부 방향, 연구, 진학(대학원) 등 심화 진로 상담을 받을 수 있습니다.",
      target: "해당 학과 재학생",
      period: "학기별 신청",
    },
    {
      id: 4,
      category: "취업지원 상담",
      title: "취업 역량 진단 & 코칭",
      type: "취업지원 상담",
      description:
        "취업 준비 현황을 진단하고, 부족한 역량(기술/자격/경험)에 대해 구체적인 보완 방향을 함께 설계합니다.",
      target: "졸업예정자, 졸업생",
      period: "온라인/오프라인 병행",
    },
    {
      id: 5,
      category: "진로·취업",
      title: "현직자 특강 & 네트워킹",
      type: "진로·취업",
      description:
        "산업 현직자를 초청하여 실무 이야기, 커리어 패스, 연봉 및 조직 문화 등을 직접 듣고 질문할 수 있는 자리입니다.",
      target: "전 학년",
      period: "월 1회 예정",
    },
    {
      id: 6,
      category: "멘토링",
      title: "팀 프로젝트 멘토링",
      type: "멘토링",
      description:
        "팀 단위 프로젝트 진행 시, 멘토가 기획·설계·코드 리뷰 등 전 과정을 함께 점검하며 피드백을 제공합니다.",
      target: "프로젝트 참여 학생",
      period: "프로젝트 기간 내",
    },
  ];

  const categories = useMemo(() => {
    const set = new Set(services.map((s) => s.category));
    return ["전체", ...Array.from(set)];
  }, [services]);

  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredServices =
    selectedCategory === "전체"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            지원 · 멘토링 센터
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            멘토링, 진로·취업, 교수 멘토링, 취업지원 상담 등 다양한 지원 프로그램을 한 곳에서 확인할 수 있습니다.
          </p>
        </header>

        {/* 카테고리 필터 */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={[
                  "rounded-full border px-3 py-1 text-xs",
                  "transition-colors duration-150",
                  selectedCategory === cat
                    ? "border-sky-500 bg-sky-50 text-sky-700"
                    : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50",
                ].join(" ")}
              >
                {cat === "전체" ? "전체 보기" : cat}
              </button>
            ))}
          </div>
        </section>

        {/* 프로그램 리스트 */}
        <section className="space-y-3">
          {filteredServices.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-400 shadow-sm">
              선택한 분류에 해당하는 지원 프로그램이 없습니다.
            </div>
          ) : (
            filteredServices.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm hover:bg-slate-50"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h2>
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-[2px] text-[0.7rem] text-slate-500">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 text-right text-xs text-slate-500 sm:mt-0 sm:min-w-[140px]">
                    <p>
                      <span className="font-medium text-slate-600">대상</span>{" "}
                      {item.target}
                    </p>
                    <p className="mt-1">
                      <span className="font-medium text-slate-600">운영</span>{" "}
                      {item.period}
                    </p>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1 text-[0.7rem] text-slate-700 shadow-sm hover:bg-slate-100"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* 안내 문구 */}
        <p className="mt-4 text-[0.75rem] text-slate-400">
          ※ 상기 내용은 예시용 더미 데이터이며, 실제 운영 일정 및 세부 내용은 학교 공지사항을 통해 확인해주세요.
        </p>
      </div>
    </div>
  );
};

export default SupportServicesPage;
