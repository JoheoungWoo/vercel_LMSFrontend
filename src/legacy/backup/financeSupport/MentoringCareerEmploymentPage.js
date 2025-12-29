import React, { useState } from "react";

const EmploymentSupportPage = () => {
  const [selectedType, setSelectedType] = useState("전체");

  const programs = [
    {
      id: 1,
      title: "진로 · 취업 1:1 상담",
      type: "상담",
      level: "기본",
      description:
        "진로 탐색부터 취업 준비 방향 설정까지, 현재 상황을 함께 정리하고 다음 행동 계획을 세우는 개별 상담입니다.",
      target: "전 학년 (졸업예정자 우선)",
      method: "온라인 / 오프라인 선택",
      duration: "1회 50분",
    },
    {
      id: 2,
      title: "이력서 · 자기소개서 클리닉",
      type: "클리닉",
      level: "실전",
      description:
        "작성한 이력서와 자기소개서를 기반으로 문장, 구성, 직무 적합도를 점검하고 수정 방향을 구체적으로 제안합니다.",
      target: "취업 준비생",
      method: "개별 코칭",
      duration: "1회 40분",
    },
    {
      id: 3,
      title: "모의 면접 & 피드백",
      type: "상담",
      level: "실전",
      description:
        "실제 면접 형식으로 진행 후, 답변 내용·표정·시선 처리 등 전반에 대한 피드백을 제공합니다.",
      target: "졸업예정자, 취업 준비생",
      method: "대면 / 비대면",
      duration: "1회 30~40분",
    },
    {
      id: 4,
      title: "커리어 코칭 프로그램",
      type: "프로그램",
      level: "심화",
      description:
        "장기적인 커리어 목표를 설정하고, 필요한 기술/경험/자격을 단계별 로드맵으로 정리해가는 코칭 프로그램입니다.",
      target: "3, 4학년, 졸업생",
      method: "주 1회, 4주 과정",
      duration: "4주 과정",
    },
    {
      id: 5,
      title: "채용 정보 · 공고 큐레이션",
      type: "프로그램",
      level: "정보",
      description:
        "전공 및 희망 직무에 맞춘 채용 공고, 인턴십, 대외활동 정보를 정리해 주간 단위로 제공하는 서비스입니다.",
      target: "전 학년",
      method: "온라인 안내",
      duration: "주 1회 업데이트",
    },
    {
      id: 6,
      title: "취업 스터디 매칭",
      type: "프로그램",
      level: "실전",
      description:
        "같은 직무를 준비하는 학생들끼리 스터디 그룹을 구성하고, 기본 커리큘럼과 참고 자료를 지원합니다.",
      target: "취업 준비생",
      method: "온라인/오프라인 자율",
      duration: "자율 진행",
    },
  ];

  const typeFilters = ["전체", "상담", "클리닉", "프로그램"];

  const filteredPrograms =
    selectedType === "전체"
      ? programs
      : programs.filter((p) => p.type === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-sky-50/40">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 상단 헤더 + 살짝 그라디언트 카드 */}
        <header className="mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white/80 shadow-sm">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-sky-200/60 to-transparent opacity-70" />
            <div className="relative px-6 py-5 md:px-8 md:py-6">
              <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
                취업 지원 · 상담 센터
              </h1>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                진로가 막막할 때, 준비 방향이 헷갈릴 때, 누가 봐주는 사람이 필요할 때.
                취업 지원/상담 프로그램에서 함께 다음 단계를 정리해 보세요.
              </p>

              {/* 작은 단계 표시 (은근슬쩍 효과) */}
              <div className="mt-4 flex items-center gap-4 text-[0.7rem] text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="h-[2px] w-10 rounded-full bg-sky-300" />
                  <span>1. 현황 정리</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-[2px] w-10 rounded-full bg-sky-300/80" />
                  <span>2. 상담 · 피드백</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-[2px] w-10 rounded-full bg-sky-400" />
                  <span>3. 실행 계획</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 필터 + 메인 영역 */}
        <main className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          {/* 왼쪽: 프로그램 리스트 */}
          <section>
            {/* 필터 버튼 */}
            <div className="mb-4 flex flex-wrap gap-2">
              {typeFilters.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  className={[
                    "rounded-full border px-3 py-1 text-xs transition-all duration-150",
                    selectedType === t
                      ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                      : "border-slate-300 bg-white/80 text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {t === "전체" ? "전체 보기" : t}
                </button>
              ))}
            </div>

            {/* 프로그램 카드 리스트 */}
            <div className="space-y-3">
              {filteredPrograms.map((p) => (
                <article
                  key={p.id}
                  className="group rounded-xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-slate-800">
                          {p.title}
                        </h2>
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-[2px] text-[0.65rem] text-slate-500">
                          {p.type}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-[2px] text-[0.65rem] font-medium text-sky-700">
                          {p.level}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600">
                        {p.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-slate-600">
                        <p>
                          <span className="font-medium text-slate-700">
                            대상{" "}
                          </span>
                          {p.target}
                        </p>
                        <p>
                          <span className="font-medium text-slate-700">
                            방식{" "}
                          </span>
                          {p.method}
                        </p>
                        <p>
                          <span className="font-medium text-slate-700">
                            진행{" "}
                          </span>
                          {p.duration}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-end justify-start gap-2 md:mt-0 md:flex-col md:items-end md:justify-between">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-sky-500 px-4 py-1.5 text-[0.7rem] font-medium text-white shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:shadow-md"
                      >
                        상담 예약하기
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1 text-[0.7rem] text-slate-700 shadow-sm transition-colors duration-150 hover:bg-slate-100"
                      >
                        상세 안내 보기
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {filteredPrograms.length === 0 && (
                <div className="rounded-lg border border-slate-200 bg-white/90 px-4 py-6 text-center text-sm text-slate-400">
                  선택한 유형에 해당하는 프로그램이 없습니다.
                </div>
              )}
            </div>
          </section>

          {/* 오른쪽: 간단한 안내·TIP 카드 (이펙트 조금 더) */}
          <aside className="space-y-3">
            <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-100/80 via-white to-sky-50 shadow-sm">
              <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-sky-200/50 blur-2xl" />
              <div className="relative px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  상담 예약 전 체크리스트
                </h3>
                <ul className="mt-2 space-y-1.5 text-[0.75rem] text-slate-600">
                  <li>· 현재 준비 상황을 한 줄로 정리해보기</li>
                  <li>· 궁금한 점 2~3개 메모해오기</li>
                  <li>· 관심 있는 직무/회사 유형 생각해보기</li>
                </ul>
                <p className="mt-3 text-[0.7rem] text-slate-500">
                  간단히 정리해두면 상담 시간이 훨씬 알차게 느껴져요.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800">
                상담 진행 방식
              </h3>
              <ol className="mt-2 space-y-1.5 text-[0.75rem] text-slate-600">
                <li>1) 온라인 신청 또는 센터 방문 접수</li>
                <li>2) 담당자 배정 및 일정 확정 안내</li>
                <li>3) 1:1 상담 또는 프로그램 참여</li>
                <li>4) 후속 피드백 및 추가 상담 연계 가능</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800">
                이런 경우 특히 추천해요
              </h3>
              <ul className="mt-2 space-y-1.5 text-[0.75rem] text-slate-600">
                <li>· 진로는 대충 알겠는데, 무엇부터 해야 할지 모르겠을 때</li>
                <li>· 이력서/자소서를 "누가 한 번만 봐줬으면" 싶을 때</li>
                <li>· 면접이 너무 부담될 때, 연습이 필요할 때</li>
              </ul>
            </div>
          </aside>
        </main>

        {/* 하단 안내 문구 */}
        <p className="mt-6 text-[0.75rem] text-slate-400">
          ※ 모든 내용은 예시용 더미 데이터이며, 실제 운영 시간과 신청 방법은 학교
          공지 및 학생지원센터 안내를 기준으로 합니다.
        </p>
      </div>
    </div>
  );
};

export default EmploymentSupportPage;
