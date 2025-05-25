import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../assets/logo_main.png";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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

  const menuItems = isLoggedIn
    ? [
        { label: "나의 편지함", onClick: () => navigate("/mypage") },
        { label: "로그아웃", onClick: handleLogout },
      ]
    : [
        { label: "로그인", onClick: () => navigate("/login") },
        { label: "회원가입", onClick: () => navigate("/signup") },
      ];

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.grey[500], height: "53px" }}>
      <Container maxWidth="md" disableGutters>
        <Toolbar sx={{ minHeight: "53px", display: "flex", justifyContent: "space-between" }}>
          {/* 로고 */}
          <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <img src={logo} alt="로고" style={{ width: "97px", height: "29px" }} />
          </Box>

          {/* 메뉴 */}
          {isMobile ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { navigate("/"); handleMenuClose(); }}>
                  메인화면
                </MenuItem>
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      item.onClick();
                      handleMenuClose();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Typography
                onClick={() => navigate("/")}
                sx={{
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                메인화면
              </Typography>
              {menuItems.map((item) => (
                <Typography
                  key={item.label}
                  onClick={item.onClick}
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
