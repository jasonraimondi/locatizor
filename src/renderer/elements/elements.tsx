import styled from "styled-components";

export const Button = styled.button`
  background-color: ${props => props.theme.main};
  padding: 2px 5px;
  border-radius: 3px;
  color: ${props => props.theme.white};
`;

export const Draggable = styled.div`
    -webkit-app-region: drag;
`;
