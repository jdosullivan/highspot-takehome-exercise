import React from "react";

const ImageComponent = ({ src }: { src: string }) => {
    return <img src={src} alt="Avatar" style={{ width: "50%" }} />;
};

export default ImageComponent;
