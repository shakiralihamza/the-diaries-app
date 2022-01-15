import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {createTheme, CssBaseline, Theme, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";

const theme: Theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <CssBaseline/>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
