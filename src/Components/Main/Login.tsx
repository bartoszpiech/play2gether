import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { useAppDispatch } from "../../hooks";
import { loginUserThunk } from "../../Store/user-actions";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        dispatch(loginUserThunk(email, password, navigate));
    };

    return (
        <form onSubmit={formSubmitHandler} className="rounded-3 bg-white shadow-lg p-4">
            <h1 className="display-4 text-center">Logowanie</h1>
            <div className="mt-4">
                <label className="form-label mb-1">Email</label>
                <input
                    type="text"
                    className="form-control"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mt-3">
                <label className="form-label mb-1">Hasło</label>
                <input
                    type="password"
                    className="form-control mb-1"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <NavLink to="/register" className="link-secondary">
                    Play2Gether
                </NavLink>
            </div>

            <button type="submit" className="btn myBtn col-12 mt-4">
                Zaloguj się
            </button>

            {/* <button type="submit" className="btn myBtn col-12 mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Logowanie" : "Zaloguj się"}
            </button> */}
        </form>
    );
}

export default Login;
