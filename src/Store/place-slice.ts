import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentPlace {
    owner: string;
    name: string;
    description: string;
    sports: string[];
    images: {url: string, id:string};
    events: object[];
    geometry: {
        type: string;
        coordinates: number[];
    };
}

interface CurrentEvent {
    _id: string;
    owner: string;
    place: string;
    date: Date;
    signedUp: [string];
    maxSignedUp: number;
}

interface PlaceState {
    places: null | object[];
    selectedPlaces: null | object;
    currentPlace: null | CurrentPlace;
    currentEvent: null | CurrentEvent;
}

const initialState: PlaceState = {
    places: null,
    selectedPlaces: null,
    currentPlace: null,
    currentEvent: null,
};

interface arrayPlaces {
    places: Array<object>;
}

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        setPlaces(state, action: PayloadAction<arrayPlaces[]>) {
            state.places = action.payload;
            state.selectedPlaces = action.payload;
        },
        setSelectedPlaces(state, action: PayloadAction<arrayPlaces[]>) {
            state.selectedPlaces = action.payload;
        },
        setCurrentPlace(state, action: PayloadAction<CurrentPlace>) {
            state.currentPlace = action.payload;
            state.currentEvent = null;
        },
        setCurrentEvent(state, action: PayloadAction<CurrentEvent>) {
            state.currentEvent = action.payload;
        },
        leavePlace(state){
            state.currentPlace = null;
            state.currentEvent = null;
        }
        
    },
});

export const placeActions = placeSlice.actions;

export default placeSlice.reducer;
