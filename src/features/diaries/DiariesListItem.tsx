import React, {FC} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {Diary} from "../../interfaces/diary.interface";

interface DiariesListItemProps extends Diary {
    selected: boolean
}
const DiariesListItem: FC<DiariesListItemProps> = ({title, selected}) => (
    <Grid item xs={12} sx={{'&:hover': {cursor: 'default'}}}>
        <Box
            tabIndex={0}
            sx={{
                width: '100%',
                padding: '2px 20px',
                // ...(selected === 2 && {backgroundImage: 'linear-gradient(to right, #63798e, #667687)'}),
                '&: focus': {backgroundImage: 'linear-gradient(to right, #3a80fd, #397cfc)'},
                '&: focus .quantity': {color:'#fff'},
            }}
        >
            <Typography fontSize={13} fontWeight={500}>
                <Grid container justifyContent={'space-between'}>
                    <Grid item sx={{color: '#f7fafc'}}>
                        {title}
                    </Grid>
                    <Grid item className={'quantity'} sx={{
                        color: '#607388',
                        ...(selected && {color: '#899db3'}),
                    }}>
                        0
                    </Grid>
                </Grid>
            </Typography>
        </Box>
    </Grid>

);

export default DiariesListItem;
