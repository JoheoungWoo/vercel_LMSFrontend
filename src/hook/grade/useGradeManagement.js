// import { useState, useCallback } from "react";
// import GradeItemApi from "../../api/GradeItemApi";
// import StudentScoreApi from "../../api/StudentScoreApi";
// import GradeApi from "../../api/GradeApi";

// export const useGradeManagement = (offeringId, userEmail) => {
//   const [loading, setLoading] = useState(false);

//   // 데이터 State
//   const [items, setItems] = useState([]); // 평가 항목 목록
//   const [students, setStudents] = useState([]); // 학생 목록 (매트릭스용)
//   const [scores, setScores] = useState({}); // 점수 맵 { "enrollmentId_itemId": scoreObj }

//   // 1. 평가 항목 조회
//   const fetchGradeItems = useCallback(async () => {
//     if (!offeringId) return;
//     setLoading(true);
//     try {
//       const data = await GradeItemApi.config.funcs.findByOffering(offeringId);
//       setItems(data || []);
//       return data;
//     } catch (error) {
//       console.error("평가 항목 로드 실패:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [offeringId]);

//   // 2. 평가 항목 생성
//   const createGradeItem = async (dto) => {
//     try {
//       await GradeItemApi.config.funcs.createItem(
//         { ...dto, offeringId },
//         userEmail
//       );
//       alert("평가 항목이 추가되었습니다.");
//       fetchGradeItems(); // 목록 갱신
//       return true;
//     } catch (error) {
//       alert("추가 실패: " + (error.response?.data?.message || "오류 발생"));
//       return false;
//     }
//   };

//   // 3. 성적기입부 데이터 조회 (학생 x 평가항목 매트릭스 구성)
//   const fetchGradeBookData = useCallback(async () => {
//     if (!offeringId) return;
//     setLoading(true);
//     try {
//       // A. 평가 항목 먼저 확보
//       const currentItems = await fetchGradeItems();
//       if (!currentItems || currentItems.length === 0) {
//         setStudents([]);
//         return;
//       }

//       // B. 각 항목별 점수 데이터를 가져와서 학생 목록과 점수 맵 구성
//       const scoreMap = {};
//       const studentMap = new Map(); // enrollmentId -> studentName 중복 제거용

//       for (const item of currentItems) {
//         const itemScores = await StudentScoreApi.config.funcs.findByItem(
//           item.itemId,
//           userEmail
//         );

//         if (Array.isArray(itemScores)) {
//           itemScores.forEach((s) => {
//             // 점수 매핑
//             scoreMap[`${s.enrollmentId}_${item.itemId}`] = s;
//             // 학생 정보 수집 (이름이 있는 경우만)
//             if (s.studentName) {
//               studentMap.set(s.enrollmentId, s.studentName);
//             }
//           });
//         }
//       }

//       // Map -> Array 변환 (학생 리스트 생성)
//       const uniqueStudents = Array.from(studentMap.entries()).map(
//         ([id, name]) => ({
//           enrollmentId: id,
//           studentName: name,
//         })
//       );

//       // 이름순 정렬
//       uniqueStudents.sort((a, b) => a.studentName.localeCompare(b.studentName));

//       setStudents(uniqueStudents);
//       setScores(scoreMap);
//     } catch (error) {
//       console.error("성적부 데이터 로드 실패:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [offeringId, userEmail, fetchGradeItems]);

//   // 4. 점수 저장 (Update or Create)
//   const saveScore = async (enrollmentId, itemId, value) => {
//     const scoreVal = parseFloat(value);
//     if (isNaN(scoreVal)) return; // 숫자가 아니면 무시

//     const key = `${enrollmentId}_${itemId}`;
//     const existing = scores[key];

//     try {
//       let newScoreData;
//       if (existing && existing.scoreId) {
//         // 수정
//         newScoreData = await StudentScoreApi.config.funcs.updateScore(
//           { scoreId: existing.scoreId, scoreObtained: scoreVal },
//           userEmail
//         );
//       } else {
//         // 생성
//         newScoreData = await StudentScoreApi.config.funcs.createStudentScore(
//           { enrollmentId, itemId, scoreObtained: scoreVal },
//           userEmail
//         );
//       }

//       // 로컬 State 업데이트 (UI 즉시 반영)
//       setScores((prev) => ({ ...prev, [key]: newScoreData }));
//       return true;
//     } catch (error) {
//       alert("점수 저장 실패: " + (error.response?.data?.message || "오류"));
//       return false;
//     }
//   };

//   // 5. 전체 성적 산출
//   const calculateAllGrades = async () => {
//     if (
//       !window.confirm(
//         "모든 학생의 최종 성적을 산출하시겠습니까?\n(입력된 점수를 바탕으로 등급이 부여됩니다.)"
//       )
//     )
//       return;
//     try {
//       await GradeApi.config.funcs.calculateAll(offeringId, userEmail);
//       alert("산출 완료되었습니다.");
//     } catch (error) {
//       alert("산출 실패: " + (error.response?.data?.message || "오류"));
//     }
//   };

//   return {
//     loading,
//     items,
//     students,
//     scores,
//     fetchGradeItems,
//     createGradeItem,
//     fetchGradeBookData,
//     saveScore,
//     calculateAllGrades,
//   };
// };
