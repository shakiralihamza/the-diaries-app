import React from 'react';
import {Grid, Typography} from "@mui/material";
import {useAppSelector} from "../../app/hooks";

function ViewEntry() {
    const entry = useAppSelector(state => state.viewEntry)
    return (
        <Grid container direction={'column'} spacing={2} sx={{height:'calc(100vh - 37px)', width:'100%', padding: '40px'}}>
            <Grid item>
                <Typography variant={'h5'} fontWeight={600}>
                    {entry.title}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={'body1'}>
                    {entry.description}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ViewEntry;
