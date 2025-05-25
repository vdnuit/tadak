import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
    letter-spacing: -0.06em; /* 자간 고정 */
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  p, h1, h2, h3, h4, h5, h6, span, a, li, td, th {
    letter-spacing: -0.06em; /* 필요 시 텍스트 요소에도 반복 적용 */
  }
`;

export default GlobalStyle;
