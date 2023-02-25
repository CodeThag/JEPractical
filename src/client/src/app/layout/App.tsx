import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { MainNavigator } from '../navigation/MainNavigator';
import Header from './Header';


const App = () => {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <ToastContainer position='bottom-right' hideProgressBar theme='colored' /> */}
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <RouterProvider router={MainNavigator} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
