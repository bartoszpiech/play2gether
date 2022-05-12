import React from "react";

import Event from "Components/Event/Event";
import AD from "Layouts/AD";

function PageEvent() {
    return (
        <div className="row py-xl-5 py-0 m-0 h-100">
            <div className="col-xl-6 col-12 offset-xl-3 offset-0 p-0">
                <Event />
            </div>
            <div className="col-xl-2 col-12 offset-xl-1 offset-0 p-0">
                <AD />
            </div>
        </div>
    );
}

export default PageEvent;
