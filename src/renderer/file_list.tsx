import { Path } from "@/renderer/providers/path";

import { useCurrentPath } from "@/renderer/providers/use_current_path";
import { basename } from "path";
import React from "react";
import styled, { css } from "styled-components";
import { allowedPhotoExtensions } from "../is_photo";

function isSelected(path: Path, name: string) {
  return basename(path.toFullPath()) === name;
}

export const FileList: React.FC = () => {
  const { files, path, setPath, unselectFile } = useCurrentPath();

  let error: JSX.Element;

  if (!files || files.length === 0) {
    error = <p>
      <span className="h4">I can't seem to find any files here...</span><br/>
      <span>I'm looking for these extensions</span><br/>
      <span>{allowedPhotoExtensions.map(ext => <FileTypes key={ext}>{ext}</FileTypes>)}</span>
    </p>;
  }

  const handleClick = (file: string) => {
    setPath(Path.fromString(file));
  };

  let content: any;

  if (error!) {
    content = <ErrorWrapper>{error!}</ErrorWrapper>;
  } else {
    content = <FileListWrapper>
      {files.map((file, idx) => {
        const name = basename(file);
        const _isSelected = isSelected(path, name);
        return (
          <ListItem
            key={idx}
            isSelected={_isSelected}
            className={_isSelected ? "isSelected" : undefined}
            onClick={() => _isSelected ? unselectFile() : handleClick(file)}
          >
            {name}
          </ListItem>
        );
      })}
    </FileListWrapper>;
  }

  return <ListWrapper>
    {path ? content : undefined}
  </ListWrapper>;
};

const ListWrapper = styled.div`
  grid-area: list;
  background-color: ${props => props.theme.gray["100"]};
  overflow-y: auto;
  border-right: ${props => props.theme.insideBorder};
`;

const ErrorWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const FileTypes = styled.strong`
  background-color: ${props => props.theme.gray["300"]};
  margin: 0 0.2rem;
  padding: 0.1rem 0.45rem;
  display: inline-block;
`;

export const FileListWrapper = styled.ul`
	list-style: none;
	margin-left: 0;
	padding-left: 0;
	width: 100%;
	font-size: 0.8rem;
`;

export const ListItem = styled.li<{ isSelected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0.5rem 0.8rem;
  border-bottom: 1px solid ${props => props.theme.gray["400"]};
  &:hover {
    background-color: ${props => props.theme.gray["200"]};
    ${props => props.isSelected && css`
      background-color: ${props.theme.gray["400"]};
    `}
  }
  ${props => props.isSelected && css`
    background-color: ${props.theme.gray["400"]};
  `}
`;
