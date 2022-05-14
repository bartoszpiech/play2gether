import { useAppDispatch, useAppSelector } from "hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { joinToEventThunk, leaveFromEventThunk } from "Store/place-actions";

function Event(props: any) {
    const account = useAppSelector((state) => state.user.account);
    const event = useAppSelector((state) => state.place.currentEvent);
    const token = useAppSelector((state) => state.user.token);

    const dispatch = useAppDispatch();

    const join = () => {
        dispatch(joinToEventThunk(event!._id, token));
    };

    const leave = () => {
        dispatch(leaveFromEventThunk(event!._id, token));
    };

    const loadSignUp = () => {
        return event?.signedUp.map((person: any) => (
            <div key={person._id} className="d-flex justify-content-between p-0 m-0" style={{ height: "50px" }}>
                <div className="">
                    {person.firstName} {person.lastName}
                </div>
                <div
                    className=""
                    style={{
                        width: "150px",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${person?.image.url})`,
                    }}
                />
            </div>
        ));
    };
    

    return (
        <div className="container-fluid d-flex flex-column p-5">
            <h1 className="display-4 text-center">Wydarzenie</h1>

            <h1 className="display-6 text-center py-4">Obecni</h1>
            <div className="row overflow-auto">
                {event && loadSignUp()}
            </div>

            <div className="container-fluid mt-auto">
                <button type="button" className="btn myBtn col-12 mt" onClick={join}>
                    dołącz
                </button>
                <button type="button" className="btn myBtn col-12 mt-2" onClick={leave}>
                    opuść
                </button>
                {account?._id === event?.owner && (
                <button type="button" className="btn myBtn col-12 mt-2">
                    Ustawienia
                </button>
                )}
            </div>
        </div>
    );
}

export default Event;
