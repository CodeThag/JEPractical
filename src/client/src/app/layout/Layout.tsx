import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';
import React, { useState } from 'react'
import { Outlet, RouterProvider } from 'react-router-dom';
import { MainNavigator } from '../navigation/MainNavigator';
import Header from './Header';

const Layout = () => {
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
                <Outlet />
            </Container>
        </ThemeProvider>
    )
}

export default Layout;