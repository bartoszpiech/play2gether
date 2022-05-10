import { userActions } from "./user-slice";
import { uiActions } from "./ui-slice";

import { AnyAction } from "redux";
import { RootState } from "./index";
import { ThunkAction } from "redux-thunk";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export const registerUserThunk =
    (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        navigate: any
    ): AppThunk =>
    async (AppDispatch) => {
        const genericErrorMessage = "Nie udało się. Spróbuj później";

        fetch(process.env.REACT_APP_API_ENDPOINT + "register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, username: email, password }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    if (response.status === 400) {
                        AppDispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: "Please fill all the fields correctly!",
                            })
                        );
                    } else if (response.status === 401) {
                        AppDispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: "Invalid email and password combination!",
                            })
                        );
                    } else if (response.status === 500) {
                        const data = await response.json();
                        AppDispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: data.message ? data.message : genericErrorMessage,
                            })
                        );
                    } else {
                        AppDispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: genericErrorMessage,
                            })
                        );
                    }
                } else {
                    const data = await response.json();
                    AppDispatch(
                        userActions.login({
                            token: data.token,
                            account: data.user,
                        })
                    );
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się utworzyć konto",
                        })
                    );
                    navigate("/user/home", { replace: true });
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: error,
                    })
                );
            });
    };

export const loginUserThunk =
    (email: string, password: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        const genericErrorMessage = "Nie udało się Spróbuj później";

        fetch(process.env.REACT_APP_API_ENDPOINT + "login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    if (response.status === 400) {
                        AppDispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: "Please fill all the fields correctly!",
                            })
                        );
                    } else if (response.status === 401) {
                        uiActions.showNotification({
                            open: true,
                            type: "error",
                            message: "Invalid email and password combination.",
                        });
                    } else {
                        uiActions.showNotification({
                            open: true,
                            type: "error",
                            message: genericErrorMessage,
                        });
                    }
                } else {
                    const data = await response.json();
                    AppDispatch(
                        userActions.login({
                            token: data.token,
                            account: data.user,
                        })
                    );
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się zalogować",
                        })
                    );
                    navigate("/user/home", { replace: true });
                }
            })
            .catch((error) => {
                uiActions.showNotification({
                    open: true,
                    type: "error",
                    message: error,
                });
            });
    };

export const refreshTokenThunk =
    (navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                AppDispatch(
                    userActions.login({
                        token: data.token,
                        account: data.user,
                    })
                );
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Sesja aktywna",
                    })
                );
                navigate("/user/home");
            } else {
                AppDispatch(userActions.logout());
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Sesja nieaktywna",
                    })
                );
            }
        });
    };

export const updateUserThunk =
    (firstName: string, lastName: string, token: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/account", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ firstName, lastName }),
        }).then(async (response) => {
            if (response.ok) {
                // const data = await response.json();
                // AppDispatch(
                //     userActions.updateUser({
                //         account: data,
                //     })
                // );
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Dane zaktualizowane",
                    })
                );
                AppDispatch(getUserDateThunk(token));
            } else {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Nie udało się zaktualizować danych",
                    })
                );
            }
        });
    };

export const sendUserImageThunk =
    (base64EncodedImage: any, token: string | null): AppThunk =>
    async (AppDispatch) => {
        AppDispatch(
            uiActions.showNotification({
                open: true,
                type: "success",
                message: "Wysyłam zdjęcie",
            })
        );
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/accountImage", {
            method: "POST",
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }).then(async (response) => {
            if (response.ok) {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Udało się zaktualizować zdjęcie",
                    })
                );
                AppDispatch(getUserDateThunk(token));
            } else {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Nie udało się zaktualizować zdjęcie",
                    })
                );
            }
        });
    };

export const getUserDateThunk =
    (token: string | null): AppThunk =>
    async (AppDispatch) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "getUser", {
            method: "GET",
            credentials: "include",
            // Pass authentication token as bearer token in header
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                AppDispatch(
                    userActions.updateUser({
                        account: data,
                    })
                );
            } else {
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Nie udało się pobrać danych",
                    })
                );
            }
        });
    };
