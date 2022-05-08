import React from "react";

import SearchBox from "Components/SearchBox/SearchBox";
import UserMap from "Components/Maps/UserMap";

import AD from "Layouts/AD";

function PageUserHome() {
    return (
        <div className="row py-xl-5 py-0 m-0 h-100">
            <div className="col-xl-2 col-12 offset-0 p-0">
                <SearchBox title="Wyszukaj" />
            </div>
            <div className="col-xl-8 col-12 offset-0 p-0">
                <UserMap/>
            </div>
            <div className="col-xl-2 col-12 offset-0 p-0">
                <AD />
            </div>
        </div>
    );
}

export default PageUserHome;

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
