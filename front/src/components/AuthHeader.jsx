import React from "react";
import logo from "../assets/logo_main.png";

function AuthHeader() {
  return (
    <div className="auth-header" style={{ backgroundColor: "black", color: "white", padding: "2rem", textAlign: "center" }}>
    <img src={logo} alt="타닥 로고" className="logo" />
      <p>키보드로 시작하는 경량 펜팔 서비스</p>
    </div>
  );
}

export default AuthHeader;
