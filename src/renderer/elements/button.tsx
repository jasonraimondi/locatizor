import React from "react";
import "@/renderer/elements/button.css";

type Props = any & {
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <button {...props} className="button">
    {children}
  </button>
};
