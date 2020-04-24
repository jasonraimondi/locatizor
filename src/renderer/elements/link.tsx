import { Link as ReactLink } from "react-router-dom";
import React from "react";

export const Link: React.FC<{ to: string } & any> = ({ to, children, ...props }) => {
  return <ReactLink to={to} {...props}></ReactLink>;
};

