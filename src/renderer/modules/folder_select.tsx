import React from "react";
import styled from "styled-components";
import { useCurrentPath } from "../providers/use_current_path";

export const FolderSelect = () => {
  const { path, clearPath, openFileSelector } = useCurrentPath();

  return <FolderWrapper>
    <SelectedPath className="truncate" title={path.getDirectory()} onClick={openFileSelector}>
      <p>{path.toShortPath()}</p>
    </SelectedPath>
    <ClosePath onClick={clearPath}>&times;</ClosePath>
  </FolderWrapper>;
};

const FolderWrapper = styled.div`
  padding: 0.5rem;
  grid-area: folder;
  background-color: ${props => props.theme.gray["300"]};
  display: flex;
`;

const SelectedPath = styled.span`
  flex: 1;
  display: flex;
  cursor: pointer;
  width: 100%;
`;

const ClosePath = styled.p`
  font-size: 1.7rem;
  line-height: 1;
  position: relative;
  bottom: 3px;
  cursor: pointer;
`;
