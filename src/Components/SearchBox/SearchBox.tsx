import { PageSearchBox } from "Assets/Styles/SearchBox/PageSearchBox";

import { Heading, SmallHeading, TinyHeading } from "Assets/Styles/SearchBox/Heading";

import SportType from "./SportType";
import AmountOfPeople from "./AmountOfPeople";
import Place from "./Place";
import SportsDatePicker from "./SportsDatePicker";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { searchEngineThunk } from "Store/place-actions";
import { SportsType } from "./Sports";

interface SearchBoxProps {
    title: string;
}

function SearchBox(props: SearchBoxProps) {
    const [sports, setSports] = useState<string[]>([]);
    const [placesAvailable,setPlacesAvailable] = useState(1);

    const dispatch = useAppDispatch();
    const places = useAppSelector(state => state.place.places)

    useEffect(() => {
        dispatch(searchEngineThunk(places,sports,placesAvailable))
        
    });

    return (
        <PageSearchBox>
            {/* <Heading>{this.props.title}</Heading> */}
            {/* <Place/> */}
            {/* <SmallHeading>Dodatkowe opcje:</SmallHeading> */}
            <form>
                <SmallHeading>Sport:</SmallHeading>
                <SportType sports={sports} setSports={setSports} />
                <TinyHeading>Wolne miejsca:</TinyHeading>
                <AmountOfPeople placesAvailable={placesAvailable} setPlacesAvailable={setPlacesAvailable} />
                <TinyHeading>Zakres dat:</TinyHeading>
                <SportsDatePicker label="Od" />
                <SportsDatePicker label="Do" />
                {/* <TinyHeading>Dystans: TODO</TinyHeading> */}
            </form>
        </PageSearchBox>
    );
}

export default SearchBox;
