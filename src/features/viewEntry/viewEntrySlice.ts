import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    title?: string,
    description?: string
    updatedAt?: string
}
const initialState: InitialState = {}
const viewEntry = createSlice({
    name: 'viewEntry',
    initialState,
    reducers: {
        setViewEntry(state, { payload }: PayloadAction<InitialState>) {
            return (state = payload != null ? payload : {});

        }
    },
});

export const { setViewEntry } = viewEntry.actions;
export default viewEntry.reducer;
