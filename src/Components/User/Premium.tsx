function Premium() {
    return (
        <div className="container-fluid d-flex flex-column rounded-3 shadow my-xl-5 my-0 p-5">
            <h1 className="display-1 text-center">Premium</h1>

            <h4 className="my-5 border-bottom text-center">Brak reklam</h4>
            <h4 className="my-5 border-bottom text-center">Dostęp do limitowanych miejsc</h4>
            <h4 className="my-5 rainbow-text border-bottom text-center">Kolorowy nickname</h4>

            <div className="d-grid gap-2 mt-auto">
                <h5 className="text-center">Już od 9.99 zł miesięcznie</h5>
                <button className="btn btn-primary myBtn" type="button">
                    Kup
                </button>
            </div>
        </div>
    );
}

export default Premium;
