import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthHeader from "../components/AuthHeader";
import Button from "../components/Button";

const LoginContainer = styled.div`
  margin: 0 auto;
  padding: 2rem;

  width: 280px;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 404px;
    margin-bottom: 100px; /* 폭이 sm 이상일 때만 하단 마진 */
  }
`;

function Login({ setIsLoggedIn }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const params = new URLSearchParams();
      params.append("username", id);
      params.append("password", password);

      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        alert("로그인 성공");
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message || "로그인 실패");
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
    <LoginContainer>
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
        <Button
          onClick={handleLogin}
          size="responsive"
          variant="greenBold"
          shape="square"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          로그인하기
        </Button>
        <Button
          onClick={handleSignup}
          size="responsive"
          variant="whiteRegular"
          shape="square"
          style={{ width: "100%" }}
        >
          회원가입
        </Button>
      </div>
    </LoginContainer>
  );
}

export default Login;
