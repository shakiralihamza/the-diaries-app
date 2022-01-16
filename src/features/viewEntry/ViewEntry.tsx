import React from 'react';
import {Grid, Typography} from "@mui/material";

function ViewEntry() {
    return (
        <Grid container direction={'column'} spacing={2} sx={{height:'calc(100vh - 37px)', width:'100%', padding: '40px'}}>
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
