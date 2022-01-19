import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import userSlice from "../features/auth/userSlice";
import diariesSlice from "../features/diaries/diariesSlice";
import entriesSlice from "../features/entries/entriesSlice";
import authSlice from "../features/auth/authSlice";
import addDiarySlice from "../features/diaries/addDiarySlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        diaries: diariesSlice,
        entries: entriesSlice,
        addDiary: addDiarySlice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
