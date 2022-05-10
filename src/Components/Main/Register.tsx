import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks";

import { registerUserThunk } from "../../Store/user-actions";

const Register = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        dispatch(registerUserThunk(firstName, lastName, email, password, navigate));
    };

    return (
        <form onSubmit={formSubmitHandler} className="rounded-3 bg-white shadow-lg p-4">
            <h1 className="display-4 text-center mt-1">Stwórz konto</h1>
            <div className="mt-4">
                <label className="form-label mb-1">Adres email</label>
                <input
                    type="email"
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
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="mt-3">
                <label className="form-label mb-1">Potwierdzenie Hasła</label>
                <input
                    type="password"
                    className="form-control"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className="form-text">Hasła muszą być takie same.</div>
            </div>

            <div className="mt-3">
                <label className="form-label mb-1">Imię</label>
                <input
                    className="form-control"
                    type="text"
                    autoComplete="given-name"
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
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn myBtn col-12 mt-4">
                Załóż konto
            </button>
        </form>
    );
};

export default Register;
