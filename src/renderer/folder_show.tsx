import { Map } from "@/renderer/modules/photo/map";
import React, { useMemo } from "react";

import styled from "styled-components";
import { Button } from "./elements/elements";
import { Image } from "./elements/image";
import { FileList } from "./file_list";
import { MapSearch } from "./map_search";
import { useCurrentPath } from "./providers/use_current_path";
import { useExifData } from "./providers/use_exif_data";
import { useMap } from "./providers/use_map_provider";

export const FolderShow = () => {
  return <FolderShowWrapper>
    <MapWrapper>
      <MapSearch/>
      <Map/>
    </MapWrapper>
    <Details/>
    <FolderSelect/>
    <Separator/>
    <List/>
    <Actions/>
  </FolderShowWrapper>;
};

export const Details = () => {
  const { exifData } = useExifData();
  const { path } = useCurrentPath();

  return <DetailsWrapper>
    <ImageWrapper>
      <Image src={path.toFullPath()} style={{ height: "100%" }}/>
    </ImageWrapper>
    <p>Longitude: {exifData.longitude ?? "?"}</p>
    <p>Latitude: {exifData.latitude ?? "?"}</p>
    <p>Width: {exifData.width ?? "?"}</p>
    <p>Height: {exifData.height ?? "?"}</p>
    <p>Capture Date: {exifData.captureDate ?? "?"}</p>
  </DetailsWrapper>;
};

export const ImageWrapper = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
`

export const FolderSelect = () => {
  const { path, openFileSelector } = useCurrentPath();

  return <FolderWrapper>
    <SelectedPath className="truncate" title={path.getDirectory()} onClick={openFileSelector}>
      {path.getDirectory()}
    </SelectedPath>
  </FolderWrapper>;
};

export const Actions = () => {
  const { updateImagesForDirectory, updateImageGPS } = useMap();
  return <ActionsWrapper>
    <Button onClick={updateImageGPS} style={{ marginRight: 15 }}>Apply to Image</Button>
    <Button onClick={updateImagesForDirectory}>Apply to Directory</Button>
  </ActionsWrapper>;
};

export const List = () => {
  const { path } = useCurrentPath();

  return <ListWrapper>
    {path ? <FileList/> : undefined}
  </ListWrapper>;
};

export const FolderShowWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "folder folder"
    "list list"
    "separator separator"
    "map details"
    "actions actions";
  grid-template-rows: auto 1fr 10px 50% auto;
  grid-template-columns: 50% 50%;
`;

export const Separator = styled.div`
  grid-area: separator;
  background-color: ${props => props.theme.gray["900"]};
`;

export const ActionsWrapper = styled.div`
  grid-area: actions;
  background-color: ${props => props.theme.gray["900"]};
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
`;

export const MapWrapper = styled.div`
  grid-area: map;
  background-color: ${props => props.theme.gray["500"]};
  position: relative;
`;

export const DetailsWrapper = styled.div`
  grid-area: details;
  background-color: ${props => props.theme.gray["400"]};
  overflow-y: auto;
  padding: 0.5rem;
`;

export const FolderWrapper = styled.div`
  padding: 0.5rem;
  grid-area: folder;
  background-color: ${props => props.theme.gray["300"]};
`;

export const ListWrapper = styled.div`
  grid-area: list;
  background-color: ${props => props.theme.gray["100"]};
  overflow-y: auto;
`;

export const SelectedPath = styled.span`
  flex: 1;
  display: flex;
  align-self: center;
  align-items: center;
  cursor: pointer;
`;
