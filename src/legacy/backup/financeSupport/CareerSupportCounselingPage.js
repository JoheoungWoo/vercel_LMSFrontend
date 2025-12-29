import React, { useState } from "react";

const MentoringCareerPage = () => {
  const [activeTab, setActiveTab] = useState("mentoring");

  const mentoringPrograms = [
    {
      id: 1,
      title: "학생 선·후배 멘토링",
      description:
        "재학생 선배와 1:1 또는 소그룹으로 매칭하여 학업, 학교생활, 진로 고민을 편하게 나눌 수 있는 프로그램입니다.",
      target: "신입생 · 저학년",
      period: "학기 중 상시 신청",
      method: "온라인/오프라인 선택",
    },
    {
      id: 2,
      title: "교수 전공 멘토링",
      description:
        "전공 교수님과 정기적으로 만나 전공 공부 방향, 연구 분야, 진학(대학원) 관련 상담을 진행합니다.",
      target: "해당 학과 재학생",
      period: "학기별 신청 기간 운영",
      method: "대면 상담 위주",
    },
    {
      id: 3,
      title: "팀 프로젝트 멘토링",
      description:
        "팀 단위 프로젝트 진행 시, 멘토가 기획·설계·코드 리뷰 등 전 과정을 주기적으로 점검하며 피드백을 제공합니다.",
      target: "프로젝트 참여 팀",
      period: "프로젝트 기간 내 상시",
      method: "온라인/오프라인 병행",
    },
  ];

  const careerPrograms = [
    {
      id: 1,
      title: "진로 · 취업 1:1 상담",
      description:
        "진로 탐색부터 이력서/자기소개서, 포트폴리오, 면접 대응까지 개별 상황에 맞춘 상담을 제공합니다.",
      target: "전 학년 (졸업예정자 우선)",
      period: "사전 예약제",
      method: "온라인/오프라인 선택",
    },
    {
      id: 2,
      title: "이력서 · 자기소개서 클리닉",
      description:
        "작성한 이력서와 자기소개서를 바탕으로 문장, 구성, 기업/직무 핏을 함께 점검하고 수정 방향을 제안합니다.",
      target: "취업 준비생",
      period: "주 2회 운영",
      method: "개별 코칭",
    },
    {
      id: 3,
      title: "현직자 직무 특강",
      description:
        "IT, 기획, 마케팅 등 다양한 분야의 현직자를 초청하여 실제 업무 내용과 커리어 경로를 들을 수 있는 특강입니다.",
      target: "전 학년",
      period: "월 1회 이상",
      method: "오프라인 강연 + Q&A",
    },
    {
      id: 4,
      title: "모의 면접 & 피드백",
      description:
        "실제 면접 형식으로 진행한 뒤, 답변 내용·자세·시선 처리 등 전반에 대한 피드백을 제공합니다.",
      target: "졸업예정자, 취업 준비생",
      period: "상시 신청 (선착순)",
      method: "대면/비대면 선택",
    },
  ];

  const renderCard = (item) => (
    <article
      key={item.id}
      className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm hover:bg-slate-50"
    >
      <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
      <p className="mt-1 text-xs text-slate-500">{item.description}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-[0.75rem] text-slate-600">
        <p>
          <span className="font-medium text-slate-700">대상 </span>
          {item.target}
        </p>
        <p>
          <span className="font-medium text-slate-700">운영 </span>
          {item.period}
        </p>
        <p>
          <span className="font-medium text-slate-700">방식 </span>
          {item.method}
        </p>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1 text-[0.7rem] text-slate-700 shadow-sm hover:bg-slate-100"
        >
          신청 안내 보기
        </button>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            멘토링 · 진로/취업 지원
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            멘토링 프로그램과 진로/취업 지원 서비스를 한 곳에서 확인하고, 필요한
            지원을 선택해 신청할 수 있습니다.
          </p>
        </header>

        {/* 탭 */}
        <div className="mb-5 flex gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("mentoring")}
            className={[
              "px-3 py-2 text-sm",
              activeTab === "mentoring"
                ? "border-b-2 border-sky-500 font-semibold text-sky-700"
                : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            멘토링 프로그램
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("career")}
            className={[
              "px-3 py-2 text-sm",
              activeTab === "career"
                ? "border-b-2 border-sky-500 font-semibold text-sky-700"
                : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            진로 · 취업 지원
          </button>
        </div>

        {/* 내용 */}
        {activeTab === "mentoring" && (
          <section className="space-y-3">
            {mentoringPrograms.map(renderCard)}
          </section>
        )}

        {activeTab === "career" && (
          <section className="space-y-3">
            {careerPrograms.map(renderCard)}
          </section>
        )}

        {/* 안내 문구 */}
        <p className="mt-5 text-[0.75rem] text-slate-400">
          ※ 위 내용은 예시용 더미 데이터이며, 실제 운영 일정과 신청 방법은
          학교 공지 및 학생지원센터 안내를 기준으로 합니다.
        </p>
      </div>
    </div>
  );
};

export default MentoringCareerPage;
