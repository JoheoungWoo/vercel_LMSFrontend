import { createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

// 1. 테이블 정의 가져오기 (tablesConfig.js에 "attendance" 키가 있다고 가정)
const tableName = "attendance";
const tableDefinition = tableDefinitions[tableName];

// 2. 기본 CRUD 설정 생성
// - tableDefinition.key가 "attendance"이므로 기본 URL은 "/api/attendance"가 됩니다.
// - config.funcs.writeOne  => POST /api/attendance/create (자동 생성됨)
// - config.funcs.updateOne => PUT  /api/attendance/update (자동 생성됨)
const config = createTableConfig(tableDefinition, []);

// 3. 커스텀 함수 및 별칭(Alias) 매핑
// Hook에서 사용하는 함수 이름(createAttendance 등)을 commonApi가 만든 함수와 연결합니다.

// [교수용] 출결 생성 (POST /api/attendance/create)
// commonApi의 writeOne이 이미 /create로 요청을 보냅니다.
config.funcs.createAttendance = config.funcs.writeOne;

// [교수용] 출결 수정 (PUT /api/attendance/update)
// commonApi의 updateOne이 이미 /update로 요청을 보냅니다.
config.funcs.updateAttendance = config.funcs.updateOne;

// [교수용] 특정 강의(Offering)의 전체 출결 현황 조회
// URL: /api/attendance/offering/{offeringId}
config.funcs.findByOffering = async (offeringId, userEmail) => {
  return config.funcs.findByKeywordHttp(
    "offering", // URL 중간 경로
    offeringId, // URL 마지막 파라미터 (검색어)
    userEmail, // Header: X-User-Email
    "get" // Method
  );
};

// [학생용] 내 전체 출결 조회
// URL: /api/attendance/my/{email}
config.funcs.findMyAttendance = async (email) => {
  return config.funcs.findByKeywordHttp(
    "my", // URL 중간 경로
    email, // URL 마지막 파라미터
    null, // 학생 본인 조회가 보통이므로 헤더 불필요 (필요시 email 전달)
    "get"
  );
};

// [학생용] 특정 수강신청 건에 대한 출결 조회
// URL: /api/attendance/enrollment/{enrollmentId}
config.funcs.findByEnrollment = async (enrollmentId) => {
  return config.funcs.findByKeywordHttp(
    "enrollment", // URL 중간 경로
    enrollmentId, // URL 마지막 파라미터
    null,
    "get"
  );
};

export default { config };
