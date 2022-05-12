
import React, { useState } from "react";


import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks";
import { newPlaceThunk } from "Store/place-actions";

import NewPlaceMap from "Components/Maps/NewPlaceMap";

import CSS from "csstype";
import { uiActions } from "Store/ui-slice";
const newLocationMap: CSS.Properties = {
    minHeight: "200px",
};

function NewPlace() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [marker, setMarker] = useState(null);

    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.user.token);

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        if (marker) {
            dispatch(newPlaceThunk(name, description, marker, navigate, token));
        } else {
            dispatch(
                uiActions.showNotification({
                    open: true,
                    type: "error",
                    message: "Ustaw lokalizacje klikając w mapę",
                })
            );
        }
    };

    return (
        <form
            onSubmit={formSubmitHandler}
            className="d-flex flex-column rounded-3 shadow-lg bg-white h-100 p-4"
        >
            <h1 className="display-5 text-center">Nowy Obiekt</h1>
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

            <div className="my-3 flex-grow-1" style={newLocationMap}>
                <NewPlaceMap marker={marker} setMarker={setMarker} />
            </div>

            <button className="btn myBtn mt-auto">Dodaj</button>
        </form>
    );
}

export default NewPlace;
