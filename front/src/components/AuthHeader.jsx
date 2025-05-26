import React from "react";
import styled from "styled-components";
import logo from "../assets/logo_green.png";

const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 2rem;
  text-align: center;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 229px;
  height: 69px;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 376px;
    height: 114px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-top: 1rem;
  letter-spacing: -0.06em;
  width: 230px;
  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 339px;
    font-size: 24px;
  }
`;

function AuthHeader() {
  return (
    <HeaderWrapper>
      <Logo src={logo} alt="타닥 로고" />
      <Description>키보드로 시작하는 경량 펜팔 서비스</Description>
    </HeaderWrapper>
  );
}

export default AuthHeader;
