import React from "react";
import styled from "styled-components";
import logo from "../assets/logo_grayscale.png";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.palette.grey[300]};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  height: 203px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    flex-direction: column;
    height: 323px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  margin-top: 90px;
  margin-left: -1px;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    margin-top: 80px;
    margin-left: 0px;
  }
`;

const Logo = styled.img`
  width: 390px;
  height: 118px;
  object-fit: contain;
`;

const TextBox = styled.div`
  color: ${({ theme }) => theme.palette.common.white};
  font-size: 20px;
  margin-left: 10px;
  margin-top: 110px;
  max-width: 770px;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    margin-top: 10px;
    margin-left: 20px;
  }
`;

const Title = styled.div`
  font-weight: 400;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: 18px;
  font-weight: 200;
  line-height: 1.3;
`;

function Footer() {
  return (
    <FooterContainer>
      <LogoWrapper>
        <Logo src={logo} alt="타닥 로고" />
      </LogoWrapper>
      <TextBox>
        <Title>Tadak: 키보드로 시작하는 경량 펜팔 서비스</Title>
        <Description>
          타닥은 내가 쓴 편지를 보내면 또 다른 누군가의 편지를 받을 수 있는
          서비스입니다.
          <br />
          유리병에 담아 던지는 편지처럼, 익명의 소통을 즐길 수 있는 간단하고
          직관적인 펜팔 서비스입니다.
        </Description>
      </TextBox>
    </FooterContainer>
  );
}

export default Footer;
