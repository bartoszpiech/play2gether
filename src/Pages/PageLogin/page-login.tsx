import React from "react";

import AD from "../../Layouts/AD";
import Login from "../../Components/Main/Login";

function PageLogin() {
    return (
        <div className="row py-xl-5 py-0 m-0 h-100">
            <div className="col-xl-4 col-12 offset-xl-4 offset-0 p-0">
                <Login />
            </div>
            <div className="col-xl-2 col-12 offset-xl-2 offset-0 p-0">
                <AD />
            </div>
        </div>
    );
}

export default PageLogin;
