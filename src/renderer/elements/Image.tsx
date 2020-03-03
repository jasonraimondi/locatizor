import React from "react";
import Img from "react-image";

type Props = {
  src: string;
  className?: string;
};

export const Image: React.FC<Props> = ({ src, className = "", ...props }) => {
  const DEFAULT_IMAGE = require("@/assets/loading.jpg");
  return (
    <Img
      src={[src, `/${DEFAULT_IMAGE.default}`]}
      alt={src}
      className={className.concat("block h-full")}
      {...props}
    />
  );
};
