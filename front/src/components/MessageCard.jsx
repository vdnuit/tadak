import React from "react";
import { useNavigate } from "react-router-dom";

function MessageCard({ title, sender }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/detail")}
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
        <div style={{ fontSize: "0.875rem", color: "gray" }}>{sender}</div>
      </div>
      <div style={{ fontSize: "1.25rem", color: "#888" }}>{">"}</div>
    </div>
  );
}

export default MessageCard;
