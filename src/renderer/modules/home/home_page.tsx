import styled from "styled-components";
import React from "react";

import { PathListHistory } from "@/renderer/modules/path_list_history/path_list_history";
import { useCurrentPath } from "@/renderer/providers/use_current_path";

export const HomePage = () => {
    const { openFileSelector } = useCurrentPath();
    return (
      <FooBar>
          <PathListHistory/>
          <p><PressButton onClick={openFileSelector}>Press me</PressButton> to select a directory and started</p>
      </FooBar>
    );
};

const PressButton = styled.button`
  background-color: ${props => props.theme.main};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const FooBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 100%;
`;
