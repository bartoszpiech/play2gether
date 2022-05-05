import React, { useCallback, useContext, useEffect, useState } from "react";

import "./Assets/Styles/App.css"

import Navbar from "./Layouts/Navbar/Navbar";
import SearchBox from "./components/SearchBox/SearchBox";
import Footer from "./Layouts/Footer";
import Register from "./components/main/Register";
import Login from "./components/main/Login";
import NewPlace from "./components/place/NewPlace";
import Place from "./components/place/Place";
import Home from "./components/main/Home";
import Premium from "./components/user/Premium";

import UserHome from "./components/user/UserHome";

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import { UserContext } from "./context/UserContext";
import { AnyRecord } from "dns";

function App() {
    const [userContext, setUserContext]: any = useContext(UserContext);

    function RequireAuth({ children, redirectTo }: any) {
        console.log(children.props);
        if (userContext.token) {
            return children;
        }
        return <Navigate to={redirectTo} />;
    }

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

    const logoutHandler = () => {
        console.log("wylogowuje")
        fetch(process.env.REACT_APP_API_ENDPOINT + "logout", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async (response) => {
            setUserContext((oldValues:any) => {
                return { ...oldValues, details: undefined, token: null };
            });
            window.localStorage.setItem("logout", Date.now().toString());
        });
    };

    return (
        <Router>
            <Navbar title="PLAY2GETHER" icon="fa-solid fa-volleyball" logoutHandler={logoutHandler}></Navbar>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/user/home"
                    element={
                        <RequireAuth redirectTo="/login">
                            <UserHome />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/user/newPlace"
                    element={
                        <RequireAuth redirectTo="/login">
                            <NewPlace />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/user/place/:id"
                    element={
                        <RequireAuth redirectTo="/login">
                            <Place />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/user/premium"
                    element={
                        <RequireAuth redirectTo="/login">
                            <Premium />
                        </RequireAuth>
                    }
                />
            </Routes>
            
            <Footer creatorName="Play2Gether inc."/>
        </Router>

        // <div className="App">
        //     <Navbar title="PLAY2GETHER" icon="fa-solid fa-volleyball"/>
        //     <SearchBox title="Wyszukaj"/>
        //     <div className="map" style={{textAlign: "center", height: "1000px", backgroundColor: "green", float: "left", width: "55%"}}>
        //         Mapa
        //     </div>
        //     <div className="ad" style={{textAlign: "center", height: "1000px", backgroundColor: "red", float: "left", width: "20%"}}>
        //         Miejsce na twoją reklamę
        //     </div>
        //     <Footer creatorName="Play2Gether inc."/>
        // </div>
    );
}

export default App;
