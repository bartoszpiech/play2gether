import { Route } from "react-router-dom";

import RequireAuth from "../Middleware/RequireAuth";

import NewPlace from "../Components/Place/NewPlace";
import Place from "../Components/Place/Place";

import { PageNewPlace } from "../Pages";


export function PlaceRoute() {
    return [
        <Route key="place" path="">
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
