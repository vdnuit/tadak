import React from "react";
import GreetingHeader from "../components/GreetingHeader";
import MessageBox from "../components/MessageBox";

function Mypage() {
  const userId = "tadakUser"; // 추후 로그인 정보에서 불러오기

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      {/* 상단 인사말 영역 */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <GreetingHeader userId={userId} />
      </div>

      {/* 메시지 박스 2개 */}
      <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
        <MessageBox
          type="received"
          title="받은 메시지"
          messages={[
            { id: 1, title: "고마워요", sender: "unknown123" },
            { id: 2, title: "잘 지내시나요?", sender: "forest_writer" },
          ]}
        />

        <MessageBox
          type="sent"
          title="보낸 메시지"
          messages={[
            { id: 3, title: "응원의 편지", sender: userId },
            { id: 4, title: "오늘도 파이팅", sender: userId },
            { id: 4, title: "오늘도 파이팅", sender: userId },
            { id: 4, title: "오늘도 파이팅", sender: userId },
            { id: 4, title: "오늘도 파이팅", sender: userId },
            { id: 4, title: "오늘도 파이팅", sender: userId },
            { id: 4, title: "오늘도 파이팅", sender: userId },
            { id: 4, title: "오늘도 파이팅", sender: userId },
            { id: 4, title: "오늘도 파이팅", sender: userId },
          ]}
        />
      </div>
    </div>
  );
}

export default Mypage;
