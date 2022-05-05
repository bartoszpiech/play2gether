import { Route } from "react-router-dom";

import React, { useContext } from "react";

import { RequireAuth } from "../Middleware/RequireAuth";

import { UserContext } from "../Context/UserContext";

import NewPlace from "../Components/place/NewPlace";
import Place from "../Components/place/Place";

export function PlaceRoute() {
    const [userContext, setUserContext]: any = useContext(UserContext);

    return [
        <Route key="place" path="place">
            <Route
                key="newPlace"
                path="newPlace"
                element={
                    <RequireAuth token={userContext.token}>
                        <NewPlace />
                    </RequireAuth>
                }
            />
            ,
            <Route
                key="/place/:id"
                path=":id"
                element={
                    <RequireAuth token={userContext.token}>
                        <Place />
                    </RequireAuth>
                }
            />
        </Route>,
    ];
}
