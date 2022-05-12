import { Route } from "react-router-dom";

import RequireAuth from "Middleware/RequireAuth";

import { PageEvent } from "Pages";


export function EventRoute() {
    return [
        <Route key="event" path="event">
            <Route
                key=":eventId"
                path=":eventId"
                element={
                    <RequireAuth>
                        <PageEvent />
                    </RequireAuth>
                }
            />
        </Route>,
    ];
}
