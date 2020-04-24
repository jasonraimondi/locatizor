import { basename } from "path";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";

import "@/renderer/file_list.css";

import { useCurrentPath } from "@/renderer/providers/use_current_path";
import { Path } from "@/renderer/providers/path";
import { allowedPhotoExtensions } from "../is_photo";

function isSelected(path: Path, name: string) {
  return path.toObject().name === name;
}

export const FileList: React.FC<{ files: string[] }> = ({ files }) => {
  const { path, setPath } = useCurrentPath();

  let error: JSX.Element;

  if (!files || files.length === 0) {
    error = <p>
      <span className="h4">I can't seem to find any files here...</span><br/>
      <span>I'm looking for these extensions</span><br/>
      <span>{allowedPhotoExtensions.map(ext => <FileTypes key={ext}>{ext}</FileTypes>)}</span>
    </p>;
  }

  const handleClick = (file: string) => {
    console.log(JSON.stringify(file));
    setPath(Path.fromString(file));
  };

  if (error!) {
    return <ErrorWrapper>{error!}</ErrorWrapper>;
  }

  return <FileListWrapper>
    {files.map((file, idx) => {
      const name = basename(file);
      const _isSelected = isSelected(path, name);
      return (
        <ListItem
          key={idx}
          isSelected={_isSelected}
          className={_isSelected ? "isSelected" : undefined}
                      onClick={() => handleClick(file)}
        >
          {name}
        </ListItem>
      );
    })}
  </FileListWrapper>;
};

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
  ${props => props.isSelected && css`
    background-color: teal;
  `}
  &:hover {
    background-color: ${props => props.theme.gray["200"]};
  }
`;
