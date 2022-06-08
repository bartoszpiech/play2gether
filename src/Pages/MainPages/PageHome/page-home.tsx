import React from "react";

import AD from "Layouts/AD";
import Home from "Components/Main/Home";

import { ImageUploader } from "Components/Place/ImageUpload";

function PageHome() {
    return (

        <div className="row flex-grow-1 overflow-auto">
            <div className="col-xl-10 col-12 offset-0 p-0">
                <Home />
            </div>
            <AD />
        </div>
    );
}
/*
 do ustalenia
        <div className="row py-xl-5 py-0 m-0 h-100">
            <div className="col-xl-8 col-12 offset-xl-2 offset-0 p-0">
            <Slideshow />
*/

export default PageHome;
