import React, {FC} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {Diary} from "../../interfaces/diary.interface";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {setCurrentDiary} from "./currentDiarySlice";

interface DiariesListItemProps extends Diary {
    selected: boolean
}

const DiariesListItem: FC<DiariesListItemProps> = ({title, selected, entries, id}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <Grid
            item xs={12}
            sx={{'&:hover': {cursor: 'default'}}}
            onClick={() => {
                navigate(`diary/${id}`)
                dispatch(setCurrentDiary(id))
            }}
        >
            <Box
                tabIndex={0}
                sx={{
                    width: '100%',
                    padding: '2px 20px',
                    ...(selected && {backgroundImage: 'linear-gradient(to right, #63798e, #667687)'}),
                    '&: focus': {
                        ...(selected && {backgroundImage: 'linear-gradient(to right, #3a80fd, #397cfc)'}),
                    },
                    '&: focus .quantity': {
                        ...(selected && {color: '#fff'}),
                    },
                }}
            >
                <Typography fontSize={13} fontWeight={500}>
                    <Grid container justifyContent={'space-between'} alignItems={'center'}>
                        <Grid item sx={{color: '#f7fafc'}}>
                            {title}
                        </Grid>
                        <Grid item className={'quantity'} sx={{
                            color: '#607388',
                            ...(selected && {color: '#899db3'}),
                        }}>
                            {entries}
                        </Grid>
                    </Grid>
                </Typography>
            </Box>
        </Grid>

    );
}

export default DiariesListItem;
