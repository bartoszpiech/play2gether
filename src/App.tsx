import "./Assets/Styles/App.css";

import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "Layouts/Navbar/Navbar";
import Footer from "Layouts/Footer";
import Notification from "Layouts/Notification";

import { MainRoute } from "Routes/MainRoute";
import { UserRoute } from "Routes/UserRoute";

import { PageNotFound } from "Pages/index";

import { useSelector } from "react-redux";
import { RootState } from "Store";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "hooks";
import { refreshTokenThunk } from "Store/user-actions";

function App() {
    const notification = useSelector((state: RootState) => state.ui.notification);
    const token = useSelector((state: RootState) => state.user.token);

    let dispatch = useAppDispatch();
    const navigate = useNavigate();

    const verifyUser = useCallback(() => {
        dispatch(refreshTokenThunk(navigate));

        // call refreshToken every 5 minutes to renew the authentication token.
        setTimeout(verifyUser, 15 * 60 * 1000);
    }, [dispatch, navigate]);

    useEffect(() => {
        if (!token) verifyUser();
    }, [token, verifyUser]);

    return (
        <>
            <Navbar title="PLAY2GETHER" icon="fa-solid fa-volleyball"></Navbar>
            {notification.open && (
                <Notification type={notification.type} message={notification.message} />
            )}
            <Routes>
                {MainRoute()}
                {UserRoute()}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer creatorName="Play2Gether inc." />
        </>
    );
}

export default App;
