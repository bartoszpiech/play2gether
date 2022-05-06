import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UiState {
    notification: null | { message?: string; type?: string; open?: boolean };
}

interface payLoad {
    message?: string;
    type?: string;
    open?: boolean;
}

// Define the initial state using that type
const initialState: UiState = {
    notification: {open: false},
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showNotification(state, action: PayloadAction<payLoad>) {
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open,
            };
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
