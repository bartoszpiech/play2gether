import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";
import "moment/locale/pl"; // without this line it didn't work

import { useAppDispatch, useAppSelector } from "hooks";
import { getCurrentEventThunk, getCurrentPlaceThunk } from "Store/place-actions";

import NewEvent from "./NewEvent";
import Event from "./Event";
import { List } from "@mui/material";
import PlaceMap from "Components/Maps/PlaceMap";
import { placeActions } from "Store/place-slice";

moment.locale("pl");

function Place() {
    const [newEventView, setNewEventView] = useState(false);

    const account = useAppSelector((state) => state.user.account);
    const token = useAppSelector((state) => state.user.token);
    const currentPlace = useAppSelector((state) => state.place.currentPlace);
    const currentEvent = useAppSelector((state) => state.place.currentEvent);

    let { placeId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();

        return function cleanup() {
            dispatch(placeActions.leavePlace());
        };
    }, []);

    const fetchData = () => {
        dispatch(getCurrentPlaceThunk(placeId, token));
    };

    const loadEvents = (events: object[]) => {
        return events.map((event: any) => (
            <div
                className={`card p-0 ${
                    event._id != currentEvent?._id ? "myCard" : "mySelectedCard"
                }`}
                key={event._id}
                onClick={() => getEventHandler(event._id)}
            >
                <div className="card-header">{event.sport}</div>

                <div className="card-body text-secondary">
                    <h5 className="card-title">{moment(event.date).format("D MMMM  H:mm")}</h5>
                    <p className="card-text">
                        Ilość wolnych miejsc:{" "}
                        <b>
                            {event.signedUp.length}/{event.maxSignedUp ? event.maxSignedUp : "∞"}
                        </b>
                    </p>
                </div>
            </div>
        ));
    };

    const getEventHandler = (eventId: string) => {
        dispatch(getCurrentEventThunk(eventId, token));
    };

    return (
        <div className="container-fluid d-flex rounded-3 shadow p-0">
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
            </div>

            <div className="card d-flex flex-grow-1">
                <img
                    width="100%"
                    height="350px"
                    src={
                        "https://www.mojeurlopy.pl/upload/object/2864/images/9c649c98f15a9cbfd4de21f3356c1e27.jpg"
                    }
                />
                <div className="div text-center my-4">
                    <h1 className="card-title">{currentPlace?.name}</h1>
                    <p className="card-text">{currentPlace?.description}</p>
                </div>
                <div className="div m-3"></div>

                <div className="flex-grow-1">
                    <PlaceMap />
                </div>
            </div>
        </div>
    );
}

export default Place;
