import React from "react";

type Props = any & {
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <button {...props} className="bg-blue-500 p-4">
    {children}
  </button>
};