import { useState, useCallback } from "react";
import AttendanceApi from "../../api/AttendanceApi";

export const useAttendanceManagement = (userEmail) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 조회 기능 통합 (학생용/교수용)
  const fetchAttendance = useCallback(
    async (mode = "my", keyword = "") => {
      setLoading(true);
      try {
        let result = [];

        if (mode === "my") {
          // A-3: 학생 본인 출석 조회 (keyword가 없으면 로그인한 이메일 사용)
          const targetEmail = keyword || userEmail;
          if (targetEmail) {
            result = await AttendanceApi.config.funcs.findMyAttendance(
              targetEmail
            );
          }
        } else if (mode === "offering") {
          // 3번: 교수님 강의별 출석 조회 (keyword = offeringId)
          if (keyword) {
            result = await AttendanceApi.config.funcs.findByOffering(
              keyword,
              userEmail
            );
          }
        } else if (mode === "enrollment") {
          // A-2: 특정 수강 건 조회
          if (keyword) {
            result = await AttendanceApi.config.funcs.findByEnrollment(keyword);
          }
        }

        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("출석 데이터 조회 실패:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [userEmail]
  );

  // (필요하다면 create, update, delete 함수도 여기에 추가)

  return {
    data,
    loading,
    fetchAttendance,
  };
};
