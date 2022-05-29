import React, { useEffect, useState } from "react";
import { PageSearchBox } from "Assets/Styles/SearchBox/PageSearchBox";

import { Heading, SmallHeading, TinyHeading } from "Assets/Styles/SearchBox/Heading";

import SportType from "./SportType";
import AmountOfPeople from "./AmountOfPeople";
import Place from "./Place";
import SportsDatePicker from "./SportsDatePicker";
import { useAppDispatch, useAppSelector } from "hooks";
import { searchEngineThunk } from "Store/place-actions";
import { SportsType } from "./Sports";
import { Checkbox } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./Theme";

interface SearchBoxProps {
    title: string;
}

function SearchBox(props: SearchBoxProps) {
    const [sports, setSports] = useState<string[]>([]);
    const [placesAvailable, setPlacesAvailable] = useState(1);
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [showAllPlaces, setShowAllPlaces] = useState(true);

    const dispatch = useAppDispatch();
    const places = useAppSelector((state) => state.place.places);

    useEffect(() => {
        dispatch(searchEngineThunk(places, sports, placesAvailable, fromDate, toDate,showAllPlaces));
    });

    return (
    <ThemeProvider theme={Theme}>
        <PageSearchBox>
            {/* <Place/> */}
            {/* <SmallHeading>Dodatkowe opcje:</SmallHeading> */}
            <form>
                <Heading>Wyszukaj</Heading>
                <SmallHeading>Sport:</SmallHeading>
                <SportType sports={sports} setSports={setSports} />
                <TinyHeading>Wolne miejsca:</TinyHeading>
                <AmountOfPeople
                    placesAvailable={placesAvailable}
                    setPlacesAvailable={setPlacesAvailable}
                />
                <TinyHeading>Zakres dat:</TinyHeading>
                <SportsDatePicker label="Od" date={fromDate} setDate={setFromDate} />
                <SportsDatePicker label="Do" date={toDate} setDate={setToDate} />
                <TinyHeading>Pokaż wszystkie miejsca:
                <Checkbox
                    checked={showAllPlaces}
                    onChange={(event) => setShowAllPlaces(event.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                />
                </TinyHeading>
                {/* <TinyHeading>Dystans: TODO</TinyHeading> */}
            </form>
        </PageSearchBox>
    </ThemeProvider>
    );
}

export default SearchBox;
