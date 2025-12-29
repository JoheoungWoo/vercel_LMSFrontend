import { useState, useCallback, useEffect } from "react";
import TimeTableApi from "../../api/TimeTableApi";
import CourseOfferingApi from "../../api/CourseOfferingApi";
import ClassSectionApi from "../../api/ClassSectionApi";
import ClassroomApi from "../../api/ClassroomApi";

export const useTimeTableManagement = (userEmail) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [offeringList, setOfferingList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [classroomList, setClassroomList] = useState([]);

  const fetchMetaData = useCallback(async () => {
    try {
      // 1. 강의 목록
      const offerings = await CourseOfferingApi.config.funcs.readAll();
      setOfferingList(Array.isArray(offerings) ? offerings : []);

      // 2. 분반 목록 (API가 있다면)
      const sections = await ClassSectionApi.config.funcs.readAll();
      setSectionList(Array.isArray(sections) ? sections : []);

      // 3. 강의실 목록 (API가 있다면)
      const classrooms = await ClassroomApi.config.funcs.readAll();
      setClassroomList(Array.isArray(classrooms) ? classrooms : []);
    } catch (error) {
      console.error("기초 데이터 조회 실패:", error);
    }
  }, []);

  useEffect(() => {
    fetchMetaData();
  }, [fetchMetaData]);

  //통합
  const fetchTimeTables = useCallback(
    async (mode = "all", keyword = "") => {
      setLoading(true);
      try {
        let result = [];
        if (mode === "all") {
          result = await TimeTableApi.config.funcs.readAll(userEmail);
        } else if (mode === "offering") {
          result = await TimeTableApi.config.funcs.findListByOffering(keyword);
        } else if (mode === "my") {
          result = await TimeTableApi.config.funcs.findByKeyword(
            "my",
            keyword || userEmail
          );
        }
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("시간표 조회 실패:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [userEmail]
  );

  // T-4: 시간표 생성
  const createTimeTable = async (dto) => {
    try {
      await TimeTableApi.config.funcs.writeOne(dto, userEmail);
      alert("성공적으로 등록되었습니다.");
      return true;
    } catch (error) {
      const msg =
        error.response?.data?.message || "등록 중 오류가 발생했습니다.";
      alert(msg);
      return false;
    }
  };

  // T-5: 시간표 수정
  const updateTimeTable = async (dto) => {
    try {
      await TimeTableApi.config.funcs.updateOne(dto, userEmail);
      alert("성공적으로 수정되었습니다.");
      return true;
    } catch (error) {
      const msg =
        error.response?.data?.message || "수정 중 오류가 발생했습니다.";
      alert(msg);
      return false;
    }
  };

  // T-6: 시간표 삭제
  const deleteTimeTable = async (id) => {
    if (!window.confirm("정말 이 시간표를 삭제하시겠습니까?")) return false;
    try {
      await TimeTableApi.config.funcs.deleteOne(id, userEmail);
      alert("삭제되었습니다.");
      // 화면에서 즉시 제거
      setData((prev) => prev.filter((item) => item.timetableId !== id));
      return true;
    } catch (error) {
      alert("삭제 실패: " + (error.response?.data?.message || "오류 발생"));
      return false;
    }
  };

  return {
    data,
    loading,
    offeringList,
    sectionList,
    classroomList,
    fetchTimeTables,
    createTimeTable,
    updateTimeTable,
    deleteTimeTable,
  };
};
