import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, TextField } from "@mui/material";
import styled from "styled-components";
import bgImage from "../assets/typewriter_bkg.png";
import Button from "../components/Button";

const PageWrapper = styled.div`
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroBox = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ContentBox = styled.div`
  width: 90%;
  max-width: 780px;
  color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TitleText = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.white};
  font-size: 24px;
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  white-space: normal;
  word-break: keep-all;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    font-size: 28px;
  }
`;

const ListItemTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-top: 0.1rem;
  margin-bottom: -0.2rem;
  color: ${({ theme }) => theme.palette.common.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    font-size: 17px;
  }
`;

const ListItemDescription = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.3;
  color: ${({ theme }) => theme.palette.common.white};
  margin-top: 0rem;
  margin-left: 1.5rem;
  white-space: normal;
  word-break: keep-all;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    font-size: 17px;
  }
`;

const InputField = styled(TextField)`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.common.white};

  & .MuiOutlinedInput-root {
    border-radius: 4px;

    & input,
    & textarea {
      font-family: ${({ theme }) => theme.typography.fontFamily};
      letter-spacing: -0.06em;
      color: ${({ theme }) => theme.palette.common.black}; /* 텍스트 색상 */

      &::placeholder {
        color: ${({ theme }) => theme.palette.grey[300]}; /* placeholder 색상 */
        opacity: 1; /* 크롬에서 기본 투명도 제거 */
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert("편지가 성공적으로 작성되었습니다.");
        navigate("/mypage");
      } else {
        alert("편지 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("편지 작성 실패:", error);
      alert("편지 작성에 실패했습니다.");
    }
  };

  return (
    <PageWrapper>
      <IntroBox>
        <ContentBox>
          <TitleText>
            한 통의 편지를 띄우면, 다른 한 통을 받게 됩니다.
          </TitleText>

          <ListItemTitle>1. 편지를 작성해보세요</ListItemTitle>
          <ListItemDescription>
            당신의 생각을 담아 편지를 작성하면, 언젠가 단 한 사람에게
            전달됩니다.
          </ListItemDescription>

          <ListItemTitle>2. 다른 사람의 편지를 받아보세요</ListItemTitle>
          <ListItemDescription>
            익명의 타인이 쓴 편지를 받을 수 있는 기회, 예상치 못한 소통이
            기다리고 있습니다.
          </ListItemDescription>

          <ListItemTitle>3. 답장을 기다려보세요</ListItemTitle>
          <ListItemDescription>
            받은 편지에 대한 답장이 올 수도 있습니다. 새로운 이야기를 나누는
            순간을 기대해 보세요.
          </ListItemDescription>
        </ContentBox>
      </IntroBox>

      <ContentBox>
        <InputField
          variant="outlined"
          placeholder="제목을 적어주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <InputField
          variant="outlined"
          placeholder="전하고 싶은 말을 입력해주세요"
          multiline
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ButtonWrapper>
          <Button
            onClick={handleSubmit}
            size="fixedLarge"
            variant="red"
            shape="square"
          >
            작성 완료
          </Button>
        </ButtonWrapper>
      </ContentBox>
    </PageWrapper>
  );
}

export default Write;
