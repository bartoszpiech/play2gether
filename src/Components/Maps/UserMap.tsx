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
    const [dataMap, setDataMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [popupInfo, setPopupInfo] = useState<TypePopupInfo | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/getPlaces")
            .then((response) => response.json())
            .then((data) => {
                setDataMap(data);
                setLoading(false);
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false);
            });
    };

    const CreatPins = (dataMap: any) => {
        return dataMap.map((event: TypePopupInfo) => (
            <Marker
                key={`marker-${event._id}`}
                longitude={event.geometry.coordinates[0]}
                latitude={event.geometry.coordinates[1]}
                anchor="bottom"
                onClick={(e) => {
                    // If we let the click event propagates to the map, it will immediately close the popup
                    // with `closeOnClick: true`
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
            {loading ? (
                <div className="text-white">Nie ma jeszcze danych</div>
            ) : (
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

                    {dataMap ? CreatPins(dataMap) : ""}

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
                                    <NavLink
                                        to={`/user/place/${popupInfo._id}`}
                                        className="btn myBtn"
                                    >
                                        Wejdź
                                    </NavLink>
                                </div>
                            </div>
                        </Popup>
                    )}
                </Map>
            )}
        </>
    );
}

export default UserMap;
