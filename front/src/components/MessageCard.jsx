import React from "react";
import { useNavigate } from "react-router-dom";

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yy}.${mm}.${dd} ${hh}:${min}`;
}

function MessageCard({ id, title, sender, createdAt }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem",
        marginBottom: "0.5rem",
        backgroundColor: "white",
        borderRadius: "4px",
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}
    >
      <div>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        <div style={{ fontSize: "0.875rem", color: "gray" }}>
          {sender} · {formatDate(createdAt)}
        </div>
      </div>
      <div style={{ fontSize: "1.25rem", color: "#888" }}>{">"}</div>
    </div>
  );
}

export default MessageCard;
