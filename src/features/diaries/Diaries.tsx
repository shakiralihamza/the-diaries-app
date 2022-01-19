import React from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Scrollbars} from 'react-custom-scrollbars';
import DiariesListItem from "./DiariesListItem";

const Diaries = () => {
    return (
        <>
            <Grid
                container
                sx={{
                    padding: '7px 0',
                    height: 'calc(100vh - 37px)',
                    width: '100%'
                }}
                justifyContent={'space-between'}
                alignItems={'stretch'}
                direction={'column'}
            >
                <Grid item>
                    <Typography ml={1} sx={{color: '#98a3b0'}} fontSize={11}>
                        Diaries
                    </Typography>
                </Grid>
                <Grid item xs mt={1} mb={2}>
                    <Scrollbars>
                        <Grid container>
                            {
                                [1, 2, 3, 4, 5, 4].map((item) => (
                                    <>
                                        <DiariesListItem item={item} selected={item === 2}/>
                                    </>
                                ))
                            }
                        </Grid>
                    </Scrollbars>
                </Grid>

                <Grid item>
                    <Typography sx={{color: '#98a3b0'}} ml={2}>
                        <Stack direction={'row'} sx={{'&: hover': {cursor: 'pointer'}}}>
                            <AddCircleIcon sx={{fontSize: 18}}/>&nbsp;
                            <Box sx={{fontWeight: '400', fontSize: '13px'}}>New Diary</Box>
                        </Stack>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default Diaries;
