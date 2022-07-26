import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type currentEntryDataType = {
    title: string,
    description: string,
    updatedAt?: string,
}
type InitialState = {
    currentEntry?: string
    currentEntryData?: currentEntryDataType
}
const initialState: InitialState = {
    currentEntry: undefined,
    currentEntryData: undefined
}
const currentEntry = createSlice({
    name: 'currentEntry',
    initialState,
    reducers: {
        setCurrentEntry(state, {payload}: PayloadAction<string | undefined>) {
            state.currentEntry = payload;
        },
        setCurrentEntryData(state, {payload}: PayloadAction<currentEntryDataType | undefined>) {
            state.currentEntryData = payload;
        }
    },
});

export const {setCurrentEntry, setCurrentEntryData} = currentEntry.actions;
export default currentEntry.reducer;
