import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthHeader from "../components/AuthHeader";
import Button from "../components/Button";
import AuthTextField from "../components/AuthTextField"; // ✅ 변경된 부분

const LoginContainer = styled.div`
  margin: 0 auto;
  padding: 2rem;
  width: 280px;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    width: 404px;
    margin-bottom: 100px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 454px;
    margin-bottom: 100px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

function Login({ setIsLoggedIn }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 에러 초기화
    setIdError("");
    setPasswordError("");

    let hasError = false;
    if (!id.trim()) {
      setIdError("아이디를 입력해주세요.");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    }

    if (hasError) return;

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
        const contentType = response.headers.get("content-type");
        let message = "아이디 또는 비밀번호가 잘못되었습니다.";

        if (contentType?.includes("application/json")) {
          const data = await response.json();
          message = data.message || message;
        } else {
          const text = await response.text();
          message = text || message;
        }

        // 두 필드 모두에 에러 메시지 출력
        setIdError(message);
        setPasswordError(message);
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
      <InputGroup>
        <AuthTextField
          label="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          error={idError}
        />
        <AuthTextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
      </InputGroup>
      <Button
        onClick={handleLogin}
        size="responsive"
        variant="greenBold"
        shape="square"
        style={{ width: "100%", marginBottom: "0.5rem" }}
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
    </LoginContainer>
  );
}

export default Login;
