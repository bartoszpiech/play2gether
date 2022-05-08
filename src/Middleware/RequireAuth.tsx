import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "Store";

function RequireAuth({children}:{children: JSX.Element}) {
    const token = useSelector((state: RootState) => state.user.token);

    if (token) {
        return children;
    }
    return <Navigate replace to="/login" />;
}

export default RequireAuth
