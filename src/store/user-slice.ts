import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    token: null | string;
    userType: null | string;
    user: null | Object;
}

interface RegisterPayload {
    token: string;
}

// Define the initial state using that type
const initialState: UserState = {
    token: null,
    userType: null,
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        register(state, action: PayloadAction<RegisterPayload>) {
            state.token = action.payload.token;
        },
        // logout(state){
        //     state.isLoggedIn = false;
        // }
    },
});

export const userActions = userSlice.actions;

export default userSlice;
