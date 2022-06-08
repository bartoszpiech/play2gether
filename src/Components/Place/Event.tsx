import { Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { joinToEventThunk, leaveFromEventThunk, deleteEventThunk } from "Store/event-actions";

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

    const deleteEvent = () => {
        dispatch(deleteEventThunk(event!._id, event!.place, token));
    };

    const loadSignUp = () => {
        return event?.signedUp.map((person: any) => (
            <div key={person._id} className="d-flex justify-content-between p-2 border-bottom">
                <div
                    className={
                        person.type === "premium"
                            ? "rainbow-text d-flex align-items-center"
                            : "d-flex align-items-center"
                    }
                >
                    {person.firstName} {person.lastName}
                </div>
                <img className="css-shadow" src={`${person?.image.url}`} />
            </div>
        ));
    };

    const noLimit = () => {
        return (
            <>
                <Typography variant="h6" component="h4" mt={2}>
                    Brak limitu miejsc
                </Typography>
            </>
        );
    };

    const limit = () => {
        let limit = event?.maxSignedUp;
        let signedUp = event?.signedUp.length;

        let premium = Math.ceil(limit! * 0.1);

        return (
            <>
                <Typography variant="h6" component="h4" mt={2}>
                    Podstawowe: {limit! - signedUp! - premium}
                </Typography>
                <Typography variant="h6" component="h4" mt={1}>
                    Premium: {premium}
                </Typography>
            </>
        );
    };

    return (
        <div className="container-fluid d-flex flex-column p-5">
            <Typography variant="h1" component="h1" textAlign={"center"}>
                Wydarzenie
            </Typography>

            <Typography variant="h4" component="h4" mt={5}>
                Wolne miejsca:
            </Typography>

            {event?.maxSignedUp ? limit() : noLimit()}

            <Typography variant="h3" component="h1" textAlign={"center"} mt={3}>
                Obecni
            </Typography>
            <div className="row overflow-auto m-0 p-0">
                <div className="col-xl-8 offset-xl-2 col-12 offset-0">{event && loadSignUp()}</div>
            </div>
            <div className="container-fluid mt-auto">
                <Button fullWidth variant="contained" onClick={join} sx={{ mb: 1 }}>
                    Dołącz
                </Button>
                <Button fullWidth variant="contained" onClick={leave} sx={{ mb: 1 }}>
                    Opuść
                </Button>
                {account?._id === event?.owner && (
                    <Button fullWidth variant="contained" onClick={deleteEvent}>
                        Usuń
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Event;
