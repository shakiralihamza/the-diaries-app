import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Entry} from '../../interfaces/entry.interface';

const entries = createSlice({
    name: 'entries',
    initialState: [] as Entry[],
    reducers: {
        setEntries(state, {payload}: PayloadAction<Entry[] | null>) {
            return (state = payload != null ? payload : []);

        },
        updateEntry(state, { payload }: PayloadAction<Entry>) {
            const { id } = payload;
            const index = state.findIndex((e) => e.id === id);
            if (index !== -1) {
                state.splice(index, 1, payload);
            }
        },
        deleteEntry(state, { payload }: PayloadAction<string>) {
            const index = state.findIndex((e) => e.id === payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const {setEntries, updateEntry, deleteEntry} = entries.actions;
export default entries.reducer;
