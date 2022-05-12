import React from "react";

function Event() {
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

    return <div>Event</div>;
}

export default Event;
