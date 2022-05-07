import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface UserState {
    token: null | string;
    userType: null | string;
    user: null | Object;
}

// Define the initial state using that type
const initialState: UserState = {
    token: null,
    userType: null,
    user: null,
};

interface RegisterPayload {
    token: string | null;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        register(state, action: PayloadAction<RegisterPayload>) {
            state.token = action.payload.token;
        },
        login(state, action: PayloadAction<RegisterPayload>) {
            state.token = action.payload.token;
        },
        // logout(state){
        //     state.isLoggedIn = false;
        // }
    },
});

export const userActions = userSlice.actions;

// export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer;
