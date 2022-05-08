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

const userMapColStyle: CSS.Properties = {
    minHeight: "400px"
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

    const [dataMap, setDataMap] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const onWheel = (event :any) => {
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
                    <GeolocateControl position="top-left" />
                    <FullscreenControl position="top-left" />
                    <NavigationControl position="top-left" />
                    <ScaleControl />

                    {dataMap ? CreatPins(dataMap) : ""}

                    {popupInfo && (
                        <Popup
                            anchor="top"
                            longitude={Number(popupInfo.geometry.coordinates[0])}
                            latitude={Number(popupInfo.geometry.coordinates[1])}
                            onClose={() => setPopupInfo(null)}
                        >
                            <div>
                                <h5>{popupInfo.name}</h5>
                                <p>{popupInfo.description}</p>
                                {/* <a
                                    target="_new"
                                    href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                                >
                                    Wejdź
                                </a> */}
                                <NavLink
                                    to={`/user/place/${popupInfo._id}`}
                                    className="btn btn-info"
                                >
                                    Wejdź
                                </NavLink>
                            </div>
                            {/* <img width="100%" src={popupInfo.image} /> */}
                        </Popup>
                    )}
                </Map>
            )}
        </>
    );
}

export default UserMap;