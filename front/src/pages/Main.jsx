// Main.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_white.png";
import bkgPc from "../assets/main_bkg_pc.png";
import bkgMobile from "../assets/main_bkg_mobile.png";
import Button from "../components/Button";

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${bkgPc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    background-image: url(${bkgMobile});
  }
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  letter-spacing: -0.06em;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    font-size: 16px;
  }
`;

const Logo = styled.img`
  width: 409px;
  height: 124px;
  margin: 24px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 229px;
    height: 69px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.text.primary};
  letter-spacing: -0.06em;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    font-size: 16px;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: column;
    gap: 12px;
  }
`;

function Main({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleFirstButton = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  const handleSecondButton = () => {
    if (isLoggedIn) {
      navigate("/write");
    } else {
      navigate("/login");
    }
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <Title>타닥, 이야기를 담은 편지의 소리</Title>
        <Logo src={logo} alt="타닥 로고" />
        <Subtitle>키보드로 시작하는 경량 펜팔 서비스</Subtitle>
        <ButtonGroup>
          <Button
            size="fixedLarge"
            variant="grey"
            shape="square"
            onClick={handleFirstButton}
          >
            {isLoggedIn ? "나의 편지함" : "로그인 하기"}
          </Button>
          <Button
            size="fixedLarge"
            variant="whiteBold"
            shape="square"
            onClick={handleSecondButton}
          >
            편지 띄우기
          </Button>
        </ButtonGroup>
      </ContentWrapper>
    </MainContainer>
  );
}

export default Main;
