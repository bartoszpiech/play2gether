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
        <Route path="/user">
            <Route
                path="home"
                element={
                    <RequireAuth token={userContext.token}>
                        <UserHome />
                    </RequireAuth>
                }
            />
            ,
            <Route
                path="newPlace"
                element={
                    <RequireAuth token={userContext.token}>
                        <NewPlace />
                    </RequireAuth>
                }
            />
            ,
            <Route
                path="/user/place/:id"
                element={
                    <RequireAuth token={userContext.token}>
                        <Place />
                    </RequireAuth>
                }
            />
            ,
            <Route
                path="/user/premium"
                element={
                    <RequireAuth token={userContext.token}>
                        <Premium />
                    </RequireAuth>
                }
            />
            ,
        </Route>,
    ];
}
