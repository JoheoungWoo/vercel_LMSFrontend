import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER_HOST } from "../../../api/commonApi";
import { useSelector } from "react-redux";

const ScoreInput = ({ offeringId }) => {
  const [gradeItems, setGradeItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [scores, setScores] = useState({});

  const userEmail = useSelector((state) => state.loginSlice?.email);

  // ================= 평가 항목 조회 =================
  useEffect(() => {
    if (!offeringId) return;

    axios
      .get(`${API_SERVER_HOST}/api/grade-item/offering/${offeringId}`)
      .then((res) => setGradeItems(res.data || []))
      .catch(() => setGradeItems([]));
  }, [offeringId]);

  // ================= 수강생 조회 =================
  useEffect(() => {
    if (!offeringId) return;

    axios
      .get(`${API_SERVER_HOST}/api/enrollment/my`, {
        headers: { "X-User-Email": userEmail },
      })
      .then((res) => {
        let data = res.data;
        if (data && typeof data === "object" && !Array.isArray(data)) {
          data = Object.values(data)[0] || [];
        }
        const studentsOnly = (data || []).filter((s) => s.role === "STUDENT");
        setStudents(studentsOnly);
      })
      .catch(() => setStudents([]));
  }, [offeringId, userEmail]);

  // ================= 점수 조회 =================
  useEffect(() => {
    if (!selectedItemId || !selectedStudentId) {
      setScores({});
      setRows([]);
      return;
    }

    const fetchScore = async () => {
      try {
        // 1️⃣ userId + offeringId로 Enrollment 조회
        const enrollmentRes = await axios.get(
          `${API_SERVER_HOST}/api/enrollment/user/${selectedStudentId}/offering/${offeringId}`,
          { headers: { "X-User-Email": userEmail } }
        );

        const enrollments = enrollmentRes.data || [];
        if (!enrollments.length) {
          setScores({});
          setRows([]);
          return;
        }

        const enrollmentId = enrollments[0].enrollmentId;

        // 2️⃣ enrollmentId 기준 점수 조회
        const scoreRes = await axios.get(
          `${API_SERVER_HOST}/api/student-score/enrollments/${enrollmentId}`,
          { headers: { "X-User-Email": userEmail } }
        );

        const targetScore = (scoreRes.data || []).find(
          (s) => String(s.itemId) === String(selectedItemId)
        );
        const scoreValue = targetScore?.scoreObtained ?? "";

        setScores({ [enrollmentId]: scoreValue });

        // 3️⃣ row 생성
        const student = students.find(
          (s) => String(s.userId) === String(selectedStudentId)
        );
        if (student) {
          setRows([
            {
              studentId: student.studentNumber,
              studentName: student.nickname,
              score: scoreValue,
            },
          ]);
        } else {
          setRows([]);
        }
      } catch (err) {
        console.error("점수 조회 실패:", err);
        setScores({});
        setRows([]);
      }
    };

    fetchScore();
  }, [selectedItemId, selectedStudentId, offeringId, students, userEmail]);

  // ================= 점수 입력/수정 추가 =================
  const handleScoreChange = (e) => {
    const value = e.target.value;
    setRows((prev) => prev.map((r) => ({ ...r, score: value })));
  };

  const handleScoreSave = async () => {
    if (!selectedItemId || !selectedStudentId) return;

    try {
      // 1️⃣ userId + offeringId로 Enrollment 조회
      const enrollmentRes = await axios.get(
        `${API_SERVER_HOST}/api/enrollment/user/${selectedStudentId}/offering/${offeringId}`,
        { headers: { "X-User-Email": userEmail } }
      );
      const enrollments = enrollmentRes.data || [];
      if (!enrollments.length) return;
      const enrollmentId = enrollments[0].enrollmentId;

      // 2️⃣ enrollmentId 기준 점수 조회
      const scoreRes = await axios.get(
        `${API_SERVER_HOST}/api/student-score/enrollments/${enrollmentId}`,
        { headers: { "X-User-Email": userEmail } }
      );
      const targetScore = (scoreRes.data || []).find(
        (s) => String(s.itemId) === String(selectedItemId)
      );

      const scoreId = targetScore?.scoreId;
      const scoreValue = rows[0]?.score ?? 0;

      if (scoreId) {
        // 3️⃣ 기존 점수 수정
        await axios.put(
          `${API_SERVER_HOST}/api/student-score/${scoreId}`,
          { scoreId, scoreObtained: parseFloat(scoreValue) },
          { headers: { "X-User-Email": userEmail } }
        );
        alert("점수 수정 완료!");
      } else {
        alert("해당 항목의 점수가 아직 없습니다.");
      }
    } catch (err) {
      console.error("점수 저장 실패:", err);
      alert("점수 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl">
      <h2 className="mb-4 text-xl font-bold">점수 조회</h2>

      <div className="mb-6 flex gap-4">
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        >
          <option value="">평가 항목 선택</option>
          {gradeItems.map((g) => (
            <option key={g.itemId} value={g.itemId}>
              {g.itemName} (배점 {g.maxScore})
            </option>
          ))}
        </select>

        <select
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        >
          <option value="">학생 선택</option>
          {students.map((s) => (
            <option key={s.userId} value={s.userId}>
              {s.nickname} ({s.studentNumber})
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-2">학번</th>
            <th className="p-2">이름</th>
            <th className="p-2">점수</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-8 text-center text-slate-400">
                평가 항목과 학생을 선택하세요
              </td>
            </tr>
          ) : (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td className="p-2">{r.studentId}</td>
                <td className="p-2">{r.studentName}</td>
                <td className="p-2 text-center">
                  <input
                    type="number"
                    min="0"
                    value={r.score}
                    onChange={handleScoreChange}
                    className="w-20 text-center border rounded"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 점수 저장 버튼 추가 */}
      {rows.length > 0 && (
        <button
          onClick={handleScoreSave}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          점수 저장
        </button>
      )}
    </div>
  );
};

export default ScoreInput;
