import React, { useEffect, useState } from "react";
import GreetingHeader from "../components/GreetingHeader";
import MessageBox from "../components/MessageBox";
import axios from "axios";

function Mypage() {
  const [userId, setUserId] = useState(null); // DB 상의 숫자 ID
  const [username, setUsername] = useState(""); // 화면에 표시할 문자열 ID
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/me", { withCredentials: true })
      .then((res) => {
        const user = res.data;
        setUserId(user.id);
        setUsername(user.username);

        // 이후 받은 편지와 보낸 편지 불러오기
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
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <GreetingHeader userId={username} />
      </div>

      <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
        <MessageBox type="received" title="받은 메시지" messages={received} />
        <MessageBox type="sent" title="보낸 메시지" messages={sent} />
      </div>
    </div>
  );
}

export default Mypage;
