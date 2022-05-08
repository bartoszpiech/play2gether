import React, { useState, useCallback } from "react";

import Pin from "./Pin";

import Map, { NavigationControl, Marker } from "react-map-gl";

const TOKEN = process.env.REACT_APP_API_MAP_TOKEN;

const initialViewState = {
    longitude: 17.038538,
    latitude: 51.107883,
    zoom: 12.5,
};

const NewPlaceMap = (props:any) => {
    const [marker, setMarker] = useState({
        latitude: 51.107883,
        longitude: 17.038538,
    });

    const onMarkerDrag = useCallback((event:any) => {
        setMarker({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        });
        // console.log(props.text)
        props.newLocation({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        });
    }, []);

    const onWheel = (event:any) => {
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
        <Map
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={TOKEN}
            attributionControl={false}
            onWheel={onWheel}
        >
            <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                anchor="bottom"
                draggable

                onDrag={onMarkerDrag}
            >
                <Pin size={20} />
            </Marker>
            {/* <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" /> */}
            <NavigationControl />
        </Map>
    );
};

export default NewPlaceMap;
