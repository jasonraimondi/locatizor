import React from "react";
import styled from "styled-components";

import { FileList } from "./file_list";
import { MapSearch } from "./map_search";
import { Actions } from "./modules/actions";
import { Details } from "./modules/file_details";
import { FolderSelect } from "./modules/folder_select";
import { Map } from "./modules/map";

export const FolderShow = () => {
  return <FolderShowWrapper>
    <MapWrapper>
      <MapSearch/>
      <Map/>
    </MapWrapper>
    <Details/>
    <FolderSelect/>
    <Separator/>
    <FileList />
    <Actions/>
  </FolderShowWrapper>;
};

const FolderShowWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "folder folder"
    "list list"
    "separator separator"
    "details map"
    "actions actions";
  grid-template-rows: auto 1fr 10px 50% auto;
  grid-template-columns: 50% 50%;
`;

const Separator = styled.div`
  grid-area: separator;
  background-color: ${props => props.theme.gray["900"]};
`;

const MapWrapper = styled.div`
  grid-area: map;
  background-color: ${props => props.theme.gray["500"]};
  position: relative;
`;
