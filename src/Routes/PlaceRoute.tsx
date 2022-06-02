import { Route } from "react-router-dom";

import RequireUser from "Middleware/RequireUser";


import { PageNewPlace, PagePlace } from "Pages";


export function PlaceRoute() {
    return [
        <Route key="place" path="place">
            <Route
                key="newPlace"
                path="newPlace"
                element={
                    <RequireUser>
                        <PageNewPlace />
                    </RequireUser>
                }
            />
            ,
            <Route
                key=":placeId"
                path=":placeId"
                element={
                    <RequireUser>
                        <PagePlace />
                    </RequireUser>
                }
            />
        </Route>,
    ];
}
