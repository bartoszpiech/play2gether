import React from "react";
import { PageFooter } from "../Assets/Styles/Footer/PageFooter";

export interface FooterProps {
    creatorName: string;
}

export default function Footer(props: FooterProps) {
    return (
        <footer className="bd-footer mt-5 bg-light">
            <PageFooter>Strona wykonana przez: {props.creatorName}</PageFooter>
        </footer>
    );
}
