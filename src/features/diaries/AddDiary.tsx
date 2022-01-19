import React from 'react';
import {closeMenu} from './addDiarySlice';
import {useAppDispatch} from '../../app/hooks';
import {Divider, Grid, IconButton, InputBase, Paper, styled, useTheme} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const AddDiaryInput = styled(InputBase)(() => ({
    '& .MuiInputBase-input': {
        width: '100%',
        padding: '0 9px 0px 5px',
        fontSize: 14,
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    },
}));

const AddDiary = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    return (
        <Grid item xs={12}>
            <Paper
                sx={{
                    p: '0 4px',
                    margin: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'auto',
                    border: '1px solid',
                    borderColor: '#a5c4e1',
                    borderRadius: 1,
                    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
                }}
            >
                <AddDiaryInput autoFocus/>
                <IconButton size={'small'} onClick={() => dispatch(closeMenu())}>
                    <CloseOutlinedIcon color={'warning'} sx={{fontSize: 16}}/>
                </IconButton>
                <Divider sx={{height: 18}} orientation="vertical"/>
                <IconButton size={'small'}>
                    <DoneOutlinedIcon color={'primary'} sx={{fontSize: 16}}/>
                </IconButton>
            </Paper>
        </Grid>
    );
}

export default AddDiary;
