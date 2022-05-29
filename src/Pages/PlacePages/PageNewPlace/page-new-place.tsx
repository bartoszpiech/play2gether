import NewPlace from "Components/Place/NewPlace";
import AD from "Layouts/AD";

function PageNewPlace() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-4 col-12 offset-xl-4 offset-0 d-flex p-0">
                <NewPlace />
            </div>
            <AD />
        </div>
    );
}

export default PageNewPlace;
