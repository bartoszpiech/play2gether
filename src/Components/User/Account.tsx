import React, { useState } from "react";
import { useAppSelector } from "../../hooks";

import EditAccount from "./EditAccount";

function Account() {
    const [editVisible, setEditVisible] = useState(false);

    const account = useAppSelector((state) => state.user.account);

    return (
        <div className="d-flex flex-column h-100 p-3 shadow-lg">
            <h1 className="display-1 text-center">Konto</h1>

            {editVisible ? (
                <EditAccount setEditVisible={setEditVisible} />
            ) : (
                <>
                    <div className="flex-grow-1 bg-black mx-5">
                        <img
                            src={require("../../Assets/Images/dzik.jpeg")}
                            className="mainImage"
                            alt="elo"
                        />
                    </div>

                    <ul className="list-group list-group-horizontal mt-3 mb-1">
                        <div className="col-4 list-group-item">Imię</div>
                        <div className="col-8 list-group-item text-center">
                            {account?.firstName}
                        </div>
                    </ul>
                    <ul className="list-group list-group-horizontal my-1 mb-3">
                        <div className="col-4 list-group-item">Nazwisko</div>
                        <div className="col-8 list-group-item text-center">{account?.lastName}</div>
                    </ul>

                    <div className="d-grid gap-2 mt-auto">
                        <button
                            className="btn myBtn"
                            type="button"
                            onClick={() => setEditVisible(!editVisible)}
                        >
                            Zmień dane konta
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

/* <div className="col-xl col-12">
                    <img
                        src={require("../../Assets/Images/dzik.jpeg")}
                        className="img-fluid imageSizeAccount rounded-3"
                    />
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
                        <button disabled className="btn btn-secondary col-12">
                            Ustaw zdjęcie
                        </button>
                    </form>
                </div> */

export default Account;
