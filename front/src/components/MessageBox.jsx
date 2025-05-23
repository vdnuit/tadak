import React from "react";
import MessageCard from "./MessageCard";

function MessageBox({ type, title, messages }) {
  return (
    <div style={{ width: "300px" }}>
      {/* 초록색 헤더 */}
      <div style={{
        backgroundColor: "#50CFB1",
        padding: "0.75rem 1rem",
        borderRadius: "20px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "1rem"
      }}>
        {title}
      </div>

      {/* 회색 스크롤 박스 */}
      <div style={{
        backgroundColor: "#eee",
        borderRadius: "8px",
        padding: "1rem",
        height: "300px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}>
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
            title={msg.title}
            sender={msg.sender}
            createdAt={msg.createdAt} // ✅ 추가됨
          />
        ))}
      </div>
    </div>
  );
}

export default MessageBox;
