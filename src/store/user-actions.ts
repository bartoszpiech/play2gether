import { userActions } from "./user-slice";
import { uiActions } from "./ui-slice";

import type { AppDispatch } from "./index";
import { useNavigate } from "react-router-dom";

export const registerUserRequest = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    navigate: any
) => {
    return async (dispatch: AppDispatch) => {
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
                    navigate("/login");
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
