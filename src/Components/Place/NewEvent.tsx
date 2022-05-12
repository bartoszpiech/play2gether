import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import pl from "date-fns/locale/pl";
import { useAppDispatch, useAppSelector } from "hooks";
import { newEventThunk } from "Store/place-actions";

function NewEvent(props: any) {
    const [maxPeople, setMaxPeople] = useState("");
    const [maxPeopleDisabled, setMaxPeopleDisabled] = useState(false);

    // const [startDate, setStartDate] = useState(new Date());
    const token = useAppSelector((state) => state.user.token);

    const [startDate, setStartDate] = React.useState<Date | null>(new Date());

    const handleChange = (newValue: Date | null) => {
        setStartDate(newValue);
    };

    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        dispatch(newEventThunk(props.placeId, token, startDate, maxPeople, props.setNewEventView));
    };

    const handleCheckBox = () => {
        setMaxPeopleDisabled((preValue) => !preValue);
        setMaxPeople("");
    };

    return (
        <div className="p-4 text-center">
            <h1 className="display-4 text-center">Stwórz wydarzenie</h1>

            <form onSubmit={formSubmitHandler}>
                <div className="mt-5">
                    <label className="form-label mb-1">Wybierz date</label>

                    <div className="container-flex mt-3">
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={pl}>
                            <DateTimePicker
                                label="Data"
                                value={startDate}
                                minutesStep={5}
                                onChange={handleChange}
                                minDateTime={new Date()}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
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

                <button className="btn myBtn col-12 mt-2">Stwórz</button>

                <div onClick={() => props.setNewEventView(false)} className="btn btn myBtn mt-5">
                    Anuluj
                </div>
            </form>
        </div>
    );
}

export default NewEvent;
