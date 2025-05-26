// 리팩토링된 Mypage.jsx (스타일 적용 포함)
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GreetingHeader from "../components/GreetingHeader";
import MessageBox from "../components/MessageBox";
import axios from "axios";

function Mypage() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
    const useMockData = true;

    if (useMockData) {
      setUserId(123);
      setUsername("mock_user");

      setReceived([
        {
          id: 1,
          title: "첫 번째 받은 편지",
          content: "안녕하세요! 이건 테스트용 편지입니다.",
          senderName: "Alice",
          createdAt: "2025-05-20T12:00:00",
        },
        {
          id: 2,
          title: "두 번째 받은 편지",
          content: "이 편지도 스타일 테스트용입니다.",
          senderName: "Bob",
          createdAt: "2025-05-21T09:30:00",
        },
      ]);

      setSent([
        {
          id: 101,
          title: "첫 번째 보낸 편지",
          content: "보낸 편지도 테스트 중입니다.",
          receiverName: "Charlie",
          createdAt: "2025-05-22T14:45:00",
        },
        {
          id: 102,
          title: "두 번째 보낸 편지",
          content: "MUI & SC 스타일 작업 확인용.",
          receiverName: "Dana",
          createdAt: "2025-05-23T16:00:00",
        },
      ]);

      return;
    }

    axios
      .get("http://localhost:8080/api/user/me", { withCredentials: true })
      .then((res) => {
        const user = res.data;
        setUserId(user.id);
        setUsername(user.username);
        fetchLetters(user.id);
      })
      .catch(() => {
        console.error("로그인 사용자 정보를 불러오지 못했습니다.");
      });
  }, []);

  const fetchLetters = async (id) => {
    try {
      const [recvRes, sentRes] = await Promise.all([
        axios.get("http://localhost:8080/api/letters/received", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8080/api/letters/sent", {
          withCredentials: true,
        }),
      ]);
      setReceived(recvRes.data);
      setSent(sentRes.data);
    } catch (err) {
      console.error("편지를 불러오는 중 오류 발생:", err);
    }
  };

  return (
    <>
      <HeaderBox>
        <GreetingHeader userId={username} />
      </HeaderBox>

      <PageWrapper>
        <ContentBox>
          <MessageBox type="received" title="받은 메시지" messages={received} />
          <MessageBox type="sent" title="보낸 메시지" messages={sent} />
        </ContentBox>
      </PageWrapper>
    </>
  );
}

export default Mypage;

const PageWrapper = styled.div`
  width: 92%;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 4rem;
`;

const HeaderBox = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: column;
    align-items: center;
  }
`;
