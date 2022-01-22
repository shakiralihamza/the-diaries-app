import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
    currentDiary: string | undefined
}
const initialState: InitialState = {
    currentDiary: undefined
}
const currentDiary = createSlice({
    name: 'currentDiary',
    initialState,
    reducers: {
        setCurrentDiary(state, {payload}: PayloadAction<string | undefined>) {
            state.currentDiary = payload;
        }
    },
});

export const {setCurrentDiary} = currentDiary.actions;
export default currentDiary.reducer;
