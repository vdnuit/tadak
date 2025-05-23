import React from "react";
import logo from "../assets/logo_grayscale.png"; // 경로는 실제 이미지 위치에 맞게 조정하세요

function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#e0e0e0",
        padding: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* 왼쪽: 로고 */}
      <div style={{ flex: "0 0 auto" }}>
        <img
          src={logo}
          alt="타닥 로고"
          style={{ height: "60px", objectFit: "contain" }}
        />
      </div>

      {/* 오른쪽: 설명 텍스트 */}
      <div style={{ flex: "1 1 auto", marginLeft: "2rem", color: "#333" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Tadak: 키보드로 시작하는 경량 펜팔 서비스
        </div>
        <div style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
          타닥은 내가 쓴 편지를 보내면 또 다른 누군가의 편지를 받을 수 있는 서비스입니다.<br />
          유리병에 담아 던지는 편지처럼, 익명의 소통을 즐길 수 있는 간단하고 직관적인 펜팔 서비스입니다.
        </div>
      </div>
    </div>
  );
}

export default Footer;
