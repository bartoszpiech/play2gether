import styled from 'styled-components';
import basketball from '/basketball.jpg';

export const Container = styled.div`
    background-image: url('{basketball}');
    background-repeat: no-repeat;
    background-size: cover;
`;

export const Heading = styled.h1`
    padding: 100px;
    color: white;
    position: absolute;
`;
