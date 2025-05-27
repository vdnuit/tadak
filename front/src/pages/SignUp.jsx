import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthHeader from "../components/AuthHeader";
import AuthTextField from "../components/AuthTextField";
import Button from "../components/Button";

const SignupContainer = styled.div`
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
  margin-bottom: 1.5rem;
`;

function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setIdError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setEmailError("");

    let hasError = false;
    if (!id.trim()) {
      setIdError("아이디를 입력해주세요.");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("비밀번호를 다시 입력해주세요.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }
    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const API_BASE = process.env.REACT_APP_API_BASE;

      const response = await fetch(`${API_BASE}/api/user/signup`, {
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
        credentials: "include",
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        const data = await response.json();
        const message = data.message || "회원가입에 실패했습니다.";
        setIdError(message);
        setPasswordError(message);
        setConfirmPasswordError(message);
        setEmailError(message);
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <SignupContainer>
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
        <AuthTextField
          label="Re-enter Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
        />
        <AuthTextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
      </InputGroup>
      <Button
        onClick={handleSignUp}
        size="responsive"
        variant="greenBold"
        shape="square"
        style={{ width: "100%" }}
      >
        회원가입하기
      </Button>
    </SignupContainer>
  );
}

export default SignUp;
