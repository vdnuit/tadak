import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 여기에 로그인 요청 (fetch/axios) 후 토큰 저장 로직
    console.log("로그인 시도:", { id, password });

    // 임시 로직: 로그인 성공 처리
    localStorage.setItem("access_token", "example_token");
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className="login-container"
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
          style={{ width: "100%", padding: "0.75rem", marginBottom: "1.5rem" }}
        />
        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem" }}
        >
          로그인하기
        </button>
        <button
          onClick={handleSignup}
          style={{ width: "100%", padding: "0.75rem" }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;
