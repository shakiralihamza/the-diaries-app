import React from 'react';
import Diaries from "./features/diaries/Diaries";
import {Grid} from "@mui/material";
import Entries from "./features/entries/Entries";
import Header from "./features/header/Header";
import ViewEntry from "./features/viewEntry/ViewEntry";

function App() {
    return (
        <>
            <Header/>
            <Grid container sx={{borderTop:'2px solid black'}}>
                <Grid item sm={3} md={2} sx={{backgroundImage: 'linear-gradient(to bottom, #3f4e5d, #2a3643)'}}>
                    <Diaries/>
                </Grid>
                <Grid item sm={4} md={3} sx={{backgroundColor: '#252225', borderLeft:'2px solid black'}}>
                    <Entries/>
                </Grid>
                <Grid item sm={5} md={7} sx={{backgroundColor: '#252525', borderLeft:'2px solid black'}}>
                    <ViewEntry/>
                </Grid>

            </Grid>
        </>
    );
}

export default App;
