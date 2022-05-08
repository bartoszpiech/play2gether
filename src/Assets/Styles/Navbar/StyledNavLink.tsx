import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface StyledNavLinkProps {
    isSignUpButton?: boolean;
}

export const StyledNavLink = styled(NavLink)<StyledNavLinkProps>`
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color: ${ props => props.isSignUpButton ? 'rgb(94,63,161)' : '' };
    &:hover {
        color: ${ props => props.isSignUpButton ? 'rgb(94,63,161)' : 'white' };
        background-color: ${ props => props.isSignUpButton ? 'white' : 'rgb(94, 63, 161)' };
        transition: 0.4s ease-out;
    }
    @media screen and (max-width: 1200px) {
        display: table;
        padding: 2rem;
        text-align: center;
        ${ props => props.isSignUpButton ? `
        margin: auto;
        width: 80%;
        ` : 'width: 100%' };
    }
`;
