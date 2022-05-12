import { Route } from "react-router-dom";

import RequireAuth from "Middleware/RequireAuth";


import { PageNewPlace, PagePlace } from "Pages";


export function PlaceRoute() {
    return [
        <Route key="place" path="place">
            <Route
                key="newPlace"
                path="newPlace"
                element={
                    <RequireAuth>
                        <PageNewPlace />
                    </RequireAuth>
                }
            />
            ,
            <Route
                key=":placeId"
                path=":placeId"
                element={
                    <RequireAuth>
                        <PagePlace />
                    </RequireAuth>
                }
            />
        </Route>,
    ];
}
