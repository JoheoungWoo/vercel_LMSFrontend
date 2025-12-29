
/* =========================
   Section Header
========================= */
export function SectionHeader({
  tag,
  tagColor,
  title,
  description,
  badge,
  badgeColor,
}) {
  const tagColorMap = {
    teal: "text-teal-500",
    lime: "text-lime-500",
    fuchsia: "text-fuchsia-500",
  };

  const badgeColorMap = {
    teal: "text-teal-500 bg-teal-50",
    lime: "text-lime-500 bg-lime-50",
    fuchsia: "text-fuchsia-500 bg-fuchsia-50",
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p
          className={`text-xs font-semibold uppercase tracking-wide ${tagColorMap[tagColor]}`}
        >
          {tag}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${badgeColorMap[badgeColor]}`}
      >
        {badge}
      </span>
    </div>
  );
}

/* =========================
   Dashboard Button
========================= */
export function DashboardButton({ label, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-slate-800">{label}</span>
        <span className="text-[10px] uppercase tracking-wide text-slate-400">
          Open
        </span>
      </div>
      {description && (
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      )}
    </button>
  );
}

/* =========================
   Dashboard Modal
========================= */
export function DashboardModal({ activeModal, onClose }) {
  if (!activeModal) return null;

  const { title, subtitle, hint } = renderModalContent(activeModal);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25">
      <div className="w-full max-w-[80%] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
          <p className="mb-2 font-medium text-slate-700">
            🔧 개발자용 placeholder 영역
          </p>
          <p className="leading-relaxed">
            실제 폼, 테이블, 검색 UI를 이 영역에 배치하면 됩니다.
          </p>
          {hint && (
            <p className="mt-3 text-[11px]">
              <span className="font-semibold">UI 힌트: </span>
              {hint}
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Modal Resolver
========================= */
function renderModalContent(activeModal) {
  switch (activeModal) {
    case modalTypes.CREDIT_MANAGE:
      return {
        title: "학점 관리",
        subtitle: "학생의 이수 학점을 관리합니다.",
        hint: "학기별 성적 테이블과 필수/선택 구분 표시를 추천합니다.",
      };
    case modalTypes.STUDENT_STATUS:
      return {
        title: "학적 상태 관리",
        subtitle: "학생의 학적 상태를 관리합니다.",
        hint: "변경 이력 및 사유 입력 UI를 고려하세요.",
      };
    case modalTypes.GRADUATION_CHECK:
      return {
        title: "졸업 요건 점검",
        subtitle: "졸업 가능 여부를 확인합니다.",
        hint: "이수 학점 및 평균 평점 자동 계산을 추천합니다.",
      };
    case modalTypes.DEGREE_CERT:
      return {
        title: "증명서 발급",
        subtitle: "학사 증명서를 발급합니다.",
        hint: "PDF 미리보기 및 발급 이력 테이블을 추천합니다.",
      };
    case modalTypes.RECORD_CORRECTION:
      return {
        title: "학적 기록 정정",
        subtitle: "기록 정정 요청을 처리합니다.",
        hint: "증빙 자료 업로드 및 승인 프로세스를 고려하세요.",
      };
    case modalTypes.ACADEMIC_CALENDAR:
      return {
        title: "학사 일정 관리",
        subtitle: "학기별 학사 일정을 관리합니다.",
        hint: "캘린더 UI + 일정 유형 필터를 추천합니다.",
      };
    case modalTypes.TUITION_MANAGE:
      return {
        title: "등록금 관리",
        subtitle: "등록금 납부 상태를 관리합니다.",
        hint: "고지서 다운로드 및 미납 필터 기능을 고려하세요.",
      };
    case modalTypes.SCHOLARSHIP_MANAGE:
      return {
        title: "장학금 관리",
        subtitle: "장학금 지급 내역을 관리합니다.",
        hint: "장학 유형별 지급 현황 요약을 추천합니다.",
      };
    default:
      return {
        title: "학사 행정",
        subtitle: "",
        hint: "",
      };
  }
}

/* =========================
   Modal Types (소분류)
========================= */
export const modalTypes = {
  CREDIT_MANAGE: "CREDIT_MANAGE",
  STUDENT_STATUS: "STUDENT_STATUS",
  GRADUATION_CHECK: "GRADUATION_CHECK",

  DEGREE_CERT: "DEGREE_CERT",
  RECORD_CORRECTION: "RECORD_CORRECTION",

  ACADEMIC_CALENDAR: "ACADEMIC_CALENDAR",
  TUITION_MANAGE: "TUITION_MANAGE",
  SCHOLARSHIP_MANAGE: "SCHOLARSHIP_MANAGE",
};