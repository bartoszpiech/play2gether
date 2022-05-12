import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import userSlice from "./user-slice";
import uiSlice from "./ui-slice";
import placeSlice from "./place-slice";

const store = configureStore({
    reducer: {
        user: userSlice,
        ui: uiSlice,
        place: placeSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
