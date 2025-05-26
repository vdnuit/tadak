import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/Button"; // 공통 버튼 컴포넌트 사용

function formatDate(dateString) {
  const date = new Date(dateString);
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yy}.${mm}.${dd} ${hh}:${min}`;
}

const mockLetter = {
  id: 1,
  sender: "MockUser",
  senderId: 2,
  title: "테스트 편지 제목",
  content:
    "이것은 테스트용 목업 편지 본문입니다.이것은 테스트용 목업 편지 본문입니다.이것은 테스트용 목업 편지 본문입니다.이것은 테스트용 목업 편지 본문입니다.이것은 테스트용 목업 편지 본문입니다.",
  createdAt: new Date().toISOString(),
};

const mockReply = {
  id: 1,
  replier: "MockReplier",
  content: "이것은 테스트용 목업 답장입니다.",
  createdAt: new Date().toISOString(),
};

const Container = styled.div`
  width: 90%;
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.white};
  letter-spacing: -0.06em;
  margin-bottom: 0rem;
`;

const Meta = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-top:-1.5rem;
  color: ${({ theme }) => theme.palette.common.white};
`;

const MessageBox = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  color: ${({ theme }) => theme.palette.common.white};
  padding: 1rem;
  border-radius: 8px;
  align-self: flex-start;
  width: 70%;
  max-width: 480px;
`;

const ReplyBox = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[400]};
  color: ${({ theme }) => theme.palette.common.white};
  padding: 1rem;
  border-radius: 8px;
  width: 70%;
  max-width: 480px;
  align-self: flex-end;
`;

const ReplyInputWrapper = styled.div`
  width: 70%;
  max-width: 480px;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TextArea = styled.textarea`
  background-color: ${({ theme }) => theme.palette.grey[400]};
  color: ${({ theme }) => theme.palette.common.white};
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  border: none;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  letter-spacing: -0.06em;
`;

function Detail() {
  const { id } = useParams();
  const [letter, setLetter] = useState(null);
  const [reply, setReply] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (id === "test") {
      setLetter(mockLetter);
      setReply(mockReply);
      setUserId(99);
      return;
    }

    axios
      .get("/api/user/me", { withCredentials: true })
      .then((res) => setUserId(res.data.id))
      .catch(() => alert("사용자 정보를 불러오지 못했습니다."));
  }, [id]);

  useEffect(() => {
    if (id === "test") return;

    axios
      .get(`/api/letters/${id}`, { withCredentials: true })
      .then((res) => setLetter(res.data))
      .catch(() => alert("편지를 불러오지 못했습니다."));

    axios
      .get(`/api/replies/${id}`, { withCredentials: true })
      .then((res) => setReply(res.data))
      .catch(() => {});
  }, [id]);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) {
      alert("답장을 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/replies",
        {
          letterId: parseInt(id),
          content: replyContent,
        },
        { withCredentials: true }
      );

      setReply(res.data);
      alert("답장이 성공적으로 작성되었습니다.");
      setReplyContent("");
    } catch {
      alert("답장 작성에 실패했습니다.");
    }
  };

  if (!letter) return <Container>편지 불러오는 중...</Container>;

  return (
    <Container>
      <Title>{letter.title}</Title>
      <Meta>
        {letter.sender} / {formatDate(letter.createdAt)}
      </Meta>

      <MessageBox>
        <div style={{ marginBottom: "0.5rem" }}>{letter.content}</div>
        <div style={{ textAlign: "right", fontSize: "0.85rem", opacity: 0.8 }}>
          {letter.sender} / {formatDate(letter.createdAt)}
        </div>
      </MessageBox>

      {reply ? (
        <ReplyBox>
          <div style={{ marginBottom: "0.5rem" }}>{reply.content}</div>
          <div
            style={{ textAlign: "right", fontSize: "0.85rem", opacity: 0.8 }}
          >
            {reply.replier} / {formatDate(reply.createdAt)}
          </div>
        </ReplyBox>
      ) : (
        userId !== null &&
        letter.senderId !== userId && (
          <ReplyInputWrapper>
            <TextArea
              placeholder="답장을 작성해주세요"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={4}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                size="fixedSmall"
                variant="red"
                shape="round"
                onClick={handleReplySubmit}
              >
                작성 완료
              </Button>
            </div>
          </ReplyInputWrapper>
        )
      )}
    </Container>
  );
}

export default Detail;
