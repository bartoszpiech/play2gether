import React, { useState } from "react";
import { useAppSelector } from "../../hooks";

interface EditAccountProps {
    setEditVisible: any;
}

function EditAccount(props: EditAccountProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const account = useAppSelector((state) => state.user.account);

    const formSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        // dispatch(registerUserThunk(firstName, lastName, email, password, navigate));
    };

    return (
        <div className="d-flex flex-column h-100">
            <div className="row flex-grow-1 mb-3">
                <div className="col-xl-6 col-12 d-flex flex-column">
                    <form onSubmit={formSubmitHandler}>
                        <div className="mt-3">
                            <label className="form-label mb-1">Imię</label>
                            <input
                                className="form-control"
                                type="text"
                                autoComplete="given-name"
                                placeholder={account?.firstName}
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
                                placeholder={account?.lastName}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn myBtn col-12 mt-4">
                            Edytuj Dane
                        </button>
                    </form>
                    <div className="flex-grow-1 bg-black mt-3">
                        <img
                            src={require("../../Assets/Images/dzik.jpeg")}
                            className="mainImage"
                            alt="elo"
                        />
                    </div>
                    <form
                        action="/patient/account/photo"
                        method="post"
                        encType="multipart/form-data"
                    >
                        <input
                            className="form-control"
                            type="file"
                            id="image"
                            name="image"
                            required
                        />
                        <button className="btn myBtn col-12">Ustaw zdjęcie</button>
                    </form>
                </div>
                <div className="col-xl-6 col-12">
                    <form onSubmit={formSubmitHandler}>
                        <div className="mt-3">
                            <label className="form-label mb-1">Aktualne Hasło</label>
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
                            <label className="form-label mb-1">Nowe Hasło</label>
                            <input
                                type="password"
                                className="form-control"
                                value={newPassword}
                                autoComplete="new-password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-3">
                            <label className="form-label mb-1">Potwierdzenie Hasła</label>
                            <input
                                type="password"
                                className="form-control"
                                autoComplete="new-password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                            <div className="form-text">Hasła muszą być takie same.</div>
                        </div>

                        <button type="submit" className="btn myBtn col-12 mt-4">
                            Nowe hasło
                        </button>
                    </form>
                </div>
            </div>
            <div onClick={() => props.setEditVisible(false)} className="btn myBtn mt-auto">
                Anuluj
            </div>
        </div>
    );
}

export default EditAccount;
