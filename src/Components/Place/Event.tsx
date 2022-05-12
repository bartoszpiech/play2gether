import React from "react";
import { useParams } from "react-router-dom";

function Event() {
    let { eventId } = useParams();
    // const join = (id: string) => {
    //     const genericErrorMessage = "Nie udało się Spróbuj później";

    //     setLoading(true);
    //     fetch(process.env.REACT_APP_API_ENDPOINT + `user/event/${id}/join`, {
    //         method: "GET",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json",
    //             // Authorization: `Bearer ${userContext.token}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setPlaceData(data);
    //             if (data.message) setError(data.message || genericErrorMessage);
    //             setErrorVisible(true);
    //             setLoading(false);
    //             fetchData();
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             fetchData();
    //         });
    // };

    // const leave = (id: string) => {
    //     const genericErrorMessage = "Nie udało się Spróbuj później";

    //     setLoading(true);
    //     fetch(process.env.REACT_APP_API_ENDPOINT + `user/event/${id}/leave`, {
    //         method: "GET",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json",
    //             // Authorization: `Bearer ${userContext.token}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setPlaceData(data);
    //             setLoading(false);
    //             if (data.message) setError(data.message || genericErrorMessage);
    //             setErrorVisible(true);
    //             fetchData();
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             fetchData();
    //         });
    // };

    return (
        <div className="row rounded-3 bg-white p-0">
            <h1 className="display-4 text-center py-4">Wydarzenie</h1>
            <div className="col-xl-6 col-12"></div>
            <div className="col-xl-6 col-12"></div>
        </div>
    );
}

export default Event;
