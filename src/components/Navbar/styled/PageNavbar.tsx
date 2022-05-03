import styled from 'styled-components';

export const PageNavbar = styled.nav`
    background: rgb(94,63,161);
    background: linear-gradient(41deg, rgba(94,63,161,1) 7%, rgba(209,188,255,1) 100%);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    @media screen and (max-width: 1200px) {
        position: relative;
    }
`;
