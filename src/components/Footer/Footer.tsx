import React from 'react';
import { PageFooter } from './styled/PageFooter';

export interface FooterProps {
    creatorName: string;
}


export default function Footer(props: FooterProps) {
    return(
    <PageFooter>
        Strona wykonana przez: { props.creatorName }
    </PageFooter>
    );
}
