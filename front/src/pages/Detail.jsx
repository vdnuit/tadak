import React, { useState } from "react";
import { useParams } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yy}.${mm}.${dd} ${hh}:${min}`;
}

// ✅ 공통 스타일 (답장 상자 + textarea)
const replyBoxStyle = {
  backgroundColor: "#f1f1f1",
  padding: "1rem",
  borderRadius: "8px",
  maxWidth: "500px",
  marginTop: "1rem",
  alignSelf: "flex-end",
};

function Detail() {
  const { id } = useParams();

  // 더미 데이터
  const letter = {
    id,
    title: "응원의 편지",
    sender: "forest_writer",
    createdAt: "2025-05-21T15:30:00",
    content: "당신의 하루가 행복하길 바랍니다.",
    reply: {
      content: "감사합니다. 저도 좋은 하루 되세요!",
      sender: "tadakUser",
      createdAt: "2025-05-21T18:00:00"
    }
  };

  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = () => {
    console.log("답장 전송:", replyContent);
    alert("답장이 전송되었습니다. (더미)");
  };

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* 제목 */}
      <div style={{ fontSize: "1.75rem", fontWeight: "bold" }}>{letter.title}</div>

      {/* 작성자 / 작성일 */}
      <div style={{ color: "#666", fontSize: "0.95rem" }}>
        {letter.sender} / {formatDate(letter.createdAt)}
      </div>

      {/* 본문 편지 박스 */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        borderRadius: "8px",
        alignSelf: "flex-start",
        maxWidth: "500px"
      }}>
        <div style={{ marginBottom: "0.5rem" }}>{letter.content}</div>
        <div style={{ textAlign: "right", fontSize: "0.85rem", color: "gray" }}>
          {letter.sender} / {formatDate(letter.createdAt)}
        </div>
      </div>

      {/* 답장 or 작성 박스 */}
      {letter.reply ? (
        <div style={replyBoxStyle}>
          <div style={{ marginBottom: "0.5rem" }}>{letter.reply.content}</div>
          <div style={{ textAlign: "right", fontSize: "0.85rem", color: "gray" }}>
            {letter.reply.sender} / {formatDate(letter.reply.createdAt)}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", maxWidth: "500px" }}>
          <textarea
            placeholder="답장을 작성해주세요"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={4}
            style={{ ...replyBoxStyle, resize: "none", width: "100%" }}
          />
          <button
            onClick={handleReplySubmit}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#50CFB1",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              alignSelf: "flex-end"
            }}
          >
            작성 완료
          </button>
        </div>
      )}
    </div>
  );
}

export default Detail;
