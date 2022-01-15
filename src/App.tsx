import React from 'react';
import Diaries from "./features/diaries/Diaries";
import {Grid} from "@mui/material";

function App() {
    return (
        <>
            <Grid container>
                <Grid item xs={12} sx={{backgroundColor:'#444e5c'}}>
                    <Diaries/>
                </Grid>
            </Grid>
        </>
    );
}

export default App;
