import { Route } from "react-router-dom";
import RequireAdmin from "Middleware/RequireAdmin";

import { PagePremium, PageAccount, PageAdminHome } from "Pages/index";
import { AdminPlaceRoute } from "./AdminPlaceRoute";

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
                key="account"
                path="account"
                element={
                    <RequireAdmin>
                        <PageAccount />
                    </RequireAdmin>
                }
            />
            {AdminPlaceRoute()}
        </Route>,
    ];
    // return [{ PlaceRoute }];
}
