import React, { useCallback, useContext, useEffect, useState } from "react";

import "./Assets/Styles/App.css";

import Navbar from "./Layouts/Navbar/Navbar";
import SearchBox from "./Components/SearchBox/SearchBox";
import Footer from "./Layouts/Footer";
import Register from "./Components/Main/Register";
import Login from "./Components/Main/Home";
import NewPlace from "./Components/place/NewPlace";
import Place from "./Components/place/Place";
import Home from "./Components/Main/Home";
import Premium from "./Components/User/Premium";

import UserHome from "./Components/User/UserHome";

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import { UserContext } from "./Context/UserContext";

// import MainRoute from "./Routes/MainRoute";
import { MainRoute } from "./Routes/MainRoute";
import { UserRoute } from "./Routes/UserRoute";

import { PageNotFound } from "./Pages/index";

function App() {
    const [userContext, setUserContext]: any = useContext(UserContext);

    const syncLogout = useCallback((event: any) => {
        if (event.key === "logout") {
            // If using react-router-dom, you may call history.push("/")
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        window.addEventListener("storage", syncLogout);
        return () => {
            window.removeEventListener("storage", syncLogout);
        };
    }, [syncLogout]);


    return (
        <Router>
            <Navbar
                title="PLAY2GETHER"
                icon="fa-solid fa-volleyball"
            ></Navbar>
            <Routes>
                {MainRoute()}
                {UserRoute()}
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Footer creatorName="Play2Gether inc." />
        </Router>
    );
}

export default App;
