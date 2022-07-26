import React, {useEffect} from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import List from '@mui/material/List';
import EntriesListItem from "./EntriesListItem";
import Scrollbars from "react-custom-scrollbars";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import AddEntry from "./AddEntry";
import http from "../../services/api";
import dayjs from "dayjs";
import {Entry} from "../../interfaces/entry.interface";
import {setEntries} from "./entriesSlice";

const Entries = () => {
    const {diaryId} = useParams();
    const dispatch = useAppDispatch();
    const entries = useAppSelector(state => state.entries)
    const open = useAppSelector(state => state.addEntry.menuOpen)
    const edit = useAppSelector(state => state.editEntry.menuOpen)

    const navigate = useNavigate();
    const currentDiary = useAppSelector(state => state.currentDiary.currentDiary)
    const pinned = entries.filter((entry) => entry.isPinned)

    useEffect(() => {
        if (currentDiary === undefined) {
            navigate('/')
        } else {
            http.get<null, { entries: Entry[] }>(`/diaries/entries/${diaryId}`)
                .then(({entries: _entries}) => {
                    if (_entries) {
                        const sortByLastUpdated = _entries.sort((a, b) => {
                            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
                        });
                        dispatch(setEntries(sortByLastUpdated));
                    }
                })
        }
    }, [currentDiary, diaryId, dispatch, navigate, open, edit])
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
                            borderColor: '#464348',
                            ...(pinned.length === 0 && {display: 'none'})
                        }}>

                            < Typography ml={1} sx={{
                                color: '#a4a1a4',
                                padding: '3px 0',
                            }} fontSize={14}>
                                <Stack direction={'row'}>
                                    <PushPinIcon sx={{fontSize: '10px', marginTop: '2px'}}/>
                                    <Box sx={{fontWeight: '400', fontSize: 10, marginLeft: '2px'}}>Pinned</Box>
                                </Stack>
                            </Typography>
                        </Box>
                        <Grid container>
                            <List sx={{width: '100%', marginTop: '-10px'}}>
                                {
                                    (pinned.map((entry, index, array) => {
                                        return (
                                            <Box component={'span'} key={entry.id}
                                                 sx={{'&:hover': {cursor: 'default'}}}>
                                                <EntriesListItem
                                                    key={entry.id}
                                                    id={entry.id}
                                                    updatedAt={entry.updatedAt}
                                                    title={entry.title}
                                                    description={entry.description}
                                                    index={index}
                                                    arrayLength={array.length}
                                                    isPinnedBorderVisible={array.length === index + 1}
                                                    diaryID={entry.diaryID}
                                                    isPinned={false}
                                                />
                                            </Box>
                                        )

                                    }))
                                }
                                {
                                    entries.map((entry, index, array) => {
                                        if (!entry.isPinned) {
                                            return (
                                                <Box component={'span'} key={entry.id}
                                                     sx={{'&:hover': {cursor: 'default'}}}>
                                                    <EntriesListItem
                                                        key={entry.id}
                                                        id={entry.id}
                                                        updatedAt={entry.updatedAt}
                                                        title={entry.title}
                                                        description={entry.description}
                                                        index={index}
                                                        arrayLength={array.length}
                                                        diaryID={entry.diaryID}
                                                        isPinned={false}
                                                    />
                                                </Box>
                                            )
                                        } else {
                                            return null
                                        }
                                    })
                                }
                            </List>
                        </Grid>
                    </Scrollbars>
                </Grid>
            </Grid>
            {open && <AddEntry/>}
        </>
    );
};

export default Entries;
