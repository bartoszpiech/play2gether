import { useAppSelector } from "hooks";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    ScaleControl,
} from "react-map-gl";
import Pin from "./Pin";

const TOKEN = process.env.REACT_APP_API_MAP_TOKEN;

function PlaceMap() {
    const place = useAppSelector((state) => state.place.currentPlace);

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
            {place && (
                <Map
                    initialViewState={{
                        longitude: place?.geometry.coordinates[0],
                        latitude: place?.geometry.coordinates[1],
                        zoom: 12.5,
                    }}
                    mapboxAccessToken={TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    attributionControl={false}
                    onWheel={onWheel}
                >
                    <GeolocateControl showAccuracyCircle={false} position="top-left" />
                    <FullscreenControl position="bottom-right" />
                    <NavigationControl position="bottom-right" />

                    <Marker
                        longitude={place.geometry.coordinates[0]}
                        latitude={place.geometry.coordinates[1]}
                        anchor="bottom"
                    >
                        <Pin size={25} />
                    </Marker>

                    <ScaleControl />
                </Map>
            )}
        </>
    );
}

export default PlaceMap;
