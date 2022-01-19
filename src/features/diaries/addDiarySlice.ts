import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    menuOpen: boolean
}
const initialState: InitialState = {
    menuOpen: false
}
const addDiary = createSlice({
    name: 'addDiary',
    initialState,
    reducers: {
        openMenu(state) {
            state.menuOpen = true;
        },
        closeMenu(state) {
            state.menuOpen = false;
        },
    },
});

export const { openMenu, closeMenu } = addDiary.actions;
export default addDiary.reducer;
