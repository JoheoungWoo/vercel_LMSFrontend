import { useEffect, useState, useMemo } from "react";
import TimeTableApi from "../../api/TimeTableApi";

export const DAYS = ["월", "화", "수", "목", "금"];
export const PERIODS = [
  "1교시 (09:00~10:00)",
  "2교시 (10:00~11:00)",
  "3교시 (11:00~12:00)",
  "4교시 (13:00~14:00)",
  "5교시 (14:00~15:00)",
  "6교시 (15:00~16:00)",
  "7교시 (16:00~17:00)",
  "8교시 (17:00~18:00)",
  "9교시 (18:00~19:00)",
  "10교시 (19:00~20:00)",
];

const DAY_MAP = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};
const DAY_ORDER = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

// ✅ mode: "my"(내꺼) 또는 "offering"(강의별)
// ✅ id: mode가 "my"면 email, "offering"이면 offeringId
export const useTimetableData = (mode = "my", id) => {
  const [timeTables, setTimeTables] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let data = [];

        // 🔥 모드에 따라 API 골라 쓰기
        if (mode === "my") {
          data = await TimeTableApi.config.funcs.findByKeyword("my", id);
        } else if (mode === "offering") {
          data = await TimeTableApi.config.funcs.findListByOffering(id);
        }

        const sorted = (Array.isArray(data) ? data : []).sort((a, b) => {
          const dayDiff =
            (DAY_ORDER[a.dayOfWeek] || 99) - (DAY_ORDER[b.dayOfWeek] || 99);
          return dayDiff !== 0
            ? dayDiff
            : (a.startTime || "").localeCompare(b.startTime || "");
        });

        setTimeTables(sorted);
      } catch (err) {
        console.error("시간표 조회 실패:", err);
        setTimeTables([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode, id]);

  const lectureGrid = useMemo(() => {
    const grid = {};
    DAYS.forEach((day) => (grid[day] = Array(10).fill(null)));

    timeTables.forEach((t) => {
      const day = DAY_MAP[t.dayOfWeek];
      if (!day || !t.startTime) return;

      const startIdx = parseInt(t.startTime.substring(0, 2)) - 9;
      const endIdx = parseInt(t.endTime.substring(0, 2)) - 9;
      const duration = endIdx - startIdx || 1;

      for (let i = 0; i < duration; i++) {
        if (startIdx + i < 10) {
          grid[day][startIdx + i] = {
            ...t,
            name: t.courseName,
            major: t.sectionName || "일반",
            professor: t.professorName || "미정",
            classroom: t.classroomName || "미정",
            isFirst: i === 0,
          };
        }
      }
    });
    return grid;
  }, [timeTables]);

  const stats = useMemo(
    () => ({
      totalClasses: timeTables.length,
      uniqueCourses: new Set(timeTables.map((t) => t.courseName)).size,
    }),
    [timeTables]
  );

  return { timeTables, lectureGrid, stats, loading };
};
