import { useCurrentPath } from "./providers/use_current_path";
import { useExifData } from "./providers/use_exif_data";
import React, { useMemo } from "react";
import { getFilesForPath } from "./helpers";
import { FileList } from "./file_list";

import { Map } from "@/renderer/modules/photo/map"

import styled from "styled-components";

export const FolderShow = () => {
  const { path } = useCurrentPath();
  const { exifData } = useExifData();
  const files = useMemo<string[]>(() => getFilesForPath(path?.toDirectory(false)), [path]);

  return <FolderShowWrapper>
    <MapWrapper>
      <Map enabled={true}/>
    </MapWrapper>
    <DetailsWrapper>
      <pre>{JSON.stringify(exifData)}</pre>
      <p>Longitude: {JSON.stringify(exifData.longitude) ?? "unknown"}</p>
      <p>Latitude: {JSON.stringify(exifData.latitude) ?? "unknown"}</p>
      <p>Width: {JSON.stringify(exifData.width) ?? "unknown"}</p>
      <p>Height: {JSON.stringify(exifData.height) ?? "unknown"}</p>
    </DetailsWrapper>
    <FolderWrapper>
      <SelectedPath className="truncate" title={path.toDirectory()}>
        {path.toDirectory()}
      </SelectedPath>
    </FolderWrapper>
    <ListWrapper>
      {path ? <FileList files={files}/> : undefined}
    </ListWrapper>
  </FolderShowWrapper>;
};

const FolderShowWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "map details"
    "folder folder"
    "list list";
  grid-template-rows: 50% auto 1fr;
  grid-template-columns: 50% 50%;
`;

const MapWrapper = styled.div`
  grid-area: map;
  background-color: ${props => props.theme.gray["500"]};
`;

const DetailsWrapper = styled.div`
  grid-area: details;
  background-color: ${props => props.theme.gray["400"]};
  overflow: hidden;
`;

const FolderWrapper = styled.div`
  padding: 0.5rem;
  grid-area: folder;
  background-color: ${props => props.theme.gray["300"]};
  border-top: 0.5rem solid ${props => props.theme.gray["800"]};
  border-bottom: 1px solid ${props => props.theme.gray["400"]};
`;

const ListWrapper = styled.div`
  grid-area: list;
  background-color: ${props => props.theme.gray["100"]};
`;

const SelectedPath = styled.span`
  flex: 1;
  display: flex;
  align-self: center;
  align-items: center;
`;
