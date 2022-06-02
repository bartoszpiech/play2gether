import { Route } from "react-router-dom";
import RequireAdmin from "Middleware/RequireAdmin";

import { PagePremium, PageAccount, PageAdminHome } from "Pages/index";

import { PlaceRoute } from "./PlaceRoute";

export function AdminRoute() {
    return [
        <Route key="/admin" path="/admin">
            <Route
                key="home"
                path="home"
                element={
                    <RequireAdmin>
                        <PageAdminHome />
                    </RequireAdmin>
                }
            />
            <Route
                key="premium"
                path="premium"
                element={
                    <RequireAdmin>
                        <PagePremium />
                    </RequireAdmin>
                }
            />
            <Route
                key="account"
                path="account"
                element={
                    <RequireAdmin>
                        <PageAccount />
                    </RequireAdmin>
                }
            />
            {PlaceRoute()}
        </Route>,
    ];
    // return [{ PlaceRoute }];
}
