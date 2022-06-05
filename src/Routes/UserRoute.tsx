import { Route } from "react-router-dom";
import RequireUser from "Middleware/RequireUser";

import { PagePremium, PageUserHome, PageAccount } from "Pages/index";

import { UserPlaceRoute } from "./UserPlaceRoute";

export function UserRoute() {
    return [
        <Route key="/user" path="/user">
            <Route
                key="home"
                path="home"
                element={
                    <RequireUser>
                        <PageUserHome />
                    </RequireUser>
                }
            />
            <Route
                key="premium"
                path="premium"
                element={
                    <RequireUser>
                        <PagePremium />
                    </RequireUser>
                }
            />
            <Route
                key="account"
                path="account"
                element={
                    <RequireUser>
                        <PageAccount />
                    </RequireUser>
                }
            />
            {UserPlaceRoute()}
        </Route>,
    ];
    // return [{ PlaceRoute }];
}
