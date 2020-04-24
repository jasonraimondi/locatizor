import React from "react";
import styled from "styled-components";

type Props = {
  icon: string;
  height?: string;
  width?: string;
  className?: string;
  onClick?: () => void;
};

export const SVG: React.FC<Props> = ({ icon, height = "1.5rem", width = "1.5rem", ...props }) => {
  return <SvgWrapper
    height={height}
    width={width}
    isClickable={!!props.onClick}
    dangerouslySetInnerHTML={{ __html: icon }}
    {...props} />;
};

type WrapperProps = {
  height: string;
  width: string;
  isClickable: boolean;
};

const SvgWrapper = styled.span<WrapperProps>`
  display: inline-block;
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: ${props => props.isClickable ? "pointer" : "auto"};

  & > svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
