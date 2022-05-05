import { Route, Navigate } from "react-router-dom";

import Home from "../Components/Main/Home";
import Register from "../Components/Main/Register";
import Login from "../Components/Main/Login";

export function MainRoute() {
    return [
        <Route key="/" path="/" element={<Navigate replace to="/home" />} />,
        <Route key="/home" path="/home" element={<Home />} />,
        <Route key="/register" path="/register" element={<Register />} />,
        <Route key="/login" path="/login" element={<Login />} />,
    ];
}