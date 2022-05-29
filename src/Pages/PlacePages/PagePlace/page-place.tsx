import Place from "Components/Place/Place";
import AD from "Layouts/AD";

function PagePlace() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-10 col-12 d-flex p-0">
                <Place />
            </div>
            <AD />
        </div>
    );
}

export default PagePlace;
