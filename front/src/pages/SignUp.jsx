import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";

function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: id,
          password1: password,
          password2: confirmPassword,
          email: email,
        }),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        const data = await response.json();
        alert(data.message); // ErrorResponse의 message 필드 사용
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="signup-container"
      style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}
    >
      <AuthHeader />

      <div className="form-group" style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "0.75rem", marginBottom: "1.5rem" }}
        />
        <button
          onClick={handleSignUp}
          style={{ width: "100%", padding: "0.75rem" }}
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
}

export default SignUp;
