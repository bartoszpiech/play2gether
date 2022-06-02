import AdminMap from "Components/Maps/AdminMap";

function PageAdminHome() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-12 offset-0 d-flex p-0">
                <AdminMap />
            </div>
        </div>
    );
}

export default PageAdminHome;
