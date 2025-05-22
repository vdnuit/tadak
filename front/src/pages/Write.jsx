import React, { useState } from "react";
import axios from "axios";
import bgImage from "../assets/typewriter_background.png";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/letters",
        {
          title,
          content,
        },
        {
          withCredentials: true, // ✅ 세션 쿠키(JSESSIONID)를 함께 보냄
        }
      );

      console.log("편지 작성 성공:", response.data);
      alert("편지가 성공적으로 작성되었습니다.");
      navigate("/mypage"); // 작성 성공 시 리다이렉트
    } catch (error) {
      console.error("편지 작성 실패:", error);
      alert("편지 작성에 실패했습니다.");
    }
  };

  return (
    <div
      className="write-page"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "4rem 1rem",
      }}
    >
      <div
        className="intro-box"
        style={{
          backgroundImage: `url(${bgImage})`,
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "0 auto",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem" }}>
          한 통의 편지를 띄우면, 다른 한 통을 받게 됩니다.
        </h2>
        <ol style={{ paddingLeft: "1.2rem", lineHeight: "1.7" }}>
          <li>
            <strong>편지를 작성해보세요</strong>
            <br />
            당신의 생각을 담아 편지를 작성하면, 언젠가 단 한 사람에게
            전달됩니다.
          </li>
          <li style={{ marginTop: "1rem" }}>
            <strong>다른 사람의 편지를 받아보세요</strong>
            <br />
            익명의 타인이 쓴 편지를 받을 수 있는 기회, 예상치 못한 소통이
            기다리고 있습니다.
          </li>
          <li style={{ marginTop: "1rem" }}>
            <strong>답장을 기다려보세요</strong>
            <br />
            받은 편지에 대한 답장이 올 수도 있습니다. 새로운 이야기를 나누는
            순간을 기대해 보세요.
          </li>
        </ol>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <input
          type="text"
          placeholder="제목을 적어주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "1rem",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
        />
        <textarea
          placeholder="전하고 싶은 말을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1rem",
            marginBottom: "1.5rem",
          }}
        ></textarea>
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          작성 완료
        </button>
      </div>
    </div>
  );
}

export default Write;
