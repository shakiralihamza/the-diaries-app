import React from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Diaries = () => {
    return (
        <>
            <Typography ml={1} mt={1} sx={{color: '#98a3b0'}} fontSize={11}>
                Diaries
            </Typography>
            <Grid
                container
                sx={{
                    padding: '7px 0',
                    height: 'calc(100vh - 30px)',
                    width: '100%'
                }}
                justifyContent={'space-between'}
                alignItems={'stretch'}
                direction={'column'}
            >
                <Grid item>
                    <Grid container>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                <>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                padding: '2px 24px',
                                                ...(item === 2 && {backgroundImage: 'linear-gradient(to right, #63798e, #667687)'}),
                                                ...(item === 5 && {backgroundImage: 'linear-gradient(to right, #3a80fd, #397cfc)'}),
                                                // backgroundColor: '#397cfc'
                                            }}
                                        >
                                            <Typography fontSize={14} fontWeight={500}>
                                                <Grid container justifyContent={'space-between'}>
                                                    <Grid item sx={{color:'#f7fafc'}}>
                                                        Diary {item}
                                                    </Grid>
                                                    <Grid item sx={{
                                                        ...(item !== 5 && {color: '#607388'}),
                                                        ...(item === 5 && {color: '#fff'}),
                                                        ...(item === 2 && {color: '#899db3'}),
                                                    }}>
                                                        26
                                                    </Grid>
                                                </Grid>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </>
                            ))
                        }
                    </Grid>

                </Grid>

                <Grid item>
                    <Typography sx={{color: '#98a3b0'}} ml={2}>
                        <Stack direction={'row'}>
                            <AddCircleIcon/>&nbsp;
                            <Box sx={{fontWeight: '400'}}>New Diary</Box>
                        </Stack>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default Diaries;
