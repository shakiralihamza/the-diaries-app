import React from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PushPinIcon from '@mui/icons-material/PushPin';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';


function Entries() {
    return (
        <>

            <Box sx={{
                width: '100%',
                backgroundImage: 'linear-gradient(to right, #2d2a2d, #2c292c)',
                color: '#2c292c',
                borderBottom: '1px solid',
                borderColor: '#464348'
            }}>
                <Typography ml={1} sx={{color: '#a4a1a4', padding: '5px 0'}} fontSize={14}>
                    <Stack direction={'row'}>
                        <PushPinIcon sx={{fontSize: '12px', marginTop: '3px'}}/>
                        <Box sx={{fontWeight: '400', fontSize: 12, marginLeft: '2px'}}>Pinned</Box>
                    </Stack>
                </Typography>
            </Box>
            <Grid
                container
                sx={{
                    padding: '10px 0',
                    height: 'calc(100vh - 50px)',
                    width: '100%'
                }}
                justifyContent={'space-between'}
                alignItems={'stretch'}
                direction={'column'}
            >
                <Grid item>
                    <Grid container>
                        <List sx={{width: '100%'}}>
                            {
                                [1, 2, 3, 4, 5, 6].map((item) => (
                                    <>
                                        <ListItem alignItems="flex-start"
                                                  sx={{
                                                      ...(item === 4 && {backgroundImage: 'linear-gradient(to right, #3a373a, #373538)'}),
                                                      ...(item === 5 && {backgroundImage: 'linear-gradient(to right, #ca8e20, #c98f20)'}),
                                                      // color:'#e6bd6f'
                                                  }}>
                                            <ListItemText
                                                sx={{marginLeft: '20px'}}
                                                primary={
                                                    <Typography
                                                        sx={{fontWeight: '500', fontSize: '15px', color: '#e0dde0'}}
                                                    >
                                                        Brunch this weekend?
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box sx={{
                                                        color: '#878588',
                                                        ...(item === 5 && {color: '#e5cb98'})
                                                    }}>
                                                        {"I'll be in your neighborhood doing errands this…"}
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" sx={{marginLeft: '37px'}} component="li"/>
                                        {
                                            item === 2 && <Divider sx={{border: '2px solid', borderColor:'#5e5b5e'}} component="li"/>
                                        }
                                    </>
                                ))
                            }

                        </List>
                    </Grid>

                </Grid>

                <Grid item>
                    <Typography sx={{color: '#98a3b0'}} ml={2}>
                        <Stack direction={'row'}>
                            <AddCircleIcon/>&nbsp;
                            <Box sx={{fontWeight: '400'}}>New Entry</Box>
                        </Stack>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default Entries;
