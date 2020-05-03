import React from "react";
import styled from "styled-components";
import { Button } from "../elements/elements";
import { useCurrentPath } from "../providers/use_current_path";
import { useMap } from "../providers/use_map_provider";

export const Actions = () => {
  const { path } = useCurrentPath();
  const { updateImagesForDirectory, updateImageGPS } = useMap();
  return <ActionsWrapper>
    {path.isDirectory() ?
      undefined :
      <Button onClick={updateImageGPS} style={{ marginRight: 15 }}>Apply to Image</Button>
    }
    <Button onClick={updateImagesForDirectory}>Apply to Directory</Button>
  </ActionsWrapper>;
};

const ActionsWrapper = styled.div`
  grid-area: actions;
  background-color: ${props => props.theme.gray["900"]};
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
`;
