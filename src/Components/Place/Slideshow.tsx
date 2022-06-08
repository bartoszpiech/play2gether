import React from "react";
import { Slide } from "react-slideshow-image";

const Slideshow = (images: any) => {
    const printSlide = (images: any) => {
        return images.map((image: any) => {
            return (
                <div className="each-slide" key={image.id}>
                    <div style={{ backgroundImage: `url(${image.url})` }}></div>
                </div>
            );
        });
    };

    return (
        <div>
            <Slide easing="ease">{images && printSlide(images.images)}</Slide>
        </div>
    );
};

export default Slideshow;
