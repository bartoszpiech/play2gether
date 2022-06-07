import { Route } from "react-router-dom";

import { PageNewPlace, PagePlaceReview } from "Pages";
import RequireAdmin from "Middleware/RequireAdmin";


export function AdminPlaceRoute() {
    return [
        <Route key="place" path="place">
            <Route
                key="newPlace"
                path="newPlace"
                element={
                    <RequireAdmin>
                        <PageNewPlace />
                    </RequireAdmin>
                }
            />
            ,
            <Route
                key=":placeId"
                path=":placeId"
                element={
                    <RequireAdmin>
                        <PagePlaceReview />
                    </RequireAdmin>
                }
            />
        </Route>,
    ];
}
