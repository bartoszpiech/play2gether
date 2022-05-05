import { Route } from "react-router-dom";

import React, { useContext } from "react";

import { RequireAuth } from "../Middleware/RequireAuth";

import { UserContext } from "../Context/UserContext";

import UserHome from "../Components/User/UserHome";
import NewPlace from "../Components/place/NewPlace";
import Place from "../Components/place/Place";
import Premium from "../Components/User/Premium";

import { PlaceRoute } from "./PlaceRoute";

export function UserRoute() {
    const [userContext, setUserContext]: any = useContext(UserContext);

    return [
        <Route key="/user" path="/user">
            <Route
                key="home"
                path="home"
                element={
                    <RequireAuth token={userContext.token}>
                        <UserHome />
                    </RequireAuth>
                }
            />
            <Route
                key="premium"
                path="premium"
                element={
                    <RequireAuth token={userContext.token}>
                        <Premium />
                    </RequireAuth>
                }
            />
            {PlaceRoute()}
        </Route>,
    ];
    // return [{ PlaceRoute }];
}
