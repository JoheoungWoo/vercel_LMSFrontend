// src/pages/academicAffairs/degreeCertificates/DegreeCertificatesPage.jsx
import React, { useMemo, useState } from "react";

const CERTIFICATES = [
  {
    id: 1,
    type: "degree",
    name: "학위증명서",
    description: "졸업한 학위 정보를 증명하는 문서",
    language: "KR",
    available: true,
    fee: 0,
    lastIssuedAt: "2025-02-14",
    issueCount: 3,
  },
  {
    id: 2,
    type: "degree",
    name: "학위증명서 (영문)",
    description: "영문으로 발급되는 학위 증명 문서",
    language: "EN",
    available: true,
    fee: 0,
    lastIssuedAt: "2025-01-02",
    issueCount: 1,
  },
  {
    id: 3,
    type: "enrollment",
    name: "재학증명서",
    description: "현재 재학 사실을 증명하는 문서",
    language: "KR",
    available: true,
    fee: 0,
    lastIssuedAt: "2024-09-01",
    issueCount: 2,
  },
  {
    id: 4,
    type: "enrollment",
    name: "재학증명서 (영문)",
    description: "영문으로 발급되는 재학 증명 문서",
    language: "EN",
    available: true,
    fee: 0,
    lastIssuedAt: null,
    issueCount: 0,
  },
  {
    id: 5,
    type: "transcript",
    name: "성적증명서",
    description: "누적 성적 및 학점을 증명하는 문서",
    language: "KR",
    available: true,
    fee: 0,
    lastIssuedAt: "2024-12-20",
    issueCount: 1,
  },
  {
    id: 6,
    type: "grad_expected",
    name: "졸업예정증명서",
    description: "졸업 예정일 및 이수 현황을 증명하는 문서",
    language: "KR",
    available: false,
    fee: 0,
    lastIssuedAt: null,
    issueCount: 0,
  },
];

const TYPE_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "degree", label: "학위증명서" },
  { value: "enrollment", label: "재학증명서" },
  { value: "transcript", label: "성적증명서" },
  { value: "grad_expected", label: "졸업예정증명서" },
];

const LANGUAGE_OPTIONS = [
  { value: "all", label: "전체 언어" },
  { value: "KR", label: "국문" },
  { value: "EN", label: "영문" },
];

function languageLabel(lang) {
  if (lang === "KR") return "국문";
  if (lang === "EN") return "영문";
  return lang;
}

export default function DegreeCertificatesPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const filteredCertificates = useMemo(() => {
    return CERTIFICATES.filter((c) => {
      const matchType = selectedType === "all" || c.type === selectedType;
      const matchLang = selectedLanguage === "all" || c.language === selectedLanguage;
      return matchType && matchLang;
    });
  }, [selectedType, selectedLanguage]);

  const lastIssuedList = useMemo(
    () =>
      CERTIFICATES.filter((c) => c.lastIssuedAt)
        .sort((a, b) => (a.lastIssuedAt < b.lastIssuedAt ? 1 : -1))
        .slice(0, 3),
    []
  );

  const handleIssue = (cert) => {
    if (!cert.available) {
      alert("아직 발급이 불가능한 증명서입니다. (졸업/이수 조건을 확인해주세요.)");
      return;
    }
    setSelectedCertificate(cert);
    // 실제 시스템에서는 여기서 발급 API 호출 or 발급 페이지로 이동
    alert(`"${cert.name}" 발급 프로세스를 시작합니다. (더미 동작)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-sky-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 헤더 */}
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">학위 증명</h1>
            <p className="mt-1 text-sm text-slate-500">
              학위·재학·성적 관련 증명서를 온라인으로 조회하고 발급할 수 있습니다.
            </p>
          </div>

          {/* 간단 상태 요약 */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm">
              발급 가능 증명서{" "}
              <span className="font-semibold text-emerald-600">
                {CERTIFICATES.filter((c) => c.available).length}종
              </span>
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm">
              최근 발급{" "}
              <span className="font-semibold text-sky-600">
                {lastIssuedList.length}건
              </span>
            </span>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr,1.1fr]">
          {/* 좌측: 증명서 목록 */}
          <section className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur">
            {/* 필터 영역 */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                발급 가능한 증명서 목록
              </h2>
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="min-w-[130px] rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs text-slate-800 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="min-w-[130px] rounded-lg border border-sky-200 bg-white px-3 py-1.5 text-xs text-slate-800 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                >
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.7rem] uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2">증명서명</th>
                    <th className="px-3 py-2">언어</th>
                    <th className="px-3 py-2">설명</th>
                    <th className="px-3 py-2 text-center">수수료</th>
                    <th className="px-3 py-2 text-center">발급 상태</th>
                    <th className="px-3 py-2 text-center">발급</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCertificates.map((cert) => (
                    <tr
                      key={cert.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-emerald-50/40"
                    >
                      <td className="px-3 py-2 align-middle text-[0.85rem] font-medium text-slate-900">
                        {cert.name}
                      </td>
                      <td className="px-3 py-2 align-middle text-[0.75rem] text-slate-600">
                        <span className="rounded-full bg-slate-50 px-2 py-1">
                          {languageLabel(cert.language)}
                        </span>
                      </td>
                      <td className="px-3 py-2 align-middle text-[0.8rem] text-slate-600">
                        {cert.description}
                      </td>
                      <td className="px-3 py-2 text-center align-middle text-[0.8rem]">
                        {cert.fee === 0 ? (
                          <span className="text-emerald-600">무료</span>
                        ) : (
                          `${cert.fee.toLocaleString()}원`
                        )}
                      </td>
                      <td className="px-3 py-2 text-center align-middle">
                        {cert.available ? (
                          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[0.75rem] text-emerald-700">
                            발급 가능
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[0.75rem] text-slate-500">
                            발급 불가
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => handleIssue(cert)}
                          className={`rounded-full px-3 py-1 text-[0.75rem] font-medium transition ${
                            cert.available
                              ? "bg-gradient-to-r from-emerald-400 to-sky-400 text-white hover:brightness-110"
                              : "cursor-not-allowed bg-slate-100 text-slate-400"
                          }`}
                        >
                          발급하기
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredCertificates.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-3 py-6 text-center text-xs text-slate-400"
                      >
                        조건에 맞는 증명서가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* 우측: 안내 및 최근 발급 내역 */}
          <section className="flex flex-col gap-4">
            {/* 발급 안내 */}
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm backdrop-blur">
              <h2 className="text-sm font-semibold text-slate-900">
                온라인 발급 안내
              </h2>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-[0.8rem] text-slate-600">
                <li>발급을 원하는 증명서를 목록에서 선택합니다.</li>
                <li>언어(국문/영문)와 발급 매수를 확인합니다.</li>
                <li>온라인 발급 버튼을 눌러 PDF로 내려받을 수 있습니다.</li>
                <li>오프라인 제출용이 필요한 경우 출력 후 사용하세요.</li>
              </ol>

              <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-[0.75rem] text-emerald-700">
                ※ 실제 서비스 연동 시에는 본인 인증 및 수수료 결제 절차가 추가될 수
                있습니다. (현재 페이지는 더미 UI입니다.)
              </div>
            </div>

            {/* 최근 발급 내역 */}
            <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  최근 발급 내역
                </h2>
                <span className="text-[0.7rem] text-slate-400">
                  최근 3건 기준 (더미 데이터)
                </span>
              </div>

              <ul className="space-y-2 text-[0.8rem] text-slate-700">
                {lastIssuedList.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-[0.7rem] text-slate-500">
                        발급일: {item.lastIssuedAt} · 누적 {item.issueCount}회
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-2 py-1 text-[0.7rem] text-slate-500">
                      {languageLabel(item.language)}
                    </span>
                  </li>
                ))}

                {lastIssuedList.length === 0 && (
                  <li className="rounded-xl bg-slate-50 px-3 py-4 text-center text-xs text-slate-400">
                    아직 발급 내역이 없습니다.
                  </li>
                )}
              </ul>
            </div>

            {/* 선택된 증명서 요약 (선택 시만) */}
            {selectedCertificate && (
              <div className="rounded-2xl border border-rose-100 bg-white/80 p-4 text-[0.8rem] text-slate-700 shadow-sm backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">
                  선택된 증명서
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedCertificate.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedCertificate.description}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  이 증명서는 온라인으로 발급되며, PDF 다운로드 후 출력하여 사용할 수
                  있습니다.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
