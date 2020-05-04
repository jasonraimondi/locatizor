import { SVG } from "@/renderer/elements/svg";

import { useCurrentPath } from "@/renderer/providers/use_current_path";
import React from "react";
import styled from "styled-components";

export const FolderOpen = () => {
  const folderOpenIcon = require("zondicons/folder-outline.svg");
  const { openFileSelector } = useCurrentPath();

  return <FolderOpenWrapper onClick={openFileSelector}>
    <IconBox>
      <Border>
        <StyledSVG icon={folderOpenIcon}/>
      </Border>
    </IconBox>
    <span><strong>Drop</strong> your folder <strong>here</strong></span>
  </FolderOpenWrapper>;
};

const Border = styled.div`
  display: inline-block;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  border: 3px dashed ${props => props.theme.black};
  font-weight: 400;
`;

const IconBox = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const StyledSVG = styled(SVG)`
  margin: 0.25rem 0.25rem 0 0;
  height: 3rem;
  width: 3rem;
`;

const FolderOpenWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:drop {
    background-color: orange;
  }
`;
