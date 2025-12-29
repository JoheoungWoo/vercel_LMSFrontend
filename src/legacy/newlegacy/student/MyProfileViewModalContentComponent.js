export default function MyProfileViewModalContentComponent() {
  return (
    <div className="space-y-6">
      {/* ===== 기본 정보 ===== */}
      <section className="rounded-lg border bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">
          기본 정보
        </h3>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <InfoItem label="이름" value="김유라" />
          <InfoItem label="역할" value="학생" />
          <InfoItem label="학번" value="202312345" />
          <InfoItem label="소속" value="컴퓨터공학과" />
        </div>
      </section>

      {/* ===== 계정 정보 ===== */}
      <section className="rounded-lg border bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">
          계정 정보
        </h3>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <InfoItem label="이메일" value="youra@email.com" />
          <InfoItem label="계정 상태" value="활성" />
          <InfoItem label="가입일" value="2024-03-01" />
          <InfoItem label="마지막 로그인" value="2025-03-22 14:20" />
        </div>
      </section>

      {/* ===== 하단 액션 ===== */}
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          내 정보 수정
        </button>
      </div>
    </div>
  );
}

/* ===== 공통 정보 아이템 ===== */
function InfoItem({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
