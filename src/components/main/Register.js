import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Flash from "../Flash";

import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

        fetch(process.env.REACT_APP_API_ENDPOINT + "register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, username: email, password }),
        })
            .then(async (response) => {
                setIsSubmitting(false);
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!");
                        setErrorVisible(true);
                    } else if (response.status === 401) {
                        setError("Invalid email and password combination.");
                        setErrorVisible(true);
                    } else if (response.status === 500) {
                        const data = await response.json();
                        if (data.message) setError(data.message || genericErrorMessage);
                        setErrorVisible(true);
                    } else {
                        setError(genericErrorMessage);
                        setErrorVisible(true);
                    }
                } else {
                    const data = await response.json();
                    setUserContext((oldValues) => {
                        return { ...oldValues, token: data.token };
                    });
                    navigate("/home", { replace: true });
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                setError(genericErrorMessage);
            });
    };

    return (
        <>
            {errorVisible && (
                <Flash text={error} status="fail" handleOnClick={handleOnClick}></Flash>
            )}
            <div className="row mt-xl-5 mt-1 mx-0">
                <div className="col-xl-4 offset-xl-4 col-12 offset-0 rounded-3 shadow bg-white p-4">
                    <form onSubmit={formSubmitHandler}>
                        <h1 className="display-4 text-center mt-1">Stwórz konto</h1>

                        <div className="mt-4">
                            <label className="form-label mb-1">Adres email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1">Imię</label>
                            <input
                                className="form-control"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1">Nazwisko</label>
                            <input
                                className="form-control"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1">Wiek</label>
                            <input
                                className="form-control"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1">Hasło</label>
                            <input
                                type="password"
                                className="form-control"
                                aria-describedby="passwordHelpBlock"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* <div class="form-text">
                            Hasło musi zawierać 8-20 znaków, nie może zawierać spacji, znaków
                            specjalnych, oraz emoji.
                        </div> */}
                        </div>

                        <div className="mt-3">
                            <label className="form-label mb-1">Potwierdzenie Hasła</label>
                            <input
                                type="password"
                                className="form-control"
                                aria-describedby="passwordHelpBlock"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <div className="form-text">Hasła muszą być takie same.</div>
                        </div>

                        {/* <button type="submit" className="btn btn-secondary col-12 mt-4">
                            Załóż konto
                        </button> */}
                        <button type="submit" className="btn btn-secondary col-12 mt-4" disabled={isSubmitting}>
                        {isSubmitting ? "Rejestruje" : "Załóż konto"}
                    </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
