import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const Style = css`
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    &:hover {
        color: white;
        background-color: rgb(94, 63, 161);
        transition: 0.4s ease-out;
    }
    @media screen and (max-width: 1200px) {
        display: table;
        padding: 2rem;
        width: 100%;
        text-align: center;
    }
`;

const StyleSignUp = css`
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color: rgb(94, 63, 161);
    &:hover {
        color: white;
        background-color: white;
        color: rgb(94, 63, 161);
        transition: 0.4s ease-out;
    }
    @media screen and (max-width: 1200px) {
        display: table;
        padding: 2rem;
        width: 100%;
        text-align: center;
        margin: auto; 
        width: 80%;
    }
`;

const SignUpNavLink = styled(NavLink)`
    ${StyleSignUp}
`;

const StyledNavLink = styled(NavLink)`
    ${Style}
`;

export { SignUpNavLink, StyledNavLink };
