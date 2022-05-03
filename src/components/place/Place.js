import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import NewEvent from "./NewEvent";

function Place() {
    const [userContext, setUserContext] = useContext(UserContext);

    const [placeData, setPlaceData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newEventView, setNewEventView] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        console.log("czytam dane")
        setLoading(true);
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/getPlace/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPlaceData(data);
                console.log(data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const loadEvents = () => {
        // console.log("siema")
        // console.log(placeData.events)
        return placeData.events.map(event => <li key={event._id} className="list-group-item">Wydarzenie dnia: {event.date}</li>)
    }

    return (
        <>
            {loading && placeData ? (
                <div className="text-white">Nie ma jeszcze danych</div>
            ) : (
                <div className="row mt-xl-5 mt-1 mx-0">
                    {newEventView ? (
                        <NewEvent setNewEventView={setNewEventView} fetchData={fetchData} placeId={id} />
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
                                        className="btn btn-primary"
                                    >
                                        Dodaj Wydarzenie
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div
                        className="col-xl-4 col-12 bg-white rounded-1 p-3"
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
            )}
        </>
    );
}

export default Place;
