import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";

function Login({ setIsLoggedIn }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: id,
          password: password,
        }),
      });
  
      if (response.ok) {
        // 실제 서버 응답에 따라 처리 (ex: 토큰 또는 단순 메시지)
        // localStorage.setItem("access_token", token);  ← 추후 확장 가능
        setIsLoggedIn(true);
        alert("로그인 성공");
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message); // ErrorResponse.message 사용
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("서버 오류가 발생했습니다.");
    }
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
