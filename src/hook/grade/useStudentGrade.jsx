import { useState, useEffect, useCallback, useMemo } from "react";
import GradeApi from "../../api/GradeApi";
import StudentScoreApi from "../../api/StudentScoreApi";

// 평점 계산용 상수
const GRADE_POINTS = {
  "A+": 4.5,
  A: 4.0,
  "B+": 3.5,
  B: 3.0,
  "C+": 2.5,
  C: 2.0,
  "D+": 1.5,
  D: 1.0,
  F: 0.0,
};

const ITEM_TYPE_MAP = {
  MIDTERM: "중간고사",
  FINAL: "기말고사",
  ASSIGNMENT: "과제",
  ATTENDANCE: "출결",
  ETC: "기타",
};

export const useStudentGrade = (userEmail) => {
  const [grades, setGrades] = useState([]);
  const [scores, setScores] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const [loadingGrades, setLoadingGrades] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);

  // ... (fetchGrades, fetchScores, selectSubject 함수들은 기존과 동일) ...
  const fetchGrades = useCallback(async () => {
    if (!userEmail) {
      console.warn(
        "⚠️ [Hook] 이메일 정보가 없어 성적 조회를 수행하지 않습니다."
      );
      return;
    }
    setLoadingGrades(true);
    try {
      const data = await GradeApi.config.funcs.findMyGrades(userEmail);
      setGrades(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ 성적 조회 실패:", error);
      setGrades([]);
    } finally {
      setLoadingGrades(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  const fetchScores = useCallback(async (enrollmentId) => {
    setLoadingScores(true);
    try {
      const data = await StudentScoreApi.config.funcs.findByEnrollment(
        enrollmentId
      );
      setScores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ 상세 점수 조회 실패:", error);
      setScores([]);
    } finally {
      setLoadingScores(false);
    }
  }, []);

  const selectSubject = (gradeItem) => {
    if (selectedGrade?.gradeId === gradeItem.gradeId) {
      setSelectedGrade(null);
      setScores([]);
      return;
    }
    setSelectedGrade(gradeItem);
    fetchScores(gradeItem.enrollmentId);
  };

  const gpaInfo = useMemo(() => {
    let totalCredit = 0;
    let totalPoint = 0;
    grades.forEach((g) => {
      const point = GRADE_POINTS[g.letterGrade] || 0;
      const credit = g.credit || 0;
      totalCredit += credit;
      totalPoint += point * credit;
    });
    const gpa =
      totalCredit > 0 ? (totalPoint / totalCredit).toFixed(2) : "0.00";
    return { totalCredit, gpa, subjectCount: grades.length };
  }, [grades]);

  return {
    grades,
    scores,
    selectedGrade,
    gpaInfo,
    loadingGrades,
    loadingScores,
    selectSubject,
    fetchGrades,

    // 🔥 [추가] 컴포넌트가 쓸 수 있게 맵을 리턴해줍니다!
    ITEM_TYPE_MAP,
  };
};
