import React from 'react';
import {Grid, Typography} from "@mui/material";

function ViewEntry() {
    return (
        <Grid container direction={'column'} spacing={2} sx={{height:'100vh', width:'100%', padding: '40px'}}>
            <Grid item>
                <Typography variant={'h5'} fontWeight={600}>
                    Weird eh?
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={'body1'}>
                    uieg use uiygiuuuyg uy guyg uyg u
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ViewEntry;
