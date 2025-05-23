import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function formatDate(dateString) {
  const date = new Date(dateString);
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yy}.${mm}.${dd} ${hh}:${min}`;
}

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
  const [letter, setLetter] = useState(null);
  const [reply, setReply] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [userId, setUserId] = useState(null); // 로그인 사용자 ID

  // 사용자 정보 및 편지/답장 로딩
  useEffect(() => {
    axios
      .get("/api/user/me", { withCredentials: true })
      .then((res) => {
        setUserId(res.data.id);
      })
      .catch(() => alert("사용자 정보를 불러오지 못했습니다."));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/letters/${id}`, { withCredentials: true })
      .then((res) => setLetter(res.data))
      .catch(() => alert("편지를 불러오지 못했습니다."));

    axios
      .get(`/api/replies/${id}`, { withCredentials: true })
      .then((res) => setReply(res.data))
      .catch(() => {
        // 답장이 없는 경우 무시
      });
  }, [id]);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) {
      alert("답장을 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/replies",
        {
          letterId: parseInt(id),
          content: replyContent,
        },
        { withCredentials: true }
      );

      setReply(res.data);
      alert("답장이 성공적으로 작성되었습니다.");
      setReplyContent("");
    } catch (err) {
      alert("답장 작성에 실패했습니다.");
    }
  };

  if (!letter)
    return <div style={{ padding: "2rem" }}>편지 불러오는 중...</div>;

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* 제목 */}
      <div style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
        {letter.title}
      </div>

      {/* 작성자 / 작성일 */}
      <div style={{ color: "#666", fontSize: "0.95rem" }}>
        {letter.sender} / {formatDate(letter.createdAt)}
      </div>

      {/* 본문 편지 박스 */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
          alignSelf: "flex-start",
          maxWidth: "500px",
        }}
      >
        <div style={{ marginBottom: "0.5rem" }}>{letter.content}</div>
        <div style={{ textAlign: "right", fontSize: "0.85rem", color: "gray" }}>
          {letter.sender} / {formatDate(letter.createdAt)}
        </div>
      </div>

      {/* 답장 or textarea */}
      {reply ? (
        <div style={replyBoxStyle}>
          <div style={{ marginBottom: "0.5rem" }}>{reply.content}</div>
          <div
            style={{ textAlign: "right", fontSize: "0.85rem", color: "gray" }}
          >
            {reply.replier} / {formatDate(reply.createdAt)}
          </div>
        </div>
      ) : (
        // 자신이 보낸 편지가 아닐 때만 답장 가능
        userId !== null &&
        letter.senderId !== userId && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              maxWidth: "500px",
            }}
          >
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
                alignSelf: "flex-end",
              }}
            >
              작성 완료
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Detail;
