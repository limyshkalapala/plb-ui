import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0099cc',
        },
        secondary: {
            main: '#003366',
        },
        background: {
            default: '#001f33',
        },
        text: {
            primary: '#cccccc',  // Darker shade for primary text
            secondary: '#aabbcc',  // Darker shade for secondary text
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
