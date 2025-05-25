import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 추가된 import
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme'; // 작성한 MUI+StyledComponents 공용 theme
import GlobalStyle from './styles/GlobalStyle'; // styled-components용 전역 스타일 (선택)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline /> {/* MUI 전역 리셋 */}
        <GlobalStyle /> {/* styled-components 전역 스타일 */}
        <App />
      </StyledThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
