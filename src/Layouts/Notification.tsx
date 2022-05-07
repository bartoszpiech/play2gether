import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={15} ref={ref} variant="filled" {...props} />;
});

interface NotificationProps {
    type: "success" | "info" | "warning" | "error" | undefined;
    message?: string;
}

const Notification = ({ type, message }: NotificationProps) => {
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(
            uiActions.showNotification({
                open: false,
            })
        );
    };

    return (
        <>
            <Snackbar
                className="mb-5"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={true}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Notification;
