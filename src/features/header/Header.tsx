import React, {FC, useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, IconButton, Stack, Tooltip, Zoom} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {openEntryMenu} from "../entries/addEntrySlice";
import {deleteEntry, updateEntry} from "../entries/entriesSlice";
import http from "../../services/api";
import {Entry} from "../../interfaces/entry.interface";
import {updateNoOfEntries} from "../diaries/diariesSlice";
import {setCurrentEntry} from "../entries/currentEntrySlice";
import {setViewEntry} from "../viewEntry/viewEntrySlice";

type TheButtonProps = {
    icon: JSX.Element,
    selected: boolean,
    tooltipText: string,
    loading: boolean
}

const defaultIconStyles = {fontSize: 18}

export const TheHeaderButton: FC<TheButtonProps> = ({icon, selected, tooltipText, loading}) => {
    return (
        <Tooltip TransitionComponent={Zoom} title={tooltipText}>
            <IconButton
                disableRipple
                sx={{
                    borderRadius: '4px',
                    padding: '1px 0px',
                    width: '38px',
                    height: '22px',
                    ...(!selected && {backgroundColor: '#636365', color: 'rgba(235,234,237,0.87)'}),
                    ...(selected && {backgroundColor: '#bcbcbc', color: '#505050'}),
                    '&: hover': {
                        ...(!selected && {backgroundColor: '#636365'}),
                        ...(selected && {backgroundColor: '#bcbcbc'}),
                    }
                }}
            >
                {!loading ? icon : <CircularProgress disableShrink sx={{
                    ...(!selected && {color: 'white'}),
                    ...(selected && {color: 'black'}),
                }} size={10}/>}
            </IconButton>
        </Tooltip>
    )
}

function Header() {
    const dispatch = useAppDispatch();
    const [isPinned, setIsPinned] = useState(false);
    const currentDiaryId = useAppSelector(state => state.currentDiary.currentDiary)
    const currentEntryId = useAppSelector(state => state.currentEntry.currentEntry)
    const entries = useAppSelector(state => state.entries)
    const [pinning, setPinning] = useState(false);
    const [deleting, setDeleting] = useState(false);
    useEffect(() => {
        if (currentEntryId) {
            const currentEntry = entries.filter((entry) => entry.id === currentEntryId)[0];
            setIsPinned(currentEntry.isPinned)
        }
    }, [currentEntryId, entries])
    const handlePinEntry = () => {
        setPinning(true);
        http
            .put<Entry, Entry>(`diaries/updateEntryPin/${currentEntryId}`, entries[Number(currentEntryId!)])
            .then((_entry) => {
                if (_entry != null) {
                    dispatch(updateEntry(_entry))
                    setPinning(false)
                }
            });
    }

    const handleDeleteEntry = () => {
        setDeleting(true);
        http.delete(`diaries/entry/${currentEntryId}`)
            .then(() => {
                dispatch(updateNoOfEntries({diaryID: currentDiaryId, type: 'DEC'}))
                dispatch(setCurrentEntry(undefined))
                dispatch(deleteEntry(currentEntryId!))
                dispatch(setViewEntry({}))
                setDeleting(false)
            })
            .catch((err) => alert(err))
    }

    return (
        <Grid
            container
            sx={{
                height: '35px',
                width: '100%',
                backgroundImage: 'linear-gradient(to bottom, #404042, #383637)',
            }}
            alignContent={'center'}
        >
            <Grid item sm={3} md={2}/>
            <Grid item sm={4} md={3}>
                <Stack direction={'row'} spacing={1}
                       sx={{
                           padding: '0 5px',
                           mt: '-1px',
                           ...(!currentDiaryId && {visibility: 'hidden'})
                       }}
                >
                    <Box component={'span'} onClick={() => dispatch(openEntryMenu())}>
                        <TheHeaderButton icon={<PostAddIcon sx={defaultIconStyles}/>}
                                         selected={false}
                                         loading={false}
                                         tooltipText={'New Entry'}
                        />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs>
                {
                    currentEntryId && (
                        <Stack direction={'row'} spacing={1}
                               sx={{
                                   padding: '0 5px',
                                   mt: '-1px',
                               }}
                        >
                            {/*<Box component={'span'} onClick={() => dispatch(pinEntry(currentEntryId))}>*/}
                            <Box component={'span'} onClick={handlePinEntry}>
                                <TheHeaderButton icon={<PushPinOutlinedIcon sx={{...defaultIconStyles}}/>}
                                                 selected={isPinned}
                                                 loading={pinning}
                                                 tooltipText={isPinned?'Unpin':'Pin'}/>
                            </Box>
                            <Box component={'span'}>
                                <TheHeaderButton icon={<EditOutlinedIcon sx={defaultIconStyles}/>} selected={false}
                                                 loading={false}
                                                 tooltipText={'Edit'}/>
                            </Box>
                            <Box component={'span'} onClick={handleDeleteEntry}>
                                <TheHeaderButton icon={<DeleteOutlineOutlinedIcon sx={defaultIconStyles}/>} selected={false}
                                                 loading={deleting}
                                                 tooltipText={'Delete'}/>
                            </Box>
                        </Stack>
                    )
                }
            </Grid>
            <Grid item>
                <Stack direction={'row'} spacing={1} sx={{padding: '0 5px'}}>
                    <TheHeaderButton icon={<LogoutIcon sx={defaultIconStyles}/>} selected={false}
                                     loading={false}
                                     tooltipText={'Sign Out'}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Header;
