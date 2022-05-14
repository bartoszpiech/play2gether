import { useAppSelector } from "hooks";
import React from "react";

const AD = () => {
    const account = useAppSelector((state) => state.user.account)

    return (
        <div className="container-fluid bg-warning py-3" style={{minHeight: "500px"}}>
            {account?.type !== "premium" &&<h1 className="text-center">Reklama</h1>}
        </div>
    );
};
export default AD;
