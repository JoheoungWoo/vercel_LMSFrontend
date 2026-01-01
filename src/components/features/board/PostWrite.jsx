import React, { useEffect, useState } from "react";
import PostApi from "../../../api/PostApi";

const PostWrite = ({ post, onPostCreated }) => {
  /* ================= 상태 관리 ================= */
  const [boardType, setBoardType] = useState("FREE");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // post 프롭스의 존재 여부에 따라 수정 모드 결정
  const isEditMode = !!post;

  /* ================= 수정 모드 데이터 세팅 ================= */
  useEffect(() => {
    if (post) {
      setBoardType(post.boardType ?? "FREE");
      setTitle(post.title ?? "");
      setContent(post.content ?? "");
    } else {
      // 작성 모드일 때는 폼 초기화
      setBoardType("FREE");
      setTitle("");
      setContent("");
      setSubmitted(false);
    }
  }, [post]);

/* ================= PostWrite.jsx 수정본 ================= */
const handleSubmit = async () => {
  if (!title.trim() || !content.trim()) {
    alert("제목과 내용을 모두 입력해주세요.");
    return;
  }

  try {
    setLoading(true);

    // 1. 서버의 PostDTO 구조에 맞게 데이터 재구성
    const payload = {
      title: title,
      content: content,
      // viewCount 등 기본값이 필요한 숫자 필드 초기화
      viewCount: 0,
      
      // 2. UserDTO user 필드 대응 (객체 형태여야 함)
      // 서버에서 이메일로 사용자를 찾는다면 아래와 같이 구성
      user: {
        email: "test@aaa.com" // 실제 DB에 존재하는 이메일이어야 합니다.
      },

      // 3. 만약 boardType 정보를 전달해야 한다면 
      // 현재 DTO에는 board 필드가 CommentResponseDTO로 되어 있으니 확인 필요
      // 일단 단순 필드로 추가하거나 필요 없다면 생략
      boardType: boardType 
    };

    console.log("최종 전송 데이터:", payload);

    if (isEditMode) {
      // 수정 시에는 postId를 반드시 포함
      const updateDto = {
        ...payload,
        postId: post.postId
      };
      await PostApi.updatePost(updateDto);
    } else {
      // 생성
      await PostApi.createPost(payload);
    }

    setSubmitted(true);
    onPostCreated?.();
    
    if (!isEditMode) {
      setTitle("");
      setContent("");
    }
  } catch (err) {
    // 에러 메시지 상세 출력
    const errorMsg = err.response?.data || err.message;
    console.error("서버 응답 에러:", errorMsg);
    alert(`저장 실패: ${typeof errorMsg === 'string' ? errorMsg : '데이터 형식을 확인하세요.'}`);
  } finally {
    setLoading(false);
  }
};

  /* ================= JSX 레이아웃 ================= */
  return (
    <div className="flex flex-col space-y-3">
      <select
        value={boardType}
        onChange={(e) => setBoardType(e.target.value)}
        className="w-32 rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option value="FREE">자유게시판</option>
      </select>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        rows={8}
        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`rounded px-6 py-2 text-white transition-colors ${
            loading ? "bg-gray-400" : "bg-sky-600 hover:bg-sky-700"
          }`}
        >
          {loading ? "처리 중..." : isEditMode ? "수정 완료" : "등록하기"}
        </button>

        {submitted && (
          <span className="text-sm font-medium text-green-600 animate-pulse">
            성공적으로 저장되었습니다!
          </span>
        )}
      </div>
    </div>
  );
};

export default PostWrite;