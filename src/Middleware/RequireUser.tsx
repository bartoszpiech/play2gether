import { Navigate } from "react-router-dom";

import {  useAppSelector } from "hooks";
import { RootState } from "Store";

function RequireUser({ children }: { children: JSX.Element }) {
    const token = useAppSelector((state: RootState) => state.user.token);
    const user = useAppSelector((state) => state.user.account);

    if (user) {
        if ((token && user.type == "user") || user.type == "premium") {
            return children;
        }
    }
    return <Navigate replace to="/login" />;
}

export default RequireUser;
