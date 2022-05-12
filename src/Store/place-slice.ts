import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentPlace {
    owner: string;
    name: string;
    description: string;
    events: [object];
    geometry: {
        type: {
            type: String;
        };
        coordinates: {
            type: [Number];
        };
    };
}

interface PlaceState {
    places: null | object;
    currentPlace: null | CurrentPlace;
}

const initialState: PlaceState = {
    places: null,
    currentPlace: null,
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
        setCurrentPlace(state, action: PayloadAction<CurrentPlace>) {
            state.currentPlace = action.payload;
        },
    },
});

export const placeActions = placeSlice.actions;

export default placeSlice.reducer;
