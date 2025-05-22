import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// import WriteLetter from "./pages/WriteLetter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 실제 로그인 상태 확인 로직 (예: localStorage, 세션, API 등)
    const token = localStorage.getItem("access_token"); // 예시
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/write" element={<WriteLetter />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
