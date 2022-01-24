import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useAppDispatch} from "../../app/hooks";
import {closeEntryMenu, setAdded, setAdding} from "./addEntrySlice";
import {useState} from "react";
import http from "../../services/api";
import {Diary} from "../../interfaces/diary.interface";
import {Entry} from "../../interfaces/entry.interface";
import {useParams} from "react-router-dom";

export default function AddEntry() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useAppDispatch();
    const {diaryId} = useParams();
    // const entries = useAppSelector(state => state.entries);
    const handleClose = () => {
        dispatch(closeEntryMenu());
    };
    const handleAddEntry = async () => {
        // setLoading(true)
        dispatch(setAdding());
        http
            .post<Entry, { diary: Diary; entry: Entry }>(
                `/diaries/entry/${diaryId}`,
                {
                    title,
                    description
                }
            )
            .then((data) => {
                if (data != null) {
                    // const {diary, entry: _entry} = data;
                    dispatch(closeEntryMenu());
                    dispatch(setAdded());
                }
            });
    }
    return (
        <div>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle>Add Entry</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        margin="dense"
                        label="Title"
                        type="email"
                        fullWidth
                        required
                        variant="filled"
                    />
                    <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        margin="dense"
                        label="Description"
                        multiline
                        required
                        fullWidth
                        variant="filled"
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddEntry}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
