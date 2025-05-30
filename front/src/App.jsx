import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Write from "./pages/Write";
import MyPage from "./pages/Mypage";
import Detail from "./pages/Detail";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import axios from "axios";
import { initGA, logPageView } from "./Analytics";
import { registerServiceWorker } from "./serviceWorkerRegistration";

// 페이지뷰 추적용 컴포넌트
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initGA(); // 앱 시작 시 GA 초기화 (한 번만)
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/write" element={<Write />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/user/me`, { withCredentials: true })
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));

    registerServiceWorker(); // 푸시 등록 시도
  }, []);

  return (
    <Router>
      <AnalyticsTracker />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div style={{ flex: "1" }}>
          <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
