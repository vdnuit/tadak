// components/MessageBox.jsx
import React from "react";
import styled from "styled-components";
import MessageCard from "./MessageCard";

const BoxWrapper = styled.div`
  width: 100%;
  max-width: 500px;
`;

const BoxHeader = styled.div`
  width: 183px;
  height: 38px;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.common.white};
  margin-bottom: 1rem;
`;

const ScrollBox = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[400]};
  border-radius: 10px;
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function MessageBox({ type, title, messages }) {
  return (
    <BoxWrapper>
      <BoxHeader>{title}</BoxHeader>
      <ScrollBox>
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
            id={msg.id}
            title={msg.title}
            sender={type === "received" ? msg.senderName : msg.receiverName}
            createdAt={msg.createdAt}
          />
        ))}
      </ScrollBox>
    </BoxWrapper>
  );
}

export default MessageBox;
