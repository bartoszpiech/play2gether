import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaceState{
    places: null | object;
}

const initialState: PlaceState = {
    places: null
}

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        setPlaces(state){

        }
    }
})

export const placeActions = placeSlice.actions;

export default placeSlice.reducer;