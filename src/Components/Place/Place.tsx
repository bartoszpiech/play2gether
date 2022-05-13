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
    }, []);

    const fetchData = () => {
        dispatch(getCurrentPlaceThunk(placeId, token));
    };

    const loadEvents = (events: [object]) => {
        console.log(events)
        return events.map((event: any) => (
            <div
                className="card border-secondary p-0 myCard"
                key={event._id}
                onClick={() => getEventHandler(event._id)}
            >
                <div className="card-header">Koszykówka</div>
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
            <div className="row container-fluid m-0 p-0">
                <div className="col-xl-4 col-12 p-0 d-flex">
                    {newEventView ? (
                        <NewEvent
                            setNewEventView={setNewEventView}
                            fetchData={fetchData}
                            placeId={placeId}
                        />
                    ) : (
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
                            <div className="div m-3">
                                <div onClick={() => setNewEventView(true)} className="btn myBtn">
                                    Dodaj Wydarzenie
                                </div>
                                {account?._id === currentPlace?.owner && (
                                    <div
                                        onClick={() => setNewEventView(true)}
                                        className="btn myBtn"
                                    >
                                        Ustawienia
                                    </div>
                                )}
                            </div>

                            <div className="flex-grow-1">
                                <PlaceMap />
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-xl-2 col-12 p-0 m-0">
                    <div className="row overflow-auto m-0 p-0" style={{ height: "825px" }}>
                        {currentPlace ? loadEvents(currentPlace.events) : ""}
                    </div>
                </div>
                <div className="col-xl-6 col-12 d-flex">
                    {currentEvent && (
                        <Event key={currentEvent._id} getEventHandler={getEventHandler} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Place;
