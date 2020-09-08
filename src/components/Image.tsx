import React from "react";

const ImageComponent = ({ src, alt }: { src: string; alt: string }) => {
    return <img className="card-image" src={src} alt={alt} />;
};

export default ImageComponent;
