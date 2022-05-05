import { Navigate } from "react-router-dom";

interface RequireAuthProps {
    children: JSX.Element;
    token: string;
}

export function RequireAuth({token, children}: RequireAuthProps) {
    if (token) {
        return children;
    }
    return <Navigate replace to="/login" />;
}
