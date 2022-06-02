import SearchBox from "Components/SearchBox/SearchBox";
import UserMap from "Components/Maps/UserMap";
import { useAppDispatch, useAppSelector } from "hooks";

import AD from "Layouts/AD";

function PageUserHome() {
    const account = useAppSelector((state) => state.user.account);
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-2 col-12 offset-0 d-flex p-0">
                <SearchBox title="Wyszukaj" />
            </div>
            <div className={`${account?.type === "premium" ? "col-xl-10" : "col-xl-8"} col-12 offset-0 d-flex p-0`}>
                <UserMap />
            </div>
            <AD />
        </div>
    );
}

export default PageUserHome;
