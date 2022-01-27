import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    menuOpen: boolean
}
const initialState: InitialState = {
    menuOpen: false
}
const addEntry = createSlice({
    name: 'addEntry',
    initialState,
    reducers: {
        openEntryMenu(state) {
            state.menuOpen = true;
        },
        closeEntryMenu(state) {
            state.menuOpen = false;
        }

    },
});

export const { openEntryMenu, closeEntryMenu } = addEntry.actions;
export default addEntry.reducer;
