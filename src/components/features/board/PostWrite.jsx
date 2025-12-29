import React, { useEffect, useState } from "react";
import { updatePost, createPost } from "../../../api/PostApi";

const PostWrite = ({ post, onPostCreated }) => {
  // ✅ 1. Hook은 무조건 최상단
  const [board, setBoard] = useState("FREE");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEditMode = !!post; // post가 있으면 수정 모드

  // ✅ 2. post가 들어오면 값 세팅 (수정 모드)
  useEffect(() => {
    if (post) {
      setBoard(post.board);
      setTitle(post.title);
      setContent(post.content);
    } else {
      // 작성 모드일 때 초기화
      setBoard("FREE");
      setTitle("");
      setContent("");
      setSubmitted(false);
    }
  }, [post]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        // 수정 모드
        await updatePost(post.postId, {
          board,
          title,
          content,
        });
      } else {
        // 작성 모드
        await createPost({
          board,
          title,
          content,
        });
        
        // 작성 완료 후 목록 새로고침을 위한 콜백 호출
        if (onPostCreated) {
          onPostCreated();
        }
      }

      setSubmitted(true);
      
      // 작성 모드일 때는 폼 초기화
      if (!isEditMode) {
        setTimeout(() => {
          setBoard("FREE");
          setTitle("");
          setContent("");
          setSubmitted(false);
        }, 1500);
      }
    } catch (err) {
      console.error(`게시글 ${isEditMode ? '수정' : '작성'} 실패:`, err);
      console.error("응답:", err.response);
      alert(`게시글 ${isEditMode ? '수정' : '작성'}에 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  }
};

export default PostWrite;