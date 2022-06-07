import { useCallback } from "react";
import Map, { NavigationControl, Marker, GeolocateControl } from "react-map-gl";
import GeocoderControl from "./GeocoderControl";

import Pin from "./Pin";

const TOKEN = process.env.REACT_APP_API_MAP_TOKEN;

// const initialViewState = {
//     longitude: 19.1343786,
//     latitude: 51.9189046,
//     zoom: 4.6,
// };

const initialViewState = {
    longitude: 17.038538,
    latitude: 51.107883,
    zoom:12,
};

function NewPlaceMap(props: any) {
    const onMarkerDrag = useCallback((event: any) => {
        props.setMarker({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        });
    }, []);

    const onWheel = (event: any) => {
        if (event.originalEvent.ctrlKey) return;

        if (event.originalEvent.metaKey) return;

        if (event.originalEvent.altKey) return;

        event.preventDefault();
    };

    const onMapClick = (event: any) => {
        props.setMarker({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng,
        });
    };

    return (
        <Map
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={TOKEN}
            attributionControl={false}
            onWheel={onWheel}
            onClick={onMapClick}
        >
            {props.marker && (
                <Marker
                    longitude={props.marker.longitude}
                    latitude={props.marker.latitude}
                    anchor="bottom"
                    draggable
                    onDrag={onMarkerDrag}
                >
                    <Pin size={25} />
                </Marker>
            )}
            <GeocoderControl mapboxAccessToken={`${TOKEN}`} position="top-left" />
            <GeolocateControl showAccuracyCircle={false} position="top-left" />
            <NavigationControl />
        </Map>
    );
}

export default NewPlaceMap;
