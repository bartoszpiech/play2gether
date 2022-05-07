import React from "react";


import SearchBox from "../../../Components/SearchBox/SearchBox";
import UserHome from "../../../Components/User/UserHome";
import UserHomeMap from "../../../Components/User/UserHomeMap";

import AD from "../../../Layouts/AD";


function PageUserHome() {
    return (
        <div className="row py-xl-5 py-0 m-0 h-100">
            <div className="col-xl-2 col-12 offset-0 p-0"><SearchBox title="Wyszukaj"/></div>
            <div className="col-xl-8 col-12 offset-0 p-0">
                <UserHomeMap />
            </div>
            <div className="col-xl-2 col-12 offset-0 p-0">
                <AD />
            </div>
        </div>
        
    );
}

export default PageUserHome;
