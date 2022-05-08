import React, { Component } from 'react';


import { PageSearchBox } from 'Assets/Styles/SearchBox/PageSearchBox';

import { Heading, SmallHeading, TinyHeading } from 'Assets/Styles/SearchBox/Heading';



import SportType from './SportType';
import AmountOfPeople from './AmountOfPeople';
import Place from './Place';
import SportsDatePicker from './SportsDatePicker';

interface SearchBoxProps {
    title: string;
}

export default class SearchBox extends Component<SearchBoxProps> {
    render() {
        return (
            <PageSearchBox className="rounded-3 shadow-lg">
                <Heading>{this.props.title}</Heading>
                <Place/>
                <SmallHeading>Dodatkowe opcje:</SmallHeading>
                <form>
                    <SmallHeading>Sport:</SmallHeading>
                    <SportType/>
                    <TinyHeading>Wolne miejsca:</TinyHeading>
                    <AmountOfPeople/>
                    <TinyHeading>Zakres dat:</TinyHeading>
                    <SportsDatePicker label="Od"/>
                    <SportsDatePicker label="Do"/>
                    {/* <TinyHeading>Dystans: TODO</TinyHeading> */}
                </form>
            </PageSearchBox>
        );
    }
}
