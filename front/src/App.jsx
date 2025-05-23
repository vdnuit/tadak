import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Write from "./pages/Write";
import MyPage from "./pages/Mypage";
import Detail from "./pages/Detail";
import Footer from "./layouts/Footer";
import axios from "axios";
import Navbar from "./layouts/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/me", { withCredentials: true })
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <div style={{ flex: "1" }}>
          <Routes>
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/write" element={<Write />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
