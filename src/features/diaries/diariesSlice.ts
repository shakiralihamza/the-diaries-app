import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Diary} from '../../interfaces/diary.interface';

type UpdateNoOfEntries = {
    diaryID: string | undefined,
    type: 'INC' | 'DEC'
}
const diaries = createSlice({
    name: 'diaries',
    initialState: [] as Diary[],
    reducers: {
        addDiary(state, {payload}: PayloadAction<Diary[]>) {
            /*const diariesToSave = payload.filter((diary) => {
                return state.findIndex((item) => item.id === diary.id) === -1;
            });
            return state = diariesToSave;*/
            return (state = payload != null ? payload : []);

        },
        /*updateDiary(state, {payload}: PayloadAction<Diary>) {
            const {id} = payload;
            const diaryIndex = state.findIndex((diary) => diary.id === id);
            if (diaryIndex !== -1) {
                state.splice(diaryIndex, 1, payload);
            }
        },*/
        updateNoOfEntries: (state, {payload}: PayloadAction<UpdateNoOfEntries>) => {
            const {diaryID, type} = payload;
            const diaryIndex = state.findIndex((diary) => diary.id === diaryID);
            if (diaryIndex !== -1) {
                if (type === 'INC') {
                    state[diaryIndex].entries += 1;
                } else if (type === 'DEC') {
                    state[diaryIndex].entries -= 1
                }
            }
        }
    },
});

export const {addDiary, updateNoOfEntries} = diaries.actions;
export default diaries.reducer;
