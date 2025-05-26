import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yy}.${mm}.${dd} ${hh}:${min}`;
}

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[400] || "#000"};
`;

const Subtitle = styled.div`
  font-size: 0.875rem;
  color: gray;
`;

const Arrow = styled.div`
  font-size: 1.25rem;
  color: #888;
`;

function MessageCard({ id, title, sender, createdAt }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/detail/${id}`)}>
      <div>
        <Title>{title}</Title>
        <Subtitle>
          {sender} · {formatDate(createdAt)}
        </Subtitle>
      </div>
      <Arrow>{">"}</Arrow>
    </Card>
  );
}

export default MessageCard;
