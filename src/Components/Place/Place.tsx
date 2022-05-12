import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import moment from "moment";
import "moment/locale/pl"; // without this line it didn't work

import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCurrentPlaceThunk } from "../../Store/place-actions";

import NewEvent from "./NewEvent";

moment.locale("pl");

function Place() {
    const [newEventView, setNewEventView] = useState(false);

    const token = useAppSelector((state) => state.user.token);
    const currentPlace = useAppSelector((state) => state.place.currentPlace);

    let { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        dispatch(getCurrentPlaceThunk(id, token));
    };

    const loadEvents = (events: [object]) => {
        return events.map((event: any) => (
            <div className="card border-secondary col-6 p-0" key={event._id}>
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

    return (
        <div className="row rounded-3 shadow-lg bg-white h-100">
            <div className="col-xl-6 col-12 p-0">
                {newEventView ? (
                    <NewEvent
                        setNewEventView={setNewEventView}
                        fetchData={fetchData}
                        placeId={id}
                    />
                ) : (
                    <div className="card">
                        <img
                            width="100%"
                            height="350px"
                            src={
                                "https://www.mojeurlopy.pl/upload/object/2864/images/9c649c98f15a9cbfd4de21f3356c1e27.jpg"
                            }
                        />
                        <div className="card-body">
                            <h1 className="card-title">{currentPlace?.name}</h1>
                            <p className="card-text">{currentPlace?.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Informacje</li>
                            <li className="list-group-item">Informacje</li>
                            <li className="list-group-item">Informacje</li>
                        </ul>
                        <div className="card-body">
                            <div onClick={() => setNewEventView(true)} className="btn myBtn">
                                Dodaj Wydarzenie
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="col-xl-6 col-12">
                <h1 className="display-4 text-center py-4">Nadchodzące wydarzenia</h1>
                <ul className="row overflow-auto p-0" style={{ height: "530px" }}>
                    {currentPlace ? loadEvents(currentPlace.events) : ""}
                </ul>
            </div>
        </div>
    );
}

export default Place;
