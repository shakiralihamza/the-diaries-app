import React from 'react';
// import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useAppSelector} from "./app/hooks";
import Home from "./features/home/Home";
import Auth from "./features/auth/Auth";

function App() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    return (
        <>
            {isAuthenticated ? <Home/> : <Auth/>}
        </>
    );
}

export default App;
