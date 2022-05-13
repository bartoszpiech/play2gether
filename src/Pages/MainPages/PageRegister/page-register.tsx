import React from "react";

import Register from "Components/Main/Register";
import AD from "Layouts/AD";

function PageRegister() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-4 col-12 offset-xl-4 offset-0 p-0">
                <Register />
            </div>
            <div className="col-xl-2 col-12 offset-xl-2 offset-0 d-flex p-0">
                <AD />
            </div>
        </div>
    );
}

export default PageRegister;
