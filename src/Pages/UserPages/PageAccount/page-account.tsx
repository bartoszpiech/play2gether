import React from "react";

import AD from "Layouts/AD";
import Account from "Components/User/Account";

function PageAccount() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-6 col-12 offset-xl-3 offset-0 d-flex p-0">
                <Account />
            </div>
            <div className="col-xl-2 col-12 offset-xl-1 offset-0 d-flex p-0">
                <AD />
            </div>
        </div>
    );
}

export default PageAccount;
