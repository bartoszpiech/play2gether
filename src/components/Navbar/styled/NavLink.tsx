import styled from 'styled-components';

interface NavLinkProps {
    isSignupButton?: boolean;
}

export const NavLink = styled.a<NavLinkProps>`
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    ${ props => props.isSignupButton ? 'background-color: rgb(94, 63, 161)' : '' };
    &:hover {
        background-color: ${ props => props.isSignupButton ? 'white' : 'rgb(94, 63, 161)' };
        ${ props => props.isSignupButton ? 'color: rgb(94, 63, 161)' : '' };
        transition: 0.4s ease-out;
    }

    @media screen and (max-width: 768px) {
        display: table;
        padding: 2rem;
        width: 100%;
        text-align: center;
        ${ props => props.isSignupButton ? 'margin: auto; width: 80%;' : '' };
    }
`;
