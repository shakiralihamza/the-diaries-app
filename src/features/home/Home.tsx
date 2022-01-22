import React from 'react';
import Header from "../header/Header";
import {Grid, Typography} from "@mui/material";
import Diaries from "../diaries/Diaries";
import Entries from "../entries/Entries";
import ViewEntry from "../viewEntry/ViewEntry";
import {Routes, Route} from "react-router-dom";

function Home() {
    return (
        <>
            <Header/>
            <Grid container sx={{borderTop: '2px solid black'}}>
                <Grid item sm={3} md={2} sx={{backgroundImage: 'linear-gradient(to bottom, #3f4e5d, #2a3643)'}}>
                    <Diaries/>
                </Grid>
                <Grid item sm={4} md={3} sx={{backgroundColor: '#252225', borderLeft: '2px solid black'}}>
                    <Routes>
                        <Route
                            path="/"
                        >
                            <Route path={'/diary/:diaryId'} element={<Entries/>}/>
                            <Route index element={(
                                <Typography ml={1} sx={{color: '#98a3b0', pt: '7px'}}  fontSize={11}>
                                    { 'No entries to show'}
                                </Typography>
                            )}/>
                        </Route>

                    </Routes>
                </Grid>
                <Grid item sm={5} md={7} sx={{backgroundColor: '#252525', borderLeft: '2px solid black'}}>
                    <ViewEntry/>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
