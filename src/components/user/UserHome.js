import React, { useCallback, useContext, useEffect } from "react";

import { UserContext } from "../../context/UserContext";

import UserHomeMap from "./UserHomeMap";




const UserHome = () => {
    const [userContext, setUserContext] = useContext(UserContext);

    // const fetchUserDetails = useCallback(() => {
    //     fetch(process.env.REACT_APP_API_ENDPOINT + "me", {
    //         method: "GET",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${userContext.token}`,
    //         },
    //     }).then(async (response) => {
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log(data)
    //             setUserContext((oldValues) => {
    //                 return { ...oldValues, details: data };
    //             });
    //         } else {
    //             if (response.status === 401) {
    //                 // Edge case: when the token has expired.
    //                 // This could happen if the refreshToken calls have failed due to network error or
    //                 // User has had the tab open from previous day and tries to click on the Fetch button
    //                 window.location.reload();
    //             } else {
    //                 setUserContext((oldValues) => {
    //                     return { ...oldValues, details: null };
    //                 });
    //             }
    //         }
    //     });
    // }, [setUserContext, userContext.token]);

    // useEffect(() => {
    //     // fetch only when user details are not present
    //     if (!userContext.details) {
    //         fetchUserDetails();
    //     }
    // }, [userContext.details, fetchUserDetails]);

    // const refetchHandler = () => {
    //     // set details to undefined so that spinner will be displayed and
    //     //  fetchUserDetails will be invoked from useEffect
    //     setUserContext((oldValues) => {
    //         return { ...oldValues, details: undefined };
    //     });
    // };

    // return userContext.details === null ? (
    //     "Error Loading User details"
    // ) : !userContext.details ? (
    //     <Loader />
    // ) : (
    //     <div>
    //     </div>
    // );


    return (
        <div className="row mt-xl-5 mt-1 mx-0">
            <div className="col-xl-2 col-12 offset-0 rounded-3 shadow bg-white p-4 shadow-lg"></div>
            <div className="col-xl-6 col-12 offset-xl-1 offset-0 p-0 shadow-lg" style={{height: "740px"}}>
            <UserHomeMap/>
            </div>
            
            <div className="col-xl-2 col-12 offset-xl-1 offset-0 bg-danger shadow-lg" style={{height: "740px"}}>
                <h1 className="text-center text-white">Reklama</h1>
            </div>
        </div>
    );
    
};

export default UserHome;
