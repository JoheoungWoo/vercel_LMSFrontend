import axios from "axios";

const API_BASE = "/api/support/notices"; // ⚠️ 백엔드 경로에 맞게 조정

const SupportNoticeApi = {
  /** 교수 지원 공지 목록 조회 */
  getProfessorNotices: () =>
    axios.get(`${API_BASE}/professor`),
};

export default SupportNoticeApi;
