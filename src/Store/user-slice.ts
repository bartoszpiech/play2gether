import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountType {
    _id: string;
    type: string;
    username: string;
    firstName: string;
    lastName: string;
    image: {
        url: string;
        id: string;
    };
    activeEvents: [];
    authStrategy: string;
    __v: number;
}

interface UserState {
    token: null | string;
    account: null | AccountType;
}

// Define the initial state using that type
const initialState: UserState = {
    token: null,
    account: null,
};

interface RegisterPayload {
    token: string | null;
    account: AccountType;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<RegisterPayload>) {
            state.token = action.payload.token;
            state.account = action.payload.account;
        },
        updateUser(state, action: PayloadAction<{ account: AccountType }>) {
            state.account = action.payload.account;
        },
        logout(state) {
            state.token = null;
            state.account = null;
        },
    },
});

export const userActions = userSlice.actions;

// export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer;
