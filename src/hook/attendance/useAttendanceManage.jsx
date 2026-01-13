import { useState, useCallback, useEffect } from "react";
// 리팩토링된 API 파일 import
import AttendanceApi from "../../api/AttendanceApi";
import EnrollmentApi from "../../api/EnrollmentApi";

export const useAttendanceManage = (offeringId, userEmail) => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────
  //  수강생 목록 상태 관리
  // ─────────────────────────────────────────────────────────────
  const [studentList, setStudentList] = useState([]);

  // 수강생 목록 가져오기 함수
  const fetchStudents = useCallback(async () => {
    // offeringId나 userEmail이 없으면 실행하지 않음 (안전장치)
    if (!offeringId || !userEmail) return;

    try {
      // enrollmentApi 호출
      const response = await EnrollmentApi.config.funcs.getStudentsByOffering(
        offeringId,
        userEmail
      );

      console.log(" 백엔드 응답 원본:", response);

      // [핵심 수정 1] 데이터 꺼내는 로직을 안전하게 변경
      // 1순위: response.data.data (axios raw response인 경우)
      // 2순위: response.data (commonApi에서 data를 한 번 벗긴 경우)
      // 3순위: response (바로 리스트가 온 경우)
      let list = [];

      if (Array.isArray(response)) {
        list = response; // 바로 배열인 경우
      } else if (Array.isArray(response?.data)) {
        list = response.data; // ApiResponse.data 인 경우 (가장 유력)
      } else if (Array.isArray(response?.data?.data)) {
        list = response.data.data; // Axios object 인 경우
      } else {
        console.warn("데이터 형식을 찾을 수 없음:", response);
      }

      setStudentList(list);
    } catch (err) {
      console.error("수강생 목록 로드 실패:", err);
      setStudentList([]);
    }
    // [핵심 수정 2] userEmail을 의존성 배열에 추가!
  }, [offeringId, userEmail]);

  // offeringId나 userEmail이 바뀔 때 수강생 목록 갱신
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ───────────────── 1. 조회 (Read) ─────────────────
  const fetchAttendances = useCallback(async () => {
    if (!offeringId) return;

    setLoading(true);
    try {
      // API 호출: 강의(Offering)별 전체 출결 조회
      const data = await AttendanceApi.config.funcs.findByOffering(
        offeringId,
        userEmail
      );

      if (Array.isArray(data)) {
        // 보기 좋게 정렬: 1순위 주차(Week) 오름차순 -> 2순위 학생명 가나다순
        const sorted = data.sort((a, b) => {
          if (a.week !== b.week) return a.week - b.week;
          // studentName이 없을 경우 대비 (안전장치)
          const nameA = a.studentName || "";
          const nameB = b.studentName || "";
          return nameA.localeCompare(nameB);
        });
        setAttendances(sorted);
      } else {
        setAttendances([]);
      }
    } catch (error) {
      console.error("출결 목록 조회 실패:", error);
      setAttendances([]);
    } finally {
      setLoading(false);
    }
  }, [offeringId, userEmail]);

  // offeringId가 바뀔 때마다 자동으로 목록 갱신
  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  // ───────────────── 2. 생성 (Create) ─────────────────
  const createAttendance = async (newItem) => {
    // 유효성 검사
    if (!newItem.enrollmentId) {
      alert("수강생을 선택해주세요.");
      return false;
    }

    setLoading(true);
    try {
      // 🔥 [핵심 수정] 백엔드 DTO가 원하는 필드명(attendanceDate)으로 확실하게 매핑
      // UI에서는 sessionDate라는 이름으로 관리하고 있으니, 그걸 attendanceDate에 넣어줍니다.
      const targetDate =
        newItem.sessionDate || new Date().toISOString().split("T")[0];

      const dto = {
        enrollmentId: Number(newItem.enrollmentId),
        week: Number(newItem.week),
        status: newItem.status,

        // 👇 여기가 수정된 부분입니다! (둘 다 보내서 에러 원천 봉쇄)
        attendanceDate: targetDate,
        sessionDate: targetDate,
      };

      console.log("🚀 [생성 요청 DTO]", dto); // 로그 확인

      // API 호출 (createAttendance는 writeOne의 별칭)
      await AttendanceApi.config.funcs.createAttendance(dto, userEmail);

      await fetchAttendances(); // 목록 새로고침
      alert("출결 데이터가 등록되었습니다.");
      return true;
    } catch (error) {
      console.error("출결 등록 실패:", error);
      // 백엔드 에러 메시지가 있으면 띄워주고, 없으면 기본 메시지
      const msg = error.response?.data || "출결 등록 중 오류가 발생했습니다.";
      alert(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ───────────────── 3. 수정 (Update) ─────────────────
  const updateAttendance = async (originItem, status) => {
    setLoading(true);
    try {
      // 1. ID 추출 (객체인지 확인하는 안전장치)
      const id =
        typeof originItem === "object" ? originItem.attendanceId : originItem;

      // 2. 주차 추출 (기존 데이터 유지)
      const week = originItem.week || 1;

      // 3. 🔥 [핵심 수정] 기존 날짜 유지 로직
      // 원본 데이터에서 날짜 필드를 찾습니다.
      let originalDateStr = originItem.attendanceDate || originItem.sessionDate;
      let finalDate = "";

      if (originalDateStr) {
        // 기존 날짜가 있다면 "YYYY-MM-DD" 형식으로만 자릅니다.
        // 예: "2024-03-02T00:00:00" -> "2024-03-02"
        finalDate = String(originalDateStr).split("T")[0];
      } else {
        // ※ 극히 드문 경우지만, 원본 데이터에도 날짜가 없으면 어쩔 수 없이 오늘 날짜 사용 (DB 에러 방지용)
        console.warn("⚠️ 원본 데이터에 날짜가 없어 오늘 날짜로 대체합니다.");
        finalDate = new Date().toISOString().split("T")[0];
      }

      // 4. 백엔드로 보낼 데이터 구성
      const dto = {
        attendanceId: id,
        status: status,
        week: week,
        // 🔥 기존 날짜를 그대로 다시 보냅니다.
        attendanceDate: finalDate,
        sessionDate: finalDate,
        enrollmentId: originItem.enrollmentId,
      };

      console.log("🚀 [수정 요청 DTO]", dto); // 로그에서 date가 원래 날짜인지 확인하세요

      await AttendanceApi.config.funcs.updateAttendance(dto, userEmail);

      await fetchAttendances(); // 목록 새로고침 (즉시 반영)
      return true;
    } catch (error) {
      console.error("출결 수정 실패:", error);
      alert("출결 상태 변경에 실패했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    attendances, // 조회된 데이터 목록
    studentList,
    loading, // 로딩 상태
    createAttendance, // 생성 함수
    updateAttendance, // 수정 함수
    refresh: fetchAttendances, // 수동 새로고침 함수
  };
};
