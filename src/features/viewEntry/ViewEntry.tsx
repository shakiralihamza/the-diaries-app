import React from 'react';
import {Grid, Typography} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import dayjs from "dayjs";

function ViewEntry() {
    const entry = useAppSelector(state => state.viewEntry)
    //format date with full month name
    const date = dayjs(entry.updatedAt).format('DD MMMM YYYY')
    const time = dayjs(entry.updatedAt).format('h:mm A')
    return (
        <Grid container direction={'column'} spacing={2}
              sx={{height: 'calc(100vh - 37px)', width: '100%', padding: '40px', pt: 1}}>
            <Grid item sx={{textAlign: 'center', mb: -1}}>
                <Typography color={'text.secondary'} sx={{fontSize: 11}}>
                    {entry.updatedAt && date + ' at ' + time}
                </Typography>
            </Grid>
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
