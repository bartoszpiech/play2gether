import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
} from "react-map-gl";
import { NavLink } from "react-router-dom";
import { getAllPlacesThunk } from "Store/place-actions";
import GeocoderControl from "./GeocoderControl";
import Pin from "./Pin";

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

    const selectedPlaces = useAppSelector((state) => state.place.selectedPlaces);

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

            {selectedPlaces ? CreatPins(selectedPlaces) : ""}

            {popupInfo && (
                <Popup
                    anchor="top"
                    longitude={Number(popupInfo.geometry.coordinates[0])}
                    latitude={Number(popupInfo.geometry.coordinates[1])}
                    onClose={() => setPopupInfo(null)}
                    closeButton={false}
                >
                    <div
                        className="d-flex flex-column p-1"
                        style={{ height: "125px", width: "200px" }}
                    >
                        <h5 className="mt-1">{popupInfo.name}</h5>
                        <p>{popupInfo.description}</p>

                        <div className="d-grid gap-2 mt-auto">
                            <NavLink to={`/user/place/${popupInfo._id}`} className="btn myBtn">
                                Wejdź
                            </NavLink>
                        </div>
                    </div>
                </Popup>
            )}
        </Map>
    );
}

export default UserMap;
