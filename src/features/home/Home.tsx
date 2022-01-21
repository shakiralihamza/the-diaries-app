import React from 'react';
import Header from "../header/Header";
import {Grid} from "@mui/material";
import Diaries from "../diaries/Diaries";
import Entries from "../entries/Entries";
import ViewEntry from "../viewEntry/ViewEntry";

function Home() {
    return (
        <>
            <Header/>
            <Grid container sx={{borderTop: '2px solid black'}}>
                <Grid item sm={3} md={2} sx={{backgroundImage: 'linear-gradient(to bottom, #3f4e5d, #2a3643)'}}>
                    <Diaries/>
                </Grid>
                <Grid item sm={4} md={3} sx={{backgroundColor: '#252225', borderLeft: '2px solid black'}}>
                    <Entries/>
                </Grid>
                <Grid item sm={5} md={7} sx={{backgroundColor: '#252525', borderLeft: '2px solid black'}}>
                    <ViewEntry/>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
