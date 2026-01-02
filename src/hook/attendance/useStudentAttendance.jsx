import { useState, useCallback } from "react";
import AttendanceApi from "../../api/AttendanceApi";

// 이름도 useStudentAttendance 로 바꾸시면 더 명확합니다!
export const useStudentAttendance = (userEmail) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 학생용 조회 기능 (내 출석 / 수강 건별 출석)
  const fetchAttendance = useCallback(
    async (mode = "my", keyword = "") => {
      setLoading(true);
      try {
        let result = [];

        if (mode === "my") {
          // A-3: 학생 본인 출석 조회
          const targetEmail = keyword || userEmail;
          if (targetEmail) {
            result = await AttendanceApi.config.funcs.findMyAttendance(
              targetEmail
            );
          }
        } else if (mode === "enrollment") {
          // A-2: 특정 수강 건 조회
          if (keyword) {
            result = await AttendanceApi.config.funcs.findByEnrollment(keyword);
          }
        }
        // 🔥 [삭제됨] 교수용 offering 모드는 이제 useAttendanceManage 훅이 담당합니다.

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

  return {
    data,
    loading,
    fetchAttendance,
  };
};
