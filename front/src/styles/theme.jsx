import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#50CFB1", // 메인 초록
      dark: "#16A480",
      light: "#008564",
    },
    secondary: {
      main: "#FC7B95", // 강조 색상 (빨강)
    },
    grey: {
      50: "#F8FAFA", // white
      100: "#EFF0F3", // 밝은 회색
      200: "#A8ABAF", // 약간 밝은 회색
      300: "#737D81", // 중간 회색
      400: "#2A3133", // 어두운 회색
      500: "#454545", // dark grey
      600: "#151717", // 더 어두운 회색
      700: "#0A0909", // black 대체
    },
    background: {
      default: "#151717",
    },
    text: {
      primary: "#F8FAFA",
      secondary: "#737D81",
    },
    error: {
      main: "#FC7B95",
    },
  },
  typography: {
    fontFamily: `'Inter', 'Agbalumo', sans-serif`,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    allVariants: {
      color: "#F8FAFA",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800, // 모바일 vs. 데스크탑 기준
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
