import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
    currentEntry: string | undefined
}
const initialState: InitialState = {
    currentEntry: undefined
}
const currentEntry = createSlice({
    name: 'currentEntry',
    initialState,
    reducers: {
        setCurrentEntry(state, {payload}: PayloadAction<string | undefined>) {
            state.currentEntry = payload;
        }
    },
});

export const {setCurrentEntry} = currentEntry.actions;
export default currentEntry.reducer;
