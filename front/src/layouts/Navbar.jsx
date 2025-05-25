import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "styled-components";
import logo from "../assets/logo_main.png";

const StyledAppBar = styled(AppBar)`
  && {
    background-color: ${({ theme }) => theme.palette.grey[500]};
    height: 53px;
  }
`;

const StyledToolbar = styled(Toolbar)`
  height: 53px;
  min-height: 53px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;

  img {
    width: 97px;
    height: 29px;
  }
`;

const DesktopMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const MenuText = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

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

  const menuItems = [
    { label: "메인화면", onClick: () => navigate("/") },
    ...(isLoggedIn
      ? [
          { label: "나의 편지함", onClick: () => navigate("/mypage") },
          { label: "로그아웃", onClick: handleLogout },
        ]
      : [
          { label: "로그인", onClick: () => navigate("/login") },
          { label: "회원가입", onClick: () => navigate("/signup") },
        ]),
  ];

  return (
    <StyledAppBar position="static" elevation={0}>
      <Container maxWidth="md" disableGutters>
        <StyledToolbar>
          <LogoWrapper onClick={() => navigate("/")}>
            <img src={logo} alt="로고" />
          </LogoWrapper>

          {isMobile ? (
            <>
              <IconButton onClick={toggleDrawer(true)} sx={{ color: "white" }}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}      PaperProps={{
        sx: {
          width: 200,
          backgroundColor: theme.palette.grey[400], // ✅ 배경색 grey
        },
      }}>
                <Box
                  sx={{ width: 250, p: 2 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {menuItems.map((item) => (
                      <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <DesktopMenuWrapper>
              {menuItems.map((item) => (
                <MenuText key={item.label} onClick={item.onClick}>
                  {item.label}
                </MenuText>
              ))}
            </DesktopMenuWrapper>
          )}
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Navbar;
