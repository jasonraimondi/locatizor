import React from "react";
import styled from "styled-components";

type Props = {
  icon: string;
  height?: string;
  width?: string;
  className?: string;
  onClick?: () => void;
  style?: any;
};

export const SVG: React.FC<Props> = ({ icon, height = "1.5rem", width = "1.5rem", ...props }) => (
  <SvgWrapper
    height={height}
    width={width}
    isClickable={!!props.onClick}
    dangerouslySetInnerHTML={{ __html: icon }}
    {...props} />
);

const SvgWrapper = styled.span<{
  height: string;
  width: string;
  isClickable: boolean;
}>`
  display: inline-block;
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: ${props => props.isClickable ? "pointer" : "auto"};

  & > svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
    stroke: currentColor;
    color: inherit;
  //stroke: currentColor;
  }
`;
