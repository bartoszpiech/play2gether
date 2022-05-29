import React from "react";

import AD from "Layouts/AD";
import Login from "Components/Main/Login";

function PageLogin() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-4 col-12 offset-xl-4 offset-0 p-0">
                <Login />
            </div>
            <AD />
        </div>
    );
}

export default PageLogin;
