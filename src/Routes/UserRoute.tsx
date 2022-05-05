import { Route } from "react-router-dom";

import React, { useContext } from "react";

import { RequireAuth } from "../Middleware/RequireAuth";

import { UserContext } from "../Context/UserContext";

import UserHome from "../Components/User/UserHome";
import NewPlace from "../Components/place/NewPlace";
import Place from "../Components/place/Place";
import Premium from "../Components/User/Premium";

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
            ,
            <Route
                key="newPlace"
                path="newPlace"
                element={
                    <RequireAuth token={userContext.token}>
                        <NewPlace />
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
            ,
            <Route
                key="place/:id"
                path="place/:id"
                element={
                    <RequireAuth token={userContext.token}>
                        <Place />
                    </RequireAuth>
                }
            />
            ,
        </Route>,
    ];
}
