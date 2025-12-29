import React, { useEffect, useState } from "react";

const ScoreInput = ({ onClose }) => {
  // ===== mock data =====
  const MOCK_OFFERINGS = [
    { offeringId: "1", courseName: "자료구조", year: 2025, semester: 1 },
    { offeringId: "2", courseName: "운영체제", year: 2025, semester: 1 },
  ];

  const MOCK_GRADE_ITEMS = {
    1: [
      { itemId: "101", itemName: "중간고사", maxScore: 100 },
      { itemId: "102", itemName: "기말고사", maxScore: 100 },
    ],
    2: [
      { itemId: "201", itemName: "과제", maxScore: 40 },
      { itemId: "202", itemName: "기말고사", maxScore: 100 },
    ],
  };

  const MOCK_STUDENTS = [
    { enrollmentId: "e1", studentId: "20230001", studentName: "김학생" },
    { enrollmentId: "e2", studentId: "20230002", studentName: "이학생" },
    { enrollmentId: "e3", studentId: "20230003", studentName: "박학생" },
  ];

  // ===== state =====
  const [offerings, setOfferings] = useState([]);
  const [gradeItems, setGradeItems] = useState([]);
  const [rows, setRows] = useState([]);

  const [selected, setSelected] = useState({
    offeringId: "",
    itemId: "",
  });

  // ===== effects =====
  // 강의 목록 로딩 (mock)
  useEffect(() => {
    setOfferings(MOCK_OFFERINGS);
  }, []);

  // 강의 선택 → 평가 항목
  useEffect(() => {
    if (!selected.offeringId) return;

    setGradeItems(MOCK_GRADE_ITEMS[selected.offeringId] || []);
    setRows([]);
    setSelected((p) => ({ ...p, itemId: "" }));
  }, [selected.offeringId]);

  // 평가 항목 선택 → 학생 목록
  useEffect(() => {
    if (!selected.itemId) return;

    // mock 학생 + 점수
    const merged = MOCK_STUDENTS.map((s) => ({
      ...s,
      score: "",
      modified: false,
    }));

    setRows(merged);
  }, [selected.itemId]);

  // ===== handlers =====
  const changeScore = (enrollmentId, value) => {
    setRows((prev) =>
      prev.map((r) =>
        r.enrollmentId === enrollmentId
          ? { ...r, score: value, modified: true }
          : r
      )
    );
  };

  const saveScore = (row) => {
    if (row.score === "" || Number(row.score) < 0) {
      alert("유효한 점수를 입력하세요.");
      return;
    }

    alert(`${row.studentName} (${row.studentId}) : ${row.score}점 저장 (mock)`);

    setRows((prev) =>
      prev.map((r) =>
        r.enrollmentId === row.enrollmentId ? { ...r, modified: false } : r
      )
    );
  };

  // ===== render =====
  return (
    <div className="relative w-full bg-white p-6 rounded-2xl">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400"
        >
          ✕
        </button>
      )}

      <h2 className="mb-4 text-xl font-bold">세부 성적 입력 (Mock)</h2>

      <div className="mb-6 flex gap-3">
        <select
          value={selected.offeringId}
          onChange={(e) =>
            setSelected((p) => ({
              ...p,
              offeringId: e.target.value,
            }))
          }
          className="border rounded px-3 py-2"
        >
          <option value="">강의 선택</option>
          {offerings.map((o) => (
            <option key={o.offeringId} value={o.offeringId}>
              {o.courseName} ({o.year}-{o.semester})
            </option>
          ))}
        </select>

        <select
          value={selected.itemId}
          disabled={!selected.offeringId}
          onChange={(e) =>
            setSelected((p) => ({ ...p, itemId: e.target.value }))
          }
          className="border rounded px-3 py-2"
        >
          <option value="">평가 항목 선택</option>
          {gradeItems.map((g) => (
            <option key={g.itemId} value={g.itemId}>
              {g.itemName} (배점 {g.maxScore})
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
            <th className="p-2">상태</th>
            <th className="p-2">동작</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-8 text-slate-400">
                평가 항목을 선택하세요
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.enrollmentId}>
                <td className="p-2">{r.studentId}</td>
                <td className="p-2">{r.studentName}</td>
                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={r.score}
                    onChange={(e) =>
                      changeScore(r.enrollmentId, e.target.value)
                    }
                    className="w-20 border px-2 text-center"
                  />
                </td>
                <td className="p-2 text-center text-xs">
                  {r.modified ? "수정됨" : "대기"}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => saveScore(r)}
                    className="text-indigo-600 font-bold"
                  >
                    저장
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreInput;
