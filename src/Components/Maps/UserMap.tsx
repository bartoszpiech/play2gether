import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from "react-map-gl";

import Pin from "./Pin";
import CSS from "csstype";
import GeocoderControl from "./GeocoderControl";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllPlacesThunk } from "../../Store/place-actions";

const userMapColStyle: CSS.Properties = {
    minHeight: "400px",
};

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

function UserMap() {
    const [popupInfo, setPopupInfo] = useState<TypePopupInfo | null>(null);

    const places = useAppSelector((state) => state.place.places);

    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        dispatch(getAllPlacesThunk());
    };

    const CreatPins = (places: any) => {
        return places.map((event: TypePopupInfo) => (
            <Marker
                key={`marker-${event._id}`}
                longitude={event.geometry.coordinates[0]}
                latitude={event.geometry.coordinates[1]}
                anchor="bottom"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(event);
                }}
            >
                <Pin />
            </Marker>
        ));
    };

    const onWheel = (event: any) => {
        if (event.originalEvent.ctrlKey) {
            return;
        }

        if (event.originalEvent.metaKey) {
            return;
        }

        if (event.originalEvent.altKey) {
            return;
        }

        event.preventDefault();
    };

    return (
        <>
            <Map
                initialViewState={initialViewState}
                mapboxAccessToken={TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                attributionControl={false}
                onWheel={onWheel}
                style={userMapColStyle}
            >
                <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
                <GeolocateControl showAccuracyCircle={false} position="top-left" />
                <FullscreenControl position="bottom-right" />
                <NavigationControl position="bottom-right" />

                <ScaleControl />

                {places ? CreatPins(places) : ""}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.geometry.coordinates[0])}
                        latitude={Number(popupInfo.geometry.coordinates[1])}
                        onClose={() => setPopupInfo(null)}
                        closeButton={false}
                    >
                        <div className="p-1" style={{ height: "125px", width: "200px" }}>
                            <h5 className="mt-1">{popupInfo.name}</h5>
                            <p>{popupInfo.description}</p>

                            <div className="d-grid gap-2">
                                <NavLink to={`/user/place/${popupInfo._id}`} className="btn myBtn">
                                    Wejdź
                                </NavLink>
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>
        </>
    );
}

export default UserMap;
