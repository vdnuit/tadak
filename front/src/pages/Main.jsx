import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_main.png";

function Main({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleFirstButton = () => {
    if (isLoggedIn) {
      navigate("/mypage"); // 나의 편지함
    } else {
      navigate("/login");
    }
  };

  const handleSecondButton = () => {
    if (isLoggedIn) {
      navigate("/write"); // 편지 띄우기
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="main-container">
      <div className="background-image"></div>

      <div className="main-content">
        <h1>9:03 타닥, 이야기를 담은 편지의 소리</h1>
        <img src={logo} alt="타닥 로고" className="logo" />
        <p>키보드로 시작하는 경량 펜팔 서비스</p>

        <div className="button-group">
          <button onClick={handleFirstButton}>
            {isLoggedIn ? "나의 편지함" : "로그인 하기"}
          </button>
          <button onClick={handleSecondButton}>
            {isLoggedIn ? "편지 띄우기" : "편지 띄우기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
