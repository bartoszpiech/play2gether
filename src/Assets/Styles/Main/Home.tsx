import styled from 'styled-components';
const basketball = require('Assets/Images/basketball.jpg');

console.log(basketball)

export const Container = styled.div`
    background-image: url(${basketball});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    min-height: 500px;
`;

export const Heading = styled.h1`
    padding-top: 100px;
    padding-left: 50px;
    padding-bottom: 50px;
    padding-right: 50px;
    color: white;
`;

export const Paragraph = styled.p`
    font-size: 25px;
    padding-left: 50px;
    padding-right: 100px;
    color: white;
    padding-bottom: 20px;
`;
