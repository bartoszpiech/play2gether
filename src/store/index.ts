import { configureStore, Dispatch } from "@reduxjs/toolkit";

import userSlice from "./user-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        user: userSlice,
        ui: uiSlice.reducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

