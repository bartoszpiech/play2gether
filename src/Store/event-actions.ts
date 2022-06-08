import { AppThunk } from ".";
import { getCurrentPlaceThunk } from "./place-actions";
import { placeActions } from "./place-slice";
import { uiActions } from "./ui-slice";

export const getCurrentEventThunk =
    (eventId: string | null, token: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/getEvent/${eventId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    AppDispatch(placeActions.setCurrentEvent(data));
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Jakiś błąd",
                    })
                );
            });
    };

export const joinToEventThunk =
    (eventId: string | null, token: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/event/${eventId}/join`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się dołączyć do wydarzenia",
                        })
                    );
                    AppDispatch(getCurrentEventThunk(eventId, token));
                } else {
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "error",
                            message: "Nie możesz dołączyć do wydarzenia w którym bierzesz udział",
                        })
                    );
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Błąd",
                    })
                );
            });
    };

export const leaveFromEventThunk =
    (eventId: string | null, token: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/event/${eventId}/leave`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się wyjść z wydarzenia",
                        })
                    );
                    AppDispatch(getCurrentEventThunk(eventId, token));
                } else {
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "error",
                            message: "Nie możesz wyjść z wydarzenia w którym nie bierzesz udziału",
                        })
                    );
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Błąd",
                    })
                );
            });
    };

export const deleteEventThunk =
    (eventId: string | null, placeId: string, token: string | null): AppThunk =>
    async (AppDispatch) => {
        AppDispatch(placeActions.deleteEvent({ id: eventId }));

        fetch(process.env.REACT_APP_API_ENDPOINT + `user/event/${eventId}/delete`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się usunąć wydarzenie",
                        })
                    );
                    AppDispatch(getCurrentPlaceThunk(placeId, token));
                } else {
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "error",
                            message: "Nie udało się usunąć wydarzenia",
                        })
                    );
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Błąd",
                    })
                );
            });
    };
