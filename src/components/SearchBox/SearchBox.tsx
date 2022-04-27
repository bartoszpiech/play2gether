import React, { Component } from 'react';

import { PageSearchBox } from './styled/PageSearchBox';
import { Heading, SmallHeading, TinyHeading } from './styled/Heading';
import SportType from './SportType';
import AmountOfPeople from './AmountOfPeople';
import Place from './Place';

interface SearchBoxProps {
    title: string;
}

export default class SearchBox extends Component<SearchBoxProps> {
    render() {
        return (
            <PageSearchBox>
                <Heading>{this.props.title}</Heading>
                <Place/>
                <SmallHeading>Dodatkowe opcje:</SmallHeading>
                <form>
                    <TinyHeading>Sport:</TinyHeading>
                    <SportType/>
                    <TinyHeading>Ilość wolnych miejsc:</TinyHeading>
                    <AmountOfPeople/>
                    <TinyHeading>Zakres dat: TODO</TinyHeading>
                    <TinyHeading>Dystans: TODO</TinyHeading>
                </form>
            </PageSearchBox>
        );
    }
}
