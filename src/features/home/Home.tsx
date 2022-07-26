import React, {useEffect} from 'react';
import Header from "../header/Header";
import {Grid, Typography} from "@mui/material";
import Diaries from "../diaries/Diaries";
import Entries from "../entries/Entries";
import ViewEntry from "../viewEntry/ViewEntry";
import {Routes, Route} from "react-router-dom";
import http from "../../services/api";
import {Diary} from "../../interfaces/diary.interface";
import {addDiary} from "../diaries/diariesSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setEntries} from "../entries/entriesSlice";
import {Entry} from "../../interfaces/entry.interface";
import {setViewEntry} from "../viewEntry/viewEntrySlice";
import {setCurrentEntry} from "../entries/currentEntrySlice";
import {setCurrentDiary} from "../diaries/currentDiarySlice";
import EditEntry from "../entries/EditEntry";


function Home() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user)

    useEffect(() => {
        // if (user) {
            http.get<null, { diaries: Diary[] }>(`diaries/${user?.id}`)
                .then(({diaries: _diaries}) => {
                    if (_diaries) {
                        dispatch(addDiary(_diaries));
                    }
                })
            return ()=> {
                dispatch(addDiary([] as Diary[]));
                dispatch(setEntries([] as Entry[]));
                dispatch(setViewEntry({}));
                dispatch(setCurrentEntry(undefined))
                dispatch(setCurrentDiary(undefined))
            }
        // }

    }, [dispatch, user]);
    const edit = useAppSelector(state => state.editEntry.menuOpen)

    return (
        <>
            <Header/>
            <Grid container sx={{borderTop: '2px solid black'}}>
                <Grid item xs={4} md={2} sx={{backgroundImage: 'linear-gradient(to bottom, #3f4e5d, #2a3643)'}}>
                    <Diaries/>
                </Grid>
                <Grid item xs={4} md={3} sx={{backgroundColor: '#252225', borderLeft: '2px solid black'}}>
                    <Routes>
                        <Route
                            path="/"
                        >
                            <Route path={'/diary/:diaryId'} element={<Entries/>}/>

                            <Route index element={(
                                <Typography ml={1} sx={{color: '#98a3b0', pt: '7px'}} fontSize={11}>
                                    {'No entries to show'}
                                </Typography>
                            )}/>
                        </Route>
                    </Routes>
                </Grid>
                <Grid item xs={4} md={7} sx={{backgroundColor: '#252525', borderLeft: '2px solid black'}}>
                    <ViewEntry/>
                </Grid>
            </Grid>
            {edit && <EditEntry/>}
        </>
    );
}

export default Home;
