import React, {useEffect} from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Scrollbars} from 'react-custom-scrollbars';
import DiariesListItem from "./DiariesListItem";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {openMenu} from "./addDiarySlice";
import AddDiary from "./AddDiary";
import http from '../../services/api';
import {Diary} from "../../interfaces/diary.interface";
import dayjs from "dayjs";
import {addDiary} from "./diariesSlice";


const Diaries = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.addDiary.menuOpen);
    const user = useAppSelector((state) => state.user);
    const diaries = useAppSelector((state) => state.diaries);
    const currentDiary = useAppSelector(state => state.currentDiary.currentDiary);

    useEffect(() => {
        const fetchDiaries = () => {
            if (user) {
                http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
                    if (data && data.length > 0) {
                        const sortedByUpdatedAt = data.sort((a, b) => {
                            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
                        });
                        dispatch(addDiary(sortedByUpdatedAt));
                    }
                });
            }
        };

        fetchDiaries();
    }, [dispatch, user]);

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
                        { diaries.length === 0 ? 'No diaries added yet': 'Diaries'}
                    </Typography>
                </Grid>
                <Grid item xs mt={1} mb={2}>
                    <Scrollbars>
                        <Grid container>
                            {
                                diaries.map((item: Diary) => (
                                    <>
                                        <DiariesListItem
                                            id={item.id}
                                            title={item.title}
                                            entries={item.entries}
                                            selected={currentDiary === item.id}
                                        />
                                    </>
                                ))
                            }
                            {open && <AddDiary/>}
                        </Grid>
                    </Scrollbars>
                </Grid>

                <Grid item>
                    <Typography sx={{color: '#98a3b0'}} ml={2}>
                        <Stack
                            direction={'row'}
                            sx={{'&: hover': {cursor: 'pointer'}}}
                            onClick={() => dispatch(openMenu())}
                        >
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
