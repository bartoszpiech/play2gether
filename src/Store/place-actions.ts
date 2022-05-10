import { AppThunk } from ".";
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
