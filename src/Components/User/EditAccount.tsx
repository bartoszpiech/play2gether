import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { uiActions } from "../../Store/ui-slice";
import { getUserDateThunk, sendUserImageThunk, updateUserThunk } from "../../Store/user-actions";
import { userActions } from "../../Store/user-slice";

interface EditAccountProps {
    setEditVisible: any;
}

function EditAccount(props: EditAccountProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState("");
    const [previewSource, setPreviewSource]: any = useState();

    const account = useAppSelector((state) => state.user.account);
    const token = useAppSelector((state) => state.user.token);

    const dispatch = useAppDispatch();

    const handleSubmitUpdateUser = (event: React.SyntheticEvent) => {
        event.preventDefault();

        dispatch(updateUserThunk(firstName, lastName, token));
    };

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e: any) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            dispatch(sendUserImageThunk(reader.result, token));
        };
        reader.onerror = () => {
            dispatch(
                uiActions.showNotification({
                    open: true,
                    type: "error",
                    message: "Błąd wczytania zdjęcia",
                })
            );
        };
    };

    return (
        <div className="d-flex flex-column h-100">
            <div className="row flex-grow-1 mb-3">
                <div className="col-xl-6 col-12 d-flex flex-column">
                    <form onSubmit={handleSubmitUpdateUser}>
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
                    <div className="align-self-center bg-black mt-3">
                        <img src={previewSource} className="mainImage userNewImage" alt="elo" />
                    </div>
                    <form onSubmit={handleSubmitFile} encType="multipart/form-data">
                        <input
                            id="fileInput"
                            type="file"
                            name="image"
                            className="form-control"
                            value={fileInputState}
                            onChange={handleFileInputChange}
                            required
                        />
                        <button className="btn myBtn col-12">Ustaw zdjęcie</button>
                    </form>
                </div>
                <div className="col-xl-6 col-12">
                    <form onSubmit={handleSubmitUpdateUser}>
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

                        <button disabled type="submit" className="btn myBtn col-12 mt-4">
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
