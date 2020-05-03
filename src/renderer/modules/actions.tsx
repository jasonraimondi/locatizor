import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../theme";
import { Button } from "../elements/elements";
import { SVG } from "../elements/svg";
import { useCurrentPath } from "../providers/use_current_path";
import { useMap } from "../providers/use_map_provider";

export const Actions = () => {
  const cogIcon = useMemo(() => require("zondicons/cog.svg"), []);
  const { path } = useCurrentPath();
  const { updateImagesForDirectory, updateImageGPS } = useMap();
  return <ActionsWrapper>
    <Link to="/settings">
      <SVG icon={cogIcon} style={{ color: theme.gray["100"] }} />
    </Link>
    <div>
      {path.isDirectory() ?
        undefined :
        <Button onClick={updateImageGPS} style={{ marginRight: 15 }}>Apply to Image</Button>
      }
      <Button onClick={updateImagesForDirectory}>Apply to Directory</Button>
    </div>
  </ActionsWrapper>;
};

const ActionsWrapper = styled.div`
  grid-area: actions;
  background-color: ${props => props.theme.gray["900"]};
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`;
