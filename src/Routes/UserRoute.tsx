import { Route } from "react-router-dom";
import RequireAuth from "../Middleware/RequireAuth";

import {PagePremium, PageUserHome} from "../Pages/index"

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
                        <PagePremium />
                    </RequireAuth>
                }
            />
            {PlaceRoute()}
        </Route>,
    ];
    // return [{ PlaceRoute }];
}
