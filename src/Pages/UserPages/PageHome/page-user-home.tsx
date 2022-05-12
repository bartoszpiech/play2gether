import SearchBox from "Components/SearchBox/SearchBox";
import UserMap from "Components/Maps/UserMap";

import AD from "Layouts/AD";

function PageUserHome() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-2 col-12 offset-0 d-flex p-0">
                <SearchBox title="Wyszukaj" />
            </div>
            <div className="col-xl-8 col-12 offset-0 d-flex p-0">
                <UserMap />
            </div>
            <div className="col-xl-2 col-12 offset-0 d-flex p-0">
                <AD />
            </div>
        </div>
    );
}

export default PageUserHome;
