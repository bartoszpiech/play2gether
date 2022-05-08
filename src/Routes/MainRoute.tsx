import { Route, Navigate } from "react-router-dom";

import {PageRegister, PageLogin, PageHome} from "Pages/index"

export function MainRoute() {
    return [
        <Route key="/" path="/" element={<Navigate replace to="/home" />} />,
        <Route key="/home" path="/home" element={<PageHome />} />,
        <Route key="/register" path="/register" element={<PageRegister />} />,
        <Route key="/login" path="/login" element={<PageLogin />} />,
    ];
}
