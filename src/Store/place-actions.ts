import { AppThunk } from ".";
import { placeActions } from "./place-slice";
import { uiActions } from "./ui-slice";

export const newPlaceThunk =
    (
        name: string,
        description: string,
        sports: string[],
        marker: any,
        images: any,
        navigate: any,
        token: string | null
    ): AppThunk =>
    async (AppDispatch) => {
        AppDispatch(
            uiActions.showNotification({
                open: true,
                type: "success",
                message: "Miejsce wysłane proszę czekać...",
            })
        );
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/newPlace", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description, sports, location: marker, data: images }),
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
                        message: "Nie udało się pobrać wszystkich miejsc",
                    })
                );
            }
        });
    };

export const getAllInactivePlacesThunk =
    (token?: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/getInactivePlaces", {
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
                        message: "Nie udało się pobrać nieaktywnych miejsc",
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
                console.log(data);
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
        sport: any,
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
            body: JSON.stringify({ startDate, maxPeople, sport }),
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

export const searchEngineThunk =
    (
        places: any | null,
        sports: string[],
        placesAvailable: number,
        fromDate: Date | null,
        toDate: Date | null,
        showAllPlaces: boolean
    ): AppThunk =>
    async (AppDispatch) => {
        let selectedPlaces = places?.filter((place: any) => {
            let placeCoby = { ...place };

            if (sports.length !== 0) {
                placeCoby.events = place.events.filter((event: any) => {
                    for (let i = 0; i < sports.length; i++) {
                        if (sports[i] === event.sport) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            placeCoby.events = placeCoby.events.filter((event: any) => {
                if (event.maxSignedUp) {
                    let eventAvailable = event.maxSignedUp - event.signedUp.length;

                    if (placesAvailable > eventAvailable) return false;

                    return true;
                }
                return true;
            });

            placeCoby.events = placeCoby.events.filter((event: any) => {
                if (new Date(event.date) >= fromDate!) {
                    if (toDate === null || new Date(event.date) <= toDate!) {
                        return true;
                    }
                }
                return false;
            });

            if (placeCoby.events.length === 0) return false;

            return true;
        });

        console.log(selectedPlaces);

        if (showAllPlaces) {
            AppDispatch(placeActions.setSelectedPlaces(places));
        } else {
            AppDispatch(placeActions.setSelectedPlaces(selectedPlaces));
        }
    };

export const adminAcceptedPlaceThunk =
    (
        id: string | undefined,
        name: string,
        description: string,
        sports: string[],
        marker: any,
        navigate: any,
        token: string | null
    ): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/acceptedPlace", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id, name, description, sports, location: marker }),
        }).then(async (response) => {
            if (response.ok) {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Udało się akceptować miejsce",
                    })
                );
                navigate("/admin/home", { replace: true });
            } else {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Nie udało się akceptować miejsca",
                    })
                );
            }
        });
    };

export const adminDeniedPlaceThunk =
    (id: string | undefined, navigate: any, token: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/deniedPlace", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
        }).then(async (response) => {
            if (response.ok) {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Udało się usunąć miejsce",
                    })
                );
                navigate("/admin/home", { replace: true });
            } else {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Nie udało się usunąć miejsca",
                    })
                );
            }
        });
    };
