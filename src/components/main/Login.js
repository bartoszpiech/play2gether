import React, { useState, useContext } from "react";

import { UserContext } from "../../Context/UserContext";
import Flash from "../Flash";

import { NavLink, useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);

    let navigate = useNavigate();

    const handleOnClick = () => {
        setErrorVisible(false);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const genericErrorMessage = "Nie udało się zalogować Spróbuj później";

        fetch(process.env.REACT_APP_API_ENDPOINT + "login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }),
        })
            .then(async (response) => {
                setIsSubmitting(false);
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!");
                    } else if (response.status === 401) {
                        setError("Invalid email and password combination.");
                    } else {
                        setError(genericErrorMessage);
                    }
                    setErrorVisible(true);
                } else {
                    const data = await response.json();
                    setUserContext((oldValues) => {
                        return { ...oldValues, token: data.token };
                    });
                    navigate("/user/home", { replace: true });
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                setError(genericErrorMessage);
                setErrorVisible(true);
            });
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
                    className="form-control"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <NavLink to="/register" className="link-secondary">
                    Play2Gether
                </NavLink>
            </div>

            <button type="submit" className="btn btn-secondary col-12 mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Logowanie" : "Zaloguj się"}
            </button>
        </form>
    );
};

export default Login;
