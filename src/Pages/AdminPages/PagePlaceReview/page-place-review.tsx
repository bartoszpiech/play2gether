import Review from "Components/Place/Review";

function PagePlaceReview() {
    return (
        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-6 offset-xl-3 d-flex p-0">
                <Review />
            </div>
        </div>
    );
}

export default PagePlaceReview;
