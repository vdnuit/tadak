// components/GreetingHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

const HeaderWrapper = styled.div`
  width: 92%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  span:first-child {
    font-family: "Agbalumo", cursive;
    font-size: 60px;
    color: ${({ theme }) => theme.palette.primary.main};

    @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      font-size: 50px;
    }
  }

  span:last-child {
    font-size: 28px;
    color: ${({ theme }) => theme.palette.common.white};
    margin-left: 0.5rem;
    margin-top: 2.5rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      font-size: 20px;
    }
  }
`;

const DescriptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  p {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.white};

    @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      font-size: 16px;
    }
  }

  button {
    margin-top: 1rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      margin-top: 0;
    }
  }
`;

function GreetingHeader({ userId }) {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <UserRow>
        <span>{userId}</span>
        <span>님, 안녕하세요!</span>
      </UserRow>
      <DescriptionRow>
        <div>
          <p>오늘의 편지는 작성하셨나요?</p>
          <p>새로운 편지를 쓰고 한 통의 편지를 받아보세요!</p>
        </div>
        <Button
          size="fixedSmall"
          variant="red"
          shape="round"
          onClick={() => navigate("/write")}
        >
          편지 쓰러가기
        </Button>
      </DescriptionRow>
    </HeaderWrapper>
  );
}

export default GreetingHeader;
