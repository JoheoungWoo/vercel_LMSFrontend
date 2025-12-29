import { useEffect, useState } from "react";

export default function ExampleJsonComponent() {
  const [records, setRecords] = useState([]);   // mentoring_records
  const [student, setStudent] = useState(null); // student_info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadJson() {
      try {
        const res = await fetch("/json/mentoringinfo.json", { cache: "no-store" }); //fetch로 json을 가져온다.
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        setStudent(json.student_info);
        setRecords(json.mentoring_records);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    loadJson();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>로드 실패: {error.message}</div>;

  return (
    <div>
      {student && (
        <section style={{ marginBottom: 20 }}>
          <h3>학생 정보</h3>
          <ul>
            {Object.entries(student).map(([key, value], idx) => ( //student에 object key를 준 다음 map을 돌린다.
              <li key={idx}>
                <strong>{key}</strong>: {String(value)}
              </li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h3>멘토링 기록</h3>
        {records.map((record, idx) => (
          <div key={idx} style={{ marginBottom: "12px", paddingLeft: "12px" }}>
            <h4>기록 {idx + 1}</h4>
            <ul>
              {Object.entries(record).map(([key, value], i) => (
                <li key={i}>
                  <strong>{key}</strong>: {typeof value === "object" ? JSON.stringify(value) : String(value)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
