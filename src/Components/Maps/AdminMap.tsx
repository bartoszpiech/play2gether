import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from "react-map-gl";

import Pin from "./Pin";
import GeocoderControl from "./GeocoderControl";
import { useAppDispatch, useAppSelector } from "hooks";
import { getAllInactivePlacesThunk, getAllPlacesThunk } from "Store/place-actions";

const TOKEN = process.env.REACT_APP_API_MAP_TOKEN;

const initialViewState = {
    longitude: 17.038538,
    latitude: 51.107883,
    zoom: 12.5,
};

interface TypePopupInfo {
    _id: string;
    name: string;
    description: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
}

function AdminMap() {
    const selectedPlaces = useAppSelector((state) => state.place.selectedPlaces);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        dispatch(getAllInactivePlacesThunk());
    };

    const CreatePins = (places: any) => {
        return places.map((place: TypePopupInfo) => (
            <Marker
                key={`marker-${place._id}`}
                longitude={place.geometry.coordinates[0]}
                latitude={place.geometry.coordinates[1]}
                anchor="bottom"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    // setPopupInfo(event);

                    navigate(`/admin/place/${place._id}`);
                }}
            >
                <Pin />
            </Marker>
        ));
    };

    const onWheel = (event: any) => {
        if (event.originalEvent.ctrlKey) return;

        if (event.originalEvent.metaKey) return;

        if (event.originalEvent.altKey) return;

        event.preventDefault();
    };

    return (
        <Map
            initialViewState={initialViewState}
            mapboxAccessToken={TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            attributionControl={false}
            onWheel={onWheel}
            style={{ minHeight: "500px" }}
        >
            <GeocoderControl mapboxAccessToken={`${TOKEN}`} position="top-left" />
            <GeolocateControl showAccuracyCircle={false} position="top-left" />
            <FullscreenControl position="bottom-right" />
            <NavigationControl position="bottom-right" />

            <ScaleControl />

            {selectedPlaces ? CreatePins(selectedPlaces) : ""}
            
        </Map>
    );
}

export default AdminMap;
