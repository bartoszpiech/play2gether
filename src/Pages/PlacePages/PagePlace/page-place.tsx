import React from "react";

import Place from "Components/Place/Place";
import AD from "Layouts/AD";

function PagePlace() {
    return (
        <div className="row py-xl-5 py-0 m-0 h-100">
            <div className="col-xl-6 col-12 offset-xl-3 offset-0 p-0">
                <Place />
            </div>
            <div className="col-xl-2 col-12 offset-xl-1 offset-0 p-0">
                <AD />
            </div>
        </div>
    );
}

export default PagePlace;
