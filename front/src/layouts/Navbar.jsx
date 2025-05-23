import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_main.png"; // 실제 위치에 맞게 경로 조정

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:8080/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch(() => {
        alert("로그아웃에 실패했습니다.");
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #ddd",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* 왼쪽: 로고 */}
      <div
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="로고" style={{ height: "40px" }} />
      </div>

      {/* 오른쪽: 메뉴 */}
      <div style={{ display: "flex", gap: "1.5rem", fontWeight: "bold" }}>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          메인화면
        </span>

        {isLoggedIn ? (
          <>
            <span style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
              로그아웃
            </span>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/mypage")}>
              나의 편지함
            </span>
          </>
        ) : (
          <>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
              로그인
            </span>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>
              회원가입
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
