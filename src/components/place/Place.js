import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// import { UserContext } from "../../Context/UserContext";

import NewEvent from "./NewEvent";
import moment from "moment";

import "moment/locale/pl"; // without this line it didn't work
moment.locale("pl");

function Place() {
    const [error, setError] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);


    const [placeData, setPlaceData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newEventView, setNewEventView] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/getPlace/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${userContext.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPlaceData(data);

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const join = (id) => {
        const genericErrorMessage = "Nie udało się Spróbuj później";

        setLoading(true);
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/event/${id}/join`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${userContext.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPlaceData(data);
                if (data.message) setError(data.message || genericErrorMessage);
                setErrorVisible(true);
                setLoading(false);
                fetchData();
            })
            .catch((error) => {
                setLoading(false);
                fetchData();
            });
    };

    const leave = (id) => {
        const genericErrorMessage = "Nie udało się Spróbuj później";

        setLoading(true);
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/event/${id}/leave`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${userContext.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPlaceData(data);
                setLoading(false);
                if (data.message) setError(data.message || genericErrorMessage);
                setErrorVisible(true);
                fetchData();
            })
            .catch((error) => {
                setLoading(false);
                fetchData();
            });
    };

    const handleOnClick = () => {
        setErrorVisible(false);
    };

    const loadEvents = () => {
        return placeData.events.map((event) => (
            <div className="row border my-1 mx-3 align-items-center" key={event._id}>
                <div className="col-5">
                    Wydarzenie <b>{moment(event.date).format("MMMM Do HH:MM")}</b>
                </div>
                <div className="col-3">
                    {event.signedUp.length}/{event.maxSignedUp ? event.maxSignedUp : "∞"}
                </div>
                <div className="col-2">
                    <div className="btn myBtn" onClick={() => join(event._id)}>
                        Dołącz
                    </div>
                </div>
                <div className="col-2">
                    <div className="btn myBtn" onClick={() => leave(event._id)}>
                        Wyjdź
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <>
            {loading && placeData ? (
                <div className="text-white">Nie ma jeszcze danych</div>
            ) : (
                <>
                    <div className="row mt-xl-5 mt-1 mx-0">
                        {newEventView ? (
                            <NewEvent
                                setNewEventView={setNewEventView}
                                fetchData={fetchData}
                                placeId={id}
                            />
                        ) : (
                            <div className="col-xl-4 offset-xl-2 col-12 offset-0">
                                <div className="card m-0 p-0">
                                    <img
                                        width="100%"
                                        height="350px"
                                        src={
                                            "https://www.mojeurlopy.pl/upload/object/2864/images/9c649c98f15a9cbfd4de21f3356c1e27.jpg"
                                        }
                                    />
                                    <div className="card-body">
                                        <h1 className="card-title">{placeData.name}</h1>
                                        <p className="card-text">{placeData.description}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Informacje</li>
                                        <li className="list-group-item">Informacje</li>
                                        <li className="list-group-item">Informacje</li>
                                    </ul>
                                    <div className="card-body">
                                        <div
                                            onClick={() => setNewEventView(true)}
                                            className="btn myBtn"
                                        >
                                            Dodaj Wydarzenie
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div
                            className="col-xl-4 col-12 bg-white rounded-1 p-3 border"
                            style={{ height: "40.8rem" }}
                        >
                            <h1 className="display-4 text-center border-bottom border-dark pb-4">
                                Nadchodzące wydarzenia
                            </h1>
                            <ul className="list-group list-group-flush">
                                {placeData.events ? loadEvents() : ""}
                                {/* <li className="list-group-item">Brak wydarzeń</li>
                            <li className="list-group-item">Brak wydarzeń</li>
                            <li className="list-group-item">Brak wydarzeń</li> */}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Place;
