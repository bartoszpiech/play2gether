import { useAppSelector } from "hooks";
import styled from "styled-components";
import React from "react";
const ADImage = require("Assets/Images/ad.jpg");

interface ADprops {
    variant?: string;
}


/*
 * TODO:
 * tutaj min-width do zrobienia i poprawy
 * dodac a href tez
 */
const ADDiv = styled.div`
    background-image: url(${ADImage});
    min-height: 500px;
    margin-right: auto;
    margin-left: auto;
    min-width: 1000px;
`;


export default function AD(props: ADprops)  {
    const account = useAppSelector((state) => state.user.account)

    if (account?.type === "premium" || account?.type === "admin") {
        return(null);
    }
    return (
        <div className={`
        ${props.variant === "secondary" ? "offset-xl-2" : ""}
        ${props.variant === "tertiary" ? "offset-xl-1" : ""} 
        col-xl-2 col-12 offset-0 d-flex p-0`}>
            <ADDiv>
            </ADDiv>
        </div>
    );
};
