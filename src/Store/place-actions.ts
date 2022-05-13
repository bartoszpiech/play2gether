import { AppThunk } from ".";
import { placeActions } from "./place-slice";
import { uiActions } from "./ui-slice";

export const newPlaceThunk =
    (
        name: string,
        description: string,
        marker: any,
        navigate: any,
        token: string | null
    ): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/newPlace", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description, location: marker }),
        }).then(async (response) => {
            if (response.ok) {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Udało się utworzyć miejsce",
                    })
                );
                navigate("/user/home", { replace: true });
            } else {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Nie udało się utworzyć miejsca",
                    })
                );
            }
        });
    };

export const getAllPlacesThunk =
    (token?: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/getPlaces", {
            method: "GET",
            credentials: "include",
            // Pass authentication token as bearer token in header
            headers: {
                "Content-Type": "application/json",
                //   Authorization: `Bearer ${token}`,
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                AppDispatch(placeActions.setPlaces(data));
            } else {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Nie udało się pobrać miejsc",
                    })
                );
            }
        });
    };

export const getCurrentPlaceThunk =
    (id: string | undefined, token: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/getPlace/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                AppDispatch(placeActions.setCurrentPlace(data));
            } else {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Nie udało się",
                    })
                );
            }
        });
    };

export const newEventThunk =
    (
        placeId: string,
        token: string | null,
        startDate: any,
        maxPeople: any,
        setNewEventView: any
    ): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + `user/place/${placeId}/newEvent`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ startDate, maxPeople }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "error",
                            message: "Nie udało się utworzyć wydarzenia",
                        })
                    );
                } else {
                    AppDispatch(getCurrentPlaceThunk(placeId, token));
                    setNewEventView(false);
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się utworzyć wydarzenie",
                        })
                    );
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
                    AppDispatch(getCurrentEventThunk(eventId,token))
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
                    AppDispatch(getCurrentEventThunk(eventId,token))
                }else{
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
