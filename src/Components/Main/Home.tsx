import React from "react";
import Map from "Components/Maps/GoogleMap";
import { Container, Heading, Paragraph } from "Assets/Styles/Main/Home";

function Home() {
    return (
    <Container>
        <Heading>PLAY2GETHER - APLIKACJA ŁĄCZĄCA LUDZI, KTÓRZY PASJONUJĄ SIĘ SPORTEM</Heading>
        <Paragraph>Najlepszy wybór dla osób uprawiających sporty grupowe.</Paragraph>
        <Paragraph>Jest to innowacyjne narzędzie umożliwiające znalezienie znajomych, z którymi będziesz mógł uprawiać przeróżne sporty, takie jak: piłka nożna, piłka ręczna, koszykówka, siatkówka, futsal, hokej na lodzie, hokej na trawie oraz rugby.</Paragraph>
        <Paragraph>Aplikacja jest całkowicie darmowa, jednakże jest możliwość wspierania twórców za pomocą jednorazowej płatności za konto premium</Paragraph>
        <Paragraph>Dołącz do nas już dziś i ciesz się zdrowym trybem życia.</Paragraph>
    </Container>
    );
}


export default Home;
