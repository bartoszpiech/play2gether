import Premium from "../../../Components/user/Premium";
import AD from "../../../Layouts/AD";

function PagePremium() {
    return (
        <div className="row py-xl-5 py-0 m-0 h-100">
            <div className="col-xl-4 col-12 offset-xl-4 offset-0 p-0">
                <Premium />
            </div>
            <div className="col-xl-2 col-12 offset-xl-2 offset-0 p-0">
                <AD />
            </div>
        </div>
    );
}

export default PagePremium;