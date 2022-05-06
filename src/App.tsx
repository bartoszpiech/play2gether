import "./Assets/Styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Layouts/Navbar/Navbar";
import Footer from "./Layouts/Footer";
import Notification from "./Components/Notification";

import { MainRoute } from "./Routes/MainRoute";
import { UserRoute } from "./Routes/UserRoute";

import { PageNotFound } from "./Pages/index";

import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { Button, Dialog, Alert, AlertTitle, Snackbar, SnackbarContent } from "@mui/material";

function App() {  
    const notification = useSelector((state: any) => state.ui.notification);
    
    return (
        <Router>
            <Navbar title="PLAY2GETHER" icon="fa-solid fa-volleyball"></Navbar>
            {notification.open && <Notification type={notification.type} message={notification.message}/>}
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
