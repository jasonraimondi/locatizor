import React, { useMemo } from "react";
import styled from "styled-components";
import { SVG } from "../elements/svg";
import { useCurrentPath } from "../providers/use_current_path";

export const FolderSelect = () => {
  const { path, clearPath, openFileSelector } = useCurrentPath();

  const folderIcon = useMemo(() => require("zondicons/folder-outline.svg"), []);

  return <FolderWrapper>
    <SelectedPath className="truncate" title={path.getDirectory()} onClick={openFileSelector}>
      <p>
        <WrappedSVG icon={folderIcon}></WrappedSVG>
        {path.toShortPath()}
      </p>
    </SelectedPath>
    <ClosePath onClick={clearPath}>&times;</ClosePath>
  </FolderWrapper>;
};

const WrappedSVG = styled(SVG)`
  font-size: 1em;
  padding-right: 0.5em;
  position: relative;
  top: 7px;
  margin-top: -5px;
`;

const FolderWrapper = styled.div`
  grid-area: folder;
  background-color: ${props => props.theme.gray["300"]};
  border-bottom: ${props => props.theme.insideBorder};;
  display: flex;
`;

const SelectedPath = styled.span`
  flex: 1;
  display: flex;
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
`;

const ClosePath = styled.p`
  font-size: 1.7rem;
  line-height: 1;
  position: relative;
  bottom: 3px;
  cursor: pointer;
  padding: 0.5rem;
  padding-left: 0;
`;
