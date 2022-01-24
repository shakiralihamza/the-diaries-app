import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    menuOpen: boolean
    isAdding: boolean
}
const initialState: InitialState = {
    menuOpen: false,
    isAdding: false
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
        },
        setAdding(state) {
            state.menuOpen = true;
        },
        setAdded(state) {
            state.menuOpen = false;
        },

    },
});

export const { openEntryMenu, closeEntryMenu, setAdded, setAdding } = addEntry.actions;
export default addEntry.reducer;
