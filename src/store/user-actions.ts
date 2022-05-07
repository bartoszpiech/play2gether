import { userActions } from "./user-slice";
import { uiActions } from "./ui-slice";

import { AnyAction } from "redux";
import { RootState } from "./index";
import { ThunkAction } from "redux-thunk";

import { AppDispatch } from "./index";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export const registerUserRequest = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    navigate: any
) => {
    return async (dispatch: any) => {
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
                        dispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: "Please fill all the fields correctly!",
                            })
                        );
                    } else if (response.status === 401) {
                        dispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: "Invalid email and password combination!",
                            })
                        );
                    } else if (response.status === 500) {
                        const data = await response.json();
                        dispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: data.message ? data.message : genericErrorMessage,
                            })
                        );
                    } else {
                        dispatch(
                            uiActions.showNotification({
                                open: true,
                                type: "error",
                                message: genericErrorMessage,
                            })
                        );
                    }
                } else {
                    const data = await response.json();
                    dispatch(
                        userActions.register({
                            token: data.token,
                        })
                    );
                    dispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się utworzyć konto",
                        })
                    );
                    // setUserContext((oldValues) => {
                    //     return { ...oldValues, token: data.token };
                    // });
                    navigate("/login", { replace: true });
                }
            })
            .catch((error) => {
                dispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: error,
                    })
                );
            });
    };
};

export const LoginUserRequest = (email: string, password: string, navigate: any) => {
    return async (dispatch: any) => {
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
                        dispatch(
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
                    dispatch(
                        userActions.login({
                            token: data.token,
                        })
                    );
                    dispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się zalogować",
                        })
                    );

                    // setUserContext((oldValues) => {
                    //     return { ...oldValues, token: data.token };
                    // });
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
};

// interface IAllAssets {
//     assets?: IAsset[];
//   }
// interface IAllAssetsDispatch {
//     dispatch: (arg: IAllAssets) => (IAllAssets)
//   }

export const RefreshTokenRequest = () => {
    return async (dispatch: any) => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                // setUserContext((oldValues) => {
                //     return { ...oldValues, token: data.token };
                // });
                dispatch(
                    userActions.register({
                        token: data.token,
                    })
                );
                dispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Automatyczne logowanie",
                    })
                );
                // navigate("/user/home");
            } else {
                dispatch(
                    userActions.register({
                        token: null,
                    })
                );
            }
        });
    };
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
                    userActions.register({
                        token: data.token,
                    })
                );
                AppDispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "success",
                        message: "Automatyczne logowanie",
                    })
                );
                navigate("/user/home");
            } else {
                AppDispatch(
                    userActions.register({
                        token: null,
                    })
                );
            }
        });
    };
