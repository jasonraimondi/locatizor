import React from "react";
import Img from "react-image";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  [key: string]: any;
};

export const Image: React.FC<Props> = ({ src, alt, className = "", ...props }) => {
  const DEFAULT_IMAGE = require("@/assets/loading.jpg");
  return (
    <Img
      src={[src, `/${DEFAULT_IMAGE.default}`]}
      alt={alt ?? src}
      className={className.concat("")}
      {...props}
    />
  );
};
