import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    menuOpen: boolean
}
const initialState: InitialState = {
    menuOpen: false
}
const editEntry = createSlice({
    name: 'editEntry',
    initialState,
    reducers: {
        openEditMenu(state) {
            state.menuOpen = true;
        },
        closeEditMenu(state) {
            state.menuOpen = false;
        }

    },
});

export const { openEditMenu, closeEditMenu } = editEntry.actions;
export default editEntry.reducer;
