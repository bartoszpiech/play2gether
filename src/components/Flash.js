const Flash = (props) => {
    let alertStyle = "";
    if (props.status === "success")
        alertStyle = "alert alert-success alert-dismissible fade show mt-2 text-center";
    else if (props.status === "fail")
        alertStyle = "alert alert-danger alert-dismissible fade show mt-2 text-center";


    return (
        <div className={alertStyle} role="alert">
            {props.text}
            <button
                type="button"
                className="btn-close"
                onClick={props.handleOnClick}
            ></button>
        </div>
    );
};


export default Flash;