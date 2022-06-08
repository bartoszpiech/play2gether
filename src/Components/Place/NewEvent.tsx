import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import pl from "date-fns/locale/pl";
import { useAppDispatch, useAppSelector } from "hooks";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newEventThunk } from "Store/place-actions";
import MultipleSelect from "./MultipleSelect";

function NewEvent(props: any) {
    const [maxPeople, setMaxPeople] = useState("");
    const [maxPeopleDisabled, setMaxPeopleDisabled] = useState(false);

    // const [startDate, setStartDate] = useState(new Date());
    const token = useAppSelector((state) => state.user.token);
    const place = useAppSelector((state) => state.place.currentPlace);

    const [startDate, setStartDate] = React.useState<Date | null>(new Date());
    const [sport, setSport] = React.useState<string[]>([]);

    const handleChange = (newValue: Date | null) => {
        setStartDate(newValue);
    };

    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        dispatch(
            newEventThunk(
                props.placeId,
                token,
                moment(startDate).second(0).millisecond(0),
                maxPeople,
                sport[0],
                props.setNewEventView
            )
        );
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
                    <MultipleSelect
                        multiple={false}
                        sportsType={place!.sports}
                        sports={sport}
                        setSports={setSport}
                    />
                </div>
                <div className="mt-4">
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
