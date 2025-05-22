import React from "react";
import { useNavigate } from "react-router-dom";

function GreetingHeader({ userId }) {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#50CFB1" }}>{userId}</span>
        <span style={{ marginLeft: "0.5rem", fontSize: "1.5rem" }}>님, 안녕하세요!</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ margin: 0 }}>오늘의 편지는 작성하셨나요?</p>
          <p style={{ margin: 0 }}>새로운 편지를 쓰고 한 통의 편지를 받아보세요!</p>
        </div>
        <button
          onClick={() => navigate("/write")}
          style={{
            backgroundColor: "#50CFB1",
            color: "white",
            border: "none",
            padding: "0.75rem 1.25rem",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          편지 쓰러가기
        </button>
      </div>
    </div>
  );
}

export default GreetingHeader;
