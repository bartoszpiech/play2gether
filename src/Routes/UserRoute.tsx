import { Route } from "react-router-dom";
import RequireAuth from "../Middleware/RequireAuth";

import UserHome from "../Components/User/UserHome";
import Premium from "../Components/User/Premium";

import {PageUserHome} from "../Pages/index"

import { PlaceRoute } from "./PlaceRoute";

export function UserRoute() {
    return [
        <Route key="/user" path="/user">
            <Route
                key="home"
                path="home"
                element={
                    <RequireAuth>
                        <PageUserHome />
                    </RequireAuth>
                }
            />
            <Route
                key="premium"
                path="premium"
                element={
                    <RequireAuth>
                        <Premium />
                    </RequireAuth>
                }
            />
            {PlaceRoute()}
        </Route>,
    ];
    // return [{ PlaceRoute }];
}
