import React from "react";

function Premium() {
    return (
        <div className="p-5 shadow-lg">
            <h1 className="display-1 pb-5 mb-5 text-center">Premium</h1>

            <h4 className="mt-5 pb-2 border-bottom text-center">Brak reklam</h4>

            <h4 className="mt-5 pb-2 border-bottom text-center">Dostęp do limitowanych miejsc</h4>
            <h4 className="mt-5 pb-2 rainbow-text border-bottom text-center">Kolorowy nickname</h4>

            <h5 className="mt-5 pt-5 text-center">Już od 9.99 zł miesięcznie</h5>

            <div className="d-grid gap-2 mt-4">
                <button className="btn btn-primary myBtn" type="button">
                    Kup
                </button>
            </div>
        </div>
    );
}

export default Premium;
