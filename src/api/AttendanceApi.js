import axios from "axios";
import { API_SERVER_HOST, createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "attendance";
const extraButtons = [];

// 1. 테이블 정의 가져오기
// (tablesConfig.js에 'attendance' 키가 정의되어 있어야 합니다)
const tableDefinition = tableDefinitions[tableName];

// 2. [핵심] 출석 관리 전용 커스텀 API 함수들 정의
// Hook(useAttendanceManagement.js)에서 이 함수들을 호출합니다.
const customAttendanceApi = {
  // A-3) [학생용] 내 전체 출결 조회
  // URL: /api/attendance/my/{email}
  findMyAttendance: async (email) => {
    console.log(`[AttendanceAPI] 내 출결 조회 요청: ${email}`);
    return axios
      .get(`${API_SERVER_HOST}/api/${tableName}/my/${email}`)
      .then((r) => r.data);
  },

  // A-2) [학생용] 특정 수강신청(Enrollment) 건에 대한 출결 조회
  // URL: /api/attendance/enrollment/{enrollmentId}
  findByEnrollment: async (enrollmentId) => {
    console.log(`[AttendanceAPI] 수강건별 출결 조회: ${enrollmentId}`);
    return axios
      .get(`${API_SERVER_HOST}/api/${tableName}/enrollment/${enrollmentId}`)
      .then((r) => r.data);
  },

  // 3. [교수용] 특정 강의(Offering)의 전체 출결 현황 조회
  // URL: /api/attendance/offering/{offeringId}
  findByOffering: async (offeringId, userEmail) => {
    console.log(
      `[AttendanceAPI] 강의별 출결 조회: ${offeringId}, 교수: ${userEmail}`
    );
    return axios
      .get(`${API_SERVER_HOST}/api/${tableName}/offering/${offeringId}`, {
        headers: { "X-User-Email": userEmail },
      })
      .then((r) => r.data);
  },
};

// 3. 기본 Config 생성 (createTableConfig 내부에서 기본 CRUD는 자동 생성됨)
const config = createTableConfig(tableDefinition, extraButtons);

// 4. [중요] 생성된 Config의 funcs에 커스텀 API 병합
// 이렇게 해야 config.funcs.findMyAttendance() 처럼 호출할 수 있습니다.
config.funcs = {
  ...config.funcs, // 기존 CRUD (readAll, writeOne 등) 유지
  ...customAttendanceApi, // 커스텀 함수 추가
};

export default { config };
