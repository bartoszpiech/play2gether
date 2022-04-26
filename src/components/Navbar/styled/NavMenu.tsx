import styled from 'styled-components';

export interface NavMenuProps {
    isActive?: boolean;
}

export const NavMenu = styled.ul<NavMenuProps>`
    color: white;
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    list-style: none;
    text-align: center;
    width: 70vw;
    justify-content: end;
    margin-right: 2rem;

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 500px;
        position: absolute;
        top: 80px;
        left: -100%;
        opacity: 1;
        transition: all 0.5s ease;
        ${ props => props.isActive ? 'background-color: rgb(209, 188, 255); left: 0; opacity: 1; z-index: 1;' : '' };
    }

`;
