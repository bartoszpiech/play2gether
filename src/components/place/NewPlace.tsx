import React, { useState, useContext } from "react";

// import { UserContext } from "../../Context/UserContext";
import NewPlaceMap from "./NewPlaceMap";

import { useNavigate } from "react-router-dom";

import CSS from "csstype";

const newPlaceMapStyle: CSS.Properties = {
    minHeight: "200px",
};

const NewPlace = () => {
    // const [userContext, setUserContext] = useContext(UserContext);

    const [error, setError] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [marker, setMarker] = useState("");

    let navigate = useNavigate();

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const genericErrorMessage = "Nie udało się utworzyć miejsca Spróbuj później";

        fetch(process.env.REACT_APP_API_ENDPOINT + "user/newPlace", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${userContext.token}`,
            },
            body: JSON.stringify({ name, description, location: marker }),
        })
            .then(async (response) => {
                console.log(response);
                setIsSubmitting(false);
                if (!response.ok) {
                    if (response.status === 500) {
                        setError("Please fill all the fields correctly!");
                    } else {
                        setError(genericErrorMessage);
                    }
                    setErrorVisible(true);
                } else {
                    navigate("/user/home", { replace: true });
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                setError(genericErrorMessage);
                setErrorVisible(true);
            });
    };

    const handleOnClick = () => {
        setErrorVisible(false);
    };

    return (
        <form onSubmit={formSubmitHandler} className="d-flex flex-column rounded-3 shadow-lg bg-white h-100 p-4">
            <h1 className="display-5 text-center">Tworzenie nowego obiektu</h1>
            <div className="mt-4">
                <label className="form-label mb-1">Nazwa</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="mt-3">
                <label className="form-label">Opis</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="exampleFormControlTextarea1"
                    rows={3}
                ></textarea>
            </div>

            <div className="my-3 flex-grow-1" style={newPlaceMapStyle}><NewPlaceMap newLocation={setMarker} /></div>

            <button type="submit" className="btn btn-secondary mt-auto" disabled={isSubmitting}>
                {isSubmitting ? "Dodawanie" : "Dodaj"}
            </button>
        </form>
    );
};

export default NewPlace;
