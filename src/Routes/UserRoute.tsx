import { Route } from "react-router-dom";
import RequireAuth from "Middleware/RequireAuth";

import {PagePremium, PageUserHome, PageAccount} from "Pages/index"
import { EventRoute } from "./EventRoute";

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
                        <Route
                key="account"
                path="account"
                element={
                    <RequireAuth>
                        <PageAccount />
                    </RequireAuth>
                }
            />
            {PlaceRoute()}
            {EventRoute()}
        </Route>,
    ];
    // return [{ PlaceRoute }];
}
