import React, { useCallback, useContext, useEffect } from "react";

const Premium = () => {
    return (
        <div className="row mt-xl-5 mt-1 mx-0">
            {/* <div className="col-xl-2 col-12 offset-0 rounded-3 shadow bg-white p-4 shadow-lg"></div> */}
            <div className="col-xl-4 col-12 offset-xl-4 offset-0 p-5 shadow-lg">
                {/* <UserHomeMap/> */}
                <h1 className="display-1 pb-5 mb-5 text-center">Premium</h1>

                {/* <h4 className="mt-5 ">Korzyści</h4> */}

                <h4 className="mt-5 pb-2 border-bottom text-center">Brak reklam</h4>

                <h4 className="mt-5 pb-2 border-bottom text-center">
                    Dostęp do limitowanych miejsc
                </h4>
                <h4 className="mt-5 pb-2 rainbow-text border-bottom text-center">
                    Kolorowy nickname
                </h4>

                <h5 className="mt-5 pt-5 text-center">Już od 9.99 zł miesięcznie</h5>

                <div class="d-grid gap-2 mt-4">
                    <button class="btn btn-primary myBtn" type="button">
                        Kup
                    </button>
                </div>
            </div>

            <div
                className="col-xl-2 col-12 offset-xl-2 offset-0 bg-danger shadow-lg"
                style={{ height: "740px" }}
            >
                <h1 className="text-center text-white">Reklama</h1>
            </div>
        </div>
    );
};

export default Premium;
