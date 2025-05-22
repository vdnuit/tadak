import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";

function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 API 호출 (추후 실제 서버 연동 시 사용)
    console.log("회원가입 요청:", { id, password, email });

    // 임시: 회원가입 후 로그인 페이지로 이동
    navigate("/login");
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
