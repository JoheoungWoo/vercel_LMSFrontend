import React, { useEffect, useState } from "react";
// API 모듈 임포트
import CourseOfferingApi from "../../api/CourseOfferingApi";
import EnrollmentApi from "../../api/EnrollmentApi";
import GradeItemApi from "../../api/GradeApi"; // GradeItemService가 GradeApi 쪽에 있다고 가정 (확인 필요)
import StudentScoreApi from "../../api/StudentScoreApi";

export default function ProfessorScoreInputComponent({ onClose }) {
  // --- State ---
  const [offerings, setOfferings] = useState([]); // 강의 목록
  const [gradeItems, setGradeItems] = useState([]); // 평가 항목 목록 (중간, 기말 등)

  const [selectedOfferingId, setSelectedOfferingId] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");

  const [students, setStudents] = useState([]); // 학생 + 점수 데이터
  const [loading, setLoading] = useState(false);

  // TODO: 로그인한 교수 정보
  const professorEmail = "hannah@aaa.com";

  // 1. 초기 로딩: 강의 목록
  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const data = await CourseOfferingApi.config.funcs.readAll();
        setOfferings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("강의 목록 로딩 실패", error);
      }
    };
    fetchOfferings();
  }, []);

  // 2. 강의 선택 시 -> 평가 항목(Exam, Homework) 불러오기
  useEffect(() => {
    if (selectedOfferingId) {
      fetchGradeItems(selectedOfferingId);
      setStudents([]); // 학생 목록 초기화
      setSelectedItemId(""); // 선택된 항목 초기화
    }
  }, [selectedOfferingId]);

  // 3. 평가 항목 선택 시 -> 학생 목록 & 점수 불러오기
  useEffect(() => {
    if (selectedItemId) {
      fetchStudentsAndScores(selectedOfferingId, selectedItemId);
    }
  }, [selectedItemId]);

  // --- Helper Functions ---

  // 평가 항목 조회 (GradeItem)
  const fetchGradeItems = async (offeringId) => {
    try {
      // 주의: GradeItem을 불러오는 API 경로가 정확해야 합니다.
      // 예: /api/grade-items/offering/{offeringId} 라고 가정
      // 만약 GradeApi 내부에 있다면 해당 메서드 사용
      const data = await GradeItemApi.config.funcs.findByKeyword(
        "offering",
        offeringId
      );
      // Tip: GradeItemApi가 없다면 새로 만들어야 할 수도 있습니다.
      setGradeItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("평가 항목 로딩 실패", error);
      // 더미 데이터 (테스트용)
      setGradeItems([
        { itemId: 101, itemName: "중간고사", maxScore: 100 },
        { itemId: 102, itemName: "기말고사", maxScore: 100 },
        { itemId: 103, itemName: "과제", maxScore: 20 },
      ]);
    }
  };

  // 학생 및 점수 데이터 병합 (핵심 로직)
  const fetchStudentsAndScores = async (offeringId, itemId) => {
    setLoading(true);
    try {
      // (1) 수강생 목록 (Enrollment)
      const enrollments = await EnrollmentApi.config.funcs.findByKeyword(
        "offering",
        offeringId
      );

      // (2) 해당 항목의 점수 목록 (StudentScore - SS-4)
      const scores = await StudentScoreApi.getItemScores(
        itemId,
        professorEmail
      );

      // (3) 병합
      const merged = (Array.isArray(enrollments) ? enrollments : []).map(
        (enrol) => {
          const scoreRecord = scores.find(
            (s) => s.enrollmentId === enrol.enrollmentId
          );

          return {
            enrollmentId: enrol.enrollmentId,
            studentName: enrol.userName || enrol.studentName || "이름 없음",
            studentId: enrol.studentNumber || "학번 없음",

            scoreId: scoreRecord ? scoreRecord.scoreId : null,
            scoreObtained: scoreRecord ? scoreRecord.scoreObtained : "", // 점수 (없으면 빈값)

            isSaved: !!scoreRecord, // 저장 여부
            isModified: false, // 수정 여부
          };
        }
      );

      setStudents(merged);
    } catch (error) {
      console.error("데이터 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  // 점수 변경 핸들러
  const handleScoreChange = (enrollmentId, val) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.enrollmentId === enrollmentId
          ? { ...s, scoreObtained: val, isModified: true }
          : s
      )
    );
  };

  // 저장 핸들러
  const handleSave = async (student) => {
    if (student.scoreObtained === "" || student.scoreObtained < 0) {
      alert("유효한 점수를 입력하세요.");
      return;
    }

    try {
      if (student.scoreId) {
        // [수정] SS-5 Update
        await StudentScoreApi.updateScore(
          student.scoreId,
          { scoreObtained: Number(student.scoreObtained) },
          professorEmail
        );
        alert("점수가 수정되었습니다.");
      } else {
        // [생성] SS-1 Create
        const dto = {
          enrollmentId: student.enrollmentId,
          itemId: selectedItemId, // 선택된 평가 항목 ID
          scoreObtained: Number(student.scoreObtained),
        };
        // commonApi의 writeOne 사용 (POST /create)
        await StudentScoreApi.writeOne(dto, professorEmail);
        alert("점수가 등록되었습니다.");
      }
      // 목록 갱신
      fetchStudentsAndScores(selectedOfferingId, selectedItemId);
    } catch (e) {
      alert("저장 실패: " + e.message);
    }
  };

  return (
    <div className="relative w-full bg-white p-6 rounded-2xl">
      {/* 닫기 버튼 */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          세부 성적 입력 (Student Score)
        </h2>
        <p className="text-sm text-slate-500">
          강의와 평가 항목(시험/과제)을 선택하여 점수를 입력하세요.
        </p>
      </div>

      {/* 컨트롤 패널 */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        {/* 1. 강의 선택 */}
        <select
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
          value={selectedOfferingId}
          onChange={(e) => setSelectedOfferingId(e.target.value)}
        >
          <option value="">1. 강의 선택</option>
          {offerings.map((o) => (
            <option key={o.offeringId} value={o.offeringId}>
              {o.courseName} ({o.year}-{o.semester})
            </option>
          ))}
        </select>

        {/* 2. 평가 항목 선택 */}
        <select
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          disabled={!selectedOfferingId}
        >
          <option value="">2. 평가 항목 선택</option>
          {gradeItems.map((item) => (
            <option key={item.itemId} value={item.itemId}>
              {item.itemName} (배점: {item.maxScore || 100})
            </option>
          ))}
        </select>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 font-semibold">학번</th>
              <th className="px-6 py-3 font-semibold">이름</th>
              <th className="px-6 py-3 font-semibold text-center">점수</th>
              <th className="px-6 py-3 font-semibold text-center">상태</th>
              <th className="px-6 py-3 font-semibold text-center">동작</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-10 text-center">
                  로딩 중...
                </td>
              </tr>
            ) : students.length > 0 ? (
              students.map((s) => (
                <tr key={s.enrollmentId} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-slate-600">{s.studentId}</td>
                  <td className="px-6 py-3 font-medium">{s.studentName}</td>
                  <td className="px-6 py-3 text-center">
                    <input
                      type="number"
                      className="w-20 rounded border border-slate-200 px-2 py-1 text-center font-bold focus:border-indigo-500 outline-none"
                      value={s.scoreObtained}
                      onChange={(e) =>
                        handleScoreChange(s.enrollmentId, e.target.value)
                      }
                    />
                  </td>
                  <td className="px-6 py-3 text-center">
                    {s.isSaved ? (
                      s.isModified ? (
                        <span className="text-amber-600 text-xs font-bold">
                          수정됨
                        </span>
                      ) : (
                        <span className="text-green-600 text-xs font-bold">
                          저장됨
                        </span>
                      )
                    ) : (
                      <span className="text-slate-400 text-xs">미입력</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleSave(s)}
                      className="rounded bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-100"
                    >
                      저장
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-400">
                  평가 항목을 선택해주세요.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
