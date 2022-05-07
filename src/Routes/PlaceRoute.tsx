import { Route } from "react-router-dom";

import RequireAuth from "../Middleware/RequireAuth";

import NewPlace from "../Components/Place/NewPlace";
import Place from "../Components/Place/Place";

export function PlaceRoute() {
    return [
        <Route key="place" path="place">
            <Route
                key="newPlace"
                path="newPlace"
                element={
                    <RequireAuth>
                        <NewPlace />
                    </RequireAuth>
                }
            />
            ,
            <Route
                key="/place/:id"
                path=":id"
                element={
                    <RequireAuth>
                        <Place />
                    </RequireAuth>
                }
            />
        </Route>,
    ];
}
