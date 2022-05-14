import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks";
import { newPlaceThunk } from "Store/place-actions";

import NewPlaceMap from "Components/Maps/NewPlaceMap";

import CSS from "csstype";
import { uiActions } from "Store/ui-slice";
import SportType from "Components/SearchBox/SportType";
import MultipleSelect from "./Selector";
const newLocationMap: CSS.Properties = {
    minHeight: "200px",
};

function NewPlace() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [marker, setMarker] = useState(null);
    const [sports, setSports] = React.useState<string[]>([]);

    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.user.token);

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        if (marker) {
            dispatch(newPlaceThunk(name, description, sports, marker, navigate, token));
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
            className="bg-white container-fluid d-flex flex-column rounded-3 shadow my-xl-5 my-0 p-5"
        >
            <h1 className="display-3 text-center">Nowy Obiekt</h1>
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
                <label className="form-label mb-1">Opis</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="exampleFormControlTextarea1"
                    rows={3}
                ></textarea>
            </div>

            <div className="mt-3">
                <MultipleSelect multiple={true} sportsType={null} sports={sports} setSports={setSports} />
            </div>

            <div className="my-2 flex-grow-1" style={newLocationMap}>
                <NewPlaceMap marker={marker} setMarker={setMarker} />
            </div>

            <button className="btn myBtn mt-auto">Dodaj</button>
        </form>
    );
}

export default NewPlace;
