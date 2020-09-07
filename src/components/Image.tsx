import React from "react";

const ImageComponent = ({ src, alt }: { src: string; alt: string }) => {
    return <img src={src} alt={alt} style={{ width: "50%" }} />;
};

export default ImageComponent;
