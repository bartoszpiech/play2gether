import React, { useState, useContext } from "react";

import { UserContext } from "../../Context/UserContext";
import DatePicker, { registerLocale } from "react-datepicker";

import { useNavigate } from "react-router-dom";

import pl from "date-fns/locale/pl";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pl", pl);

function NewEvent(props) {
    const [userContext, setUserContext] = useContext(UserContext);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [maxPeople, setMaxPeople] = useState("");
    const [maxPeopleDisabled, setMaxPeopleDisabled] = useState(false);

    const [startDate, setStartDate] = useState(new Date());

    let navigate = useNavigate();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        const genericErrorMessage = "Nie udało się utworzyć wydarzenia Spróbuj później";

        fetch(process.env.REACT_APP_API_ENDPOINT + `user/place/${props.placeId}/newEvent`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
            body: JSON.stringify({ startDate, maxPeople }),
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
                    // setErrorVisible(true);
                } else {
                    // navigate(`/user/place/${props.placeId}`, { replace: true });
                    props.setNewEventView(false);
                    props.fetchData();
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                setError(genericErrorMessage);
                // setErrorVisible(true);
            });
    };

    const handleCheckBox = () => {
        setMaxPeopleDisabled((preValue) => !preValue);
        setMaxPeople("");
    };

    return (
        <div
            className="col-xl-4 offset-xl-2 col-12 offset-0 bg-white rounded-1 border p-4"
            style={{ height: "40.8rem" }}
        >
            <h1 className="display-4 text-center my-4">Stwórz wydarzenie</h1>

            <form onSubmit={formSubmitHandler}>
                <div className="mt-5">
                    <label className="form-label mb-1">Wybierz date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        locale="pl"
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={5}
                        dateFormat="Pp"
                    />
                </div>
                <div className="mt-4">
                    <label className="form-label mb-1">Brak limitu / Limit Miejsc</label>
                    <div className="input-group">
                        <div className="input-group-text">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onClick={handleCheckBox}
                                value=""
                                aria-label="Checkbox for following text input"
                            />
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            aria-label="Text input with checkbox"
                            value={maxPeople}
                            onChange={(e) => setMaxPeople(e.target.value)}
                            disabled={maxPeopleDisabled ? true : false}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn myBtn col-12 mt-4" disabled={isSubmitting}>
                    {isSubmitting ? "Tworzenie" : "Stwórz"}
                </button>
                <div onClick={() => props.setNewEventView(false)} className="btn btn myBtn mt-5">
                    Anuluj
                </div>
            </form>
        </div>
    );
}

export default NewEvent;
