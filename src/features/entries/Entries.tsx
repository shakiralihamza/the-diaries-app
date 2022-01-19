import React from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import List from '@mui/material/List';
import EntriesListItem from "./EntriesListItem";
import Scrollbars from "react-custom-scrollbars";

function Entries() {
    return (
        <>

            <Grid
                container
                sx={{
                    padding: '0 0 10px',
                    height: 'calc(100vh - 37px)',
                    width: '100%'
                }}
                justifyContent={'space-between'}
                alignItems={'stretch'}
                direction={'column'}
            >
                <Grid item xs>
                    <Scrollbars>
                        <Box sx={{
                            width: '100%',
                            backgroundImage: 'linear-gradient(to right, #2d2a2d, #2c292c)',
                            color: '#2c292c',
                            borderBottom: '1px solid',
                            borderColor: '#464348'
                        }}>
                            <Typography ml={1} sx={{color: '#a4a1a4', padding: '3px 0'}} fontSize={14}>
                                <Stack direction={'row'}>
                                    <PushPinIcon sx={{fontSize: '10px', marginTop: '2px'}}/>
                                    <Box sx={{fontWeight: '400', fontSize: 10, marginLeft: '2px'}}>Pinned</Box>
                                </Stack>
                            </Typography>
                        </Box>
                        <Grid container>
                            <List sx={{width: '100%', marginTop: '-10px'}}>
                                {
                                    [1, 2, 3, 6, 6, 6, 6, 6, 4, 5, 6].map((item, index, array) => (
                                        <Box component={'span'} key={item} sx={{'&:hover': {cursor: 'default'}}}>
                                            <EntriesListItem item={item} heading={''} description={''} index={index} arrayLength={array.length}/>
                                        </Box>
                                    ))
                                }
                            </List>
                        </Grid>
                    </Scrollbars>
                </Grid>
            </Grid>
        </>
    );
}

export default Entries;
