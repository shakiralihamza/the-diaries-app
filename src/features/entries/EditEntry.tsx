import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useState} from "react";
import http from "../../services/api";
import {Entry} from "../../interfaces/entry.interface";
import {closeEditMenu} from "./editEntrySlice";
import {updateEntry} from "./entriesSlice";
import {setViewEntry} from "../viewEntry/viewEntrySlice";
import LoadingButton from "@mui/lab/LoadingButton";

const EditEntry: React.FC = () => {
    const currentEntry = useAppSelector(state => state.currentEntry.currentEntry);
    const currentEntryData = useAppSelector(state => state.currentEntry.currentEntryData);
    const [title, setTitle] = useState(currentEntryData?.title);
    const [description, setDescription] = useState(currentEntryData?.description);
    const entries = useAppSelector(state => state.entries)
    const [saving, setSaving] = useState(false);

    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(closeEditMenu());
    };

    const handleEditEntry = () => {
        setSaving(prevState => !prevState);
        http
            .put<Entry, Entry>(
                `diaries/entry/${currentEntry}`,
                {
                    ...entries[Number(currentEntry!)],
                    title,
                    description,
                }
            )
            .then((_entry) => {
                if (_entry != null) {
                    const {title, description, updatedAt} = _entry;
                    dispatch(updateEntry(_entry))
                    dispatch(setViewEntry({title, description, updatedAt}))
                    setSaving(prevState => !prevState);
                    dispatch(closeEditMenu());
                }
            });
    }
    return (
        <div>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle>Edit Entry</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        disabled={saving}
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
                        disabled={saving}
                        required
                        fullWidth
                        variant="filled"
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={saving}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleEditEntry}
                    >
                        Save
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditEntry;
