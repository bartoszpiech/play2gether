import React from "react";

import AD from "Layouts/AD";
import Home from "Components/Main/Home";

function PageHome() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-10 col-12 offset-0 p-0">
                <Home />
            </div>
            <AD />
        </div>
    );
}

export default PageHome;
