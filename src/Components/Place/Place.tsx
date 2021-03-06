import { Button } from "@mui/material";
import PlaceMap from "Components/Maps/PlaceMap";
import { useAppDispatch, useAppSelector } from "hooks";
import moment from "moment";
import "moment/locale/pl"; // without this line it didn't work
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentEventThunk } from "Store/event-actions";
import { getCurrentPlaceThunk } from "Store/place-actions";
import { placeActions } from "Store/place-slice";
import Event from "./Event";
import NewEvent from "./NewEvent";
import Slideshow from "./Slideshow";

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
            <div className="row container-fluid m-0 p-0">
                <div className="col-xl-4 col-12 p-0 d-flex">
                        <div className="card d-flex flex-grow-1">
                            {currentPlace && <Slideshow images={currentPlace?.images} />}

                            <div className="div text-center my-4">
                                <h1 className="card-title">{currentPlace?.name}</h1>
                                <p className="card-text">{currentPlace?.description}</p>
                            </div>
                            <div className="div m-3">
                            {currentPlace &&
                        <NewEvent
                            setNewEventView={setNewEventView}
                            fetchData={fetchData}
                            placeId={placeId}
                        /> }
                            </div>

                            <div className="flex-grow-1">
                                <PlaceMap />
                            </div>
                        </div>
                </div>
                <div className="col-xl-2 col-12 p-0 m-0">
                    <div className="row overflow-auto m-0 p-0" style={{ maxHeight: "825px" }}>
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
