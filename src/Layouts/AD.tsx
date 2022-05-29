import { useAppSelector } from "hooks";
import React from "react";

interface ADprops {
    variant?: string;
}

export default function AD(props: ADprops)  {
    const account = useAppSelector((state) => state.user.account)

    if (account?.type === "premium") {
        return(null);
    }
    return (
        <div className={`
        ${props.variant === "secondary" ? "offset-xl-2" : ""}
        ${props.variant === "tertiary" ? "offset-xl-1" : ""} 
        col-xl-2 col-12 offset-0 d-flex p-0`}>
            <div className="container-fluid bg-warning py-3" style={{minHeight: "500px"}}>
                {account?.type !== "premium" &&<h1 className="text-center">Reklama</h1>}
            </div>
        </div>
    );
};
