import React, { useEffect, useState } from "react";
// import { attendance } from "../../api/attendanceApi";
import attendance from "../../api/AttendanceApi";
import { Await } from "react-router-dom";

const CommunityCommentListComponent = () => {
  const [comments, setComments] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await attendance();
        setComments(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("댓글 목록 불러오기 실패:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!comments.length) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      {comments.map((c) => (
        <div key={c.id}>
          <strong>{c.author}</strong>: {c.content}
        </div>
      ))}
    </div>
  );
};

export default CommunityCommentListComponent;