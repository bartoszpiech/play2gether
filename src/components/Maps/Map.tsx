import React, { useMemo } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 51.107883,
    lng: 17.038538,
};

type MapOptions = google.maps.MapOptions;

function MyComponent() {
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "5a0d74e61274670d",
            scaleControl: true,
            mapTypeControl: false,
        }),
        []
    );

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API_MAP_GOOGLE_TOKEN}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                options={options}
            >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    );
}

export default React.memo(MyComponent);
