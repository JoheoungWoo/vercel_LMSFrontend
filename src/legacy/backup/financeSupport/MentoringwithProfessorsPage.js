import React from "react";

const ProfessorMentoringPage = () => {
  const professorMentoring = [
    {
      id: 1,
      name: "김현수 교수",
      department: "컴퓨터공학과",
      field: "백엔드 개발, 서버 아키텍처, DB 구조 설계",
      intro:
        "현업 경험과 연구를 기반으로 웹 서비스 구조, 서버 개발, 데이터 모델링 관련 멘토링을 제공합니다.",
      available: "화 / 목 14:00 ~ 17:00",
      type: "정기 멘토링",
    },
    {
      id: 2,
      name: "박지연 교수",
      department: "소프트웨어학부",
      field: "프론트엔드, UX/UI, React",
      intro:
        "React 기반 프론트엔드 개발, UI 설계, 웹 접근성 관련 심층 멘토링을 진행합니다.",
      available: "월 / 수 13:00 ~ 16:00",
      type: "1:1 개별 상담",
    },
    {
      id: 3,
      name: "이정민 교수",
      department: "AI · 데이터사이언스 학과",
      field: "머신러닝, 딥러닝, 데이터 분석",
      intro:
        "AI 모델링, 데이터 분석 프로젝트, 대학원 진학 등을 중심으로 전문적인 상담을 제공합니다.",
      available: "금 10:00 ~ 15:00",
      type: "심화 멘토링",
    },
    {
      id: 4,
      name: "최서윤 교수",
      department: "경영정보학과",
      field: "프로젝트 기획, 비즈니스 모델링, 서비스 전략",
      intro:
        "IT 프로젝트 기획부터 서비스 전략까지 실무 중심 멘토링을 지원합니다.",
      available: "화 10:00 ~ 13:00",
      type: "프로젝트 멘토링",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            교수와의 멘토링
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            전공 교수님과 1:1 또는 그룹 상담을 통해 진로, 학업, 연구에 관한
            깊이 있는 멘토링을 받을 수 있습니다.
          </p>
        </header>

        {/* 리스트 영역 */}
        <section className="space-y-3">
          {professorMentoring.map((p) => (
            <article
              key={p.id}
              className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm hover:bg-slate-50"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    {p.name}
                  </h2>
                  <p className="text-xs text-slate-500">{p.department}</p>

                  <p className="mt-2 text-xs text-slate-600">
                    <span className="font-medium text-slate-700">전문 분야 </span>
                    {p.field}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">{p.intro}</p>
                </div>

                <div className="mt-2 sm:mt-0 sm:text-right sm:min-w-[150px]">
                  <p className="text-xs text-slate-600">
                    <span className="font-medium text-slate-700">멘토링 유형 </span>
                    {p.type}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    <span className="font-medium text-slate-700">상담 가능 시간 </span>
                    {p.available}
                  </p>

                  <button
                    type="button"
                    className="mt-3 inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1 text-[0.7rem] text-slate-700 shadow-sm hover:bg-slate-100"
                  >
                    신청 안내 보기
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* 안내 문구 */}
        <p className="mt-5 text-[0.75rem] text-slate-400">
          ※ 교수별 상담 시간은 변동될 수 있으며, 실제 신청은 학과 공지 또는 학생지원센터 안내를 따릅니다.
        </p>
      </div>
    </div>
  );
};

export default ProfessorMentoringPage;
