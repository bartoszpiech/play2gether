import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaceState {
    places: null | object;
}

const initialState: PlaceState = {
    places: null,
};

interface arrayPlaces {
    places: [object];
}

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        setPlaces(state, action: PayloadAction<arrayPlaces>) {
            state.places = action.payload;
        },
    },
});

export const placeActions = placeSlice.actions;

export default placeSlice.reducer;
