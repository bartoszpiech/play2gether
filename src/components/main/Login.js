import { useState, useContext } from "react";

import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import { UserContext } from "../../Context/UserContext";
import { LoginUserRequest } from "../../store/user-actions";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(LoginUserRequest(email, password, navigate));
    };

    return (
        <form onSubmit={formSubmitHandler} className="rounded-3 bg-white shadow p-4">
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
