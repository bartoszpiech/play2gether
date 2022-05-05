import React, { useState, useContext } from "react";

import { UserContext } from "../../Context/UserContext";
import NewPlaceMap from "./NewPlaceMap";

import { useNavigate } from "react-router-dom";
import Flash from "../Flash";

// let test = "test"

const NewPlace = () => {
    const [userContext, setUserContext] = useContext(UserContext);

    const [error, setError] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [marker, setMarker] = useState("");

    let navigate = useNavigate();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const genericErrorMessage = "Nie udało się utworzyć miejsca Spróbuj później";

        fetch(process.env.REACT_APP_API_ENDPOINT + "user/newPlace", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
            body: JSON.stringify({ name, description, location: marker }),
        })
            .then(async (response) => {
                console.log(response)
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
    }

    return (
        <>
        {errorVisible && <Flash text={error} status="fail" handleOnClick={handleOnClick}></Flash>}
            <div className="row mt-xl-5 mt-1 mx-0" style={{ height: "1000px" }}>
                <div className="col-xl-4 offset-xl-4 col-12 offset-0 rounded-3 shadow-lg bg-white p-4">
                    <h1 className="display-5 text-center">Tworzenie nowego obiektu</h1>

                    <form onSubmit={formSubmitHandler}>
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
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="mt-3" style={{ height: "600px" }}>
                            <NewPlaceMap newLocation={setMarker} />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-secondary col-12 mt-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Dodawanie" : "Dodaj"}
                        </button>
                    </form>
                </div>
                <div className="col-xl-2 col-12 offset-xl-2 offset-0 bg-danger shadow-lg" style={{height: "1000px"}}>
                    <h1 className="text-center text-white">Reklama</h1>
                </div>
            </div>
        </>
    );
};

export default NewPlace;
