import React from "react";
import { PageFooter } from "Assets/Styles/Footer/PageFooter";

export interface FooterProps {
    creatorName: string;
}

export default function Footer(props: FooterProps) {
    return (
        <div className="container-fluid flex-grow-0 flex-shrink-1 p-0">
            <PageFooter>Strona wykonana przez: {props.creatorName}</PageFooter>
        </div>
    );
}
