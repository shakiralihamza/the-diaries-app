import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
    Grid,
    IconButton,
    InputBase,
    Paper,
    styled,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {addDiary} from "./diariesSlice";
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import http from "../../services/api";
import {Diary} from "../../interfaces/diary.interface";
import {closeMenu} from "./addDiarySlice";
import {setCurrentDiary} from "./currentDiarySlice";
import {useNavigate} from "react-router-dom";

const AddDiaryInput = styled(InputBase)(() => ({
    '& .MuiInputBase-input': {
        width: '100%',
        padding: '0 9px 0px 5px',
        fontSize: 14,
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

type DiaryType = 'private' | 'public';

const AddDiary = () => {
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<DiaryType>('private');
    const handleDiaryType = (event: any, val: DiaryType) => {
        if (val !== null) {
            setType(val)
        }
    }
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.user?.id)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleAddDiary = async () => {
        setLoading(true)
        const {diary} = await http.post<Partial<Diary>, { diary: Diary }>('/diaries/', {
            title,
            type,
            userId,
            entries: 0,
            hasPinnedEntries: false
        });
        if (diary) {
            dispatch(addDiary([diary] as Diary[]));
            setLoading(false);
            dispatch(closeMenu());
            dispatch(setCurrentDiary(diary.id))
            navigate(`/diary/${diary.id}`)
        }
    }
    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleAddDiary();
        }
    }
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
                    backgroundColor: loading ? '#000000' : '#2b2b2b',
                    opacity: loading ? 0.2 : 1
                }}
            >
                <AddDiaryInput
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={handleDiaryType}
                    size={"small"}
                    sx={{margin: '6px 5px',}}
                >
                    <ToggleButton value="private" color={"primary"} sx={{padding: '0 5px'}} disableRipple>
                        <LockIcon sx={{fontSize: 16}}/>
                    </ToggleButton>
                    <ToggleButton value="public" color={'primary'} sx={{padding: '0 5px'}} disableRipple>
                        <PublicIcon sx={{fontSize: 16}}/>
                    </ToggleButton>
                </ToggleButtonGroup>
                <IconButton size={'small'} onClick={handleAddDiary}>
                    <DoneOutlinedIcon sx={{fontSize: 16}}/>
                </IconButton>
            </Paper>
        </Grid>
    );
}

export default AddDiary;
