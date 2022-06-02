import { Navigate } from "react-router-dom";

import { RootState } from "Store";
import { useAppSelector } from "hooks";

function RequireAdmin({ children }: { children: JSX.Element }) {
    const token = useAppSelector((state) => state.user.token);
    const user = useAppSelector((state) => state.user.account);

    if (user) {
        if (token && user.type == "admin") {
            return children;
        }
    }
    return <Navigate replace to="/login" />;
}

export default RequireAdmin;
