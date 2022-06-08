import { useAppSelector } from "hooks";
import { useState } from "react";
import EditAccount from "./EditAccount";

function Account() {
    const [editVisible, setEditVisible] = useState(false);

    const account = useAppSelector((state) => state.user.account);

    return (
        <div className="container-fluid d-flex flex-column rounded-3 shadow my-xl-5 my-0 p-5">
            <h1 className="display-1 text-center">Konto</h1>

            {editVisible ? (
                <EditAccount setEditVisible={setEditVisible} />
            ) : (
                <>
                    <div
                        className="flex-grow-1"
                        style={{
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPositionX: "center",
                            backgroundPositionY: "center",
                            backgroundImage: `url(${account?.image.url})`,
                        }}
                    />

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

export default Account;
