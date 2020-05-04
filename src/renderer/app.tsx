import { Home } from "@/renderer/home";
import { Path } from "@/renderer/providers/path";
import { useCurrentPath } from "@/renderer/providers/use_current_path";
import React, { DragEvent, useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { ElectronSettingService } from "../main/settings_service";
import { pkg } from "../version";
import { Draggable } from "./elements/elements";
import { Settings } from "./settings";

console.log(`allow analytics: ${(!ElectronSettingService.has("analytics-opt-out")).toString()}`);

export const App: React.FC = () => {
  const { setPath } = useCurrentPath();
  // const [isDragging, setIsDragging] = useState(false);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // setIsDragging(true);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const draggedPath = e.dataTransfer?.files?.[0]?.path;

    if (draggedPath) {
      setPath(Path.fromString(draggedPath));
    }
    // setIsDragging(false);
  };

  return <AppWrapper>
    <DraggableTopbar>{pkg.title}</DraggableTopbar>
    <MainContainer onDragOver={onDragOver} onDrop={onDrop}>
      <Switch>
        <Route path="/settings">
          <Settings/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </MainContainer>
  </AppWrapper>;
};

const AppWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas:
        "dragbar"
        "main";
    grid-template-rows: ${props => props.theme.topbar.height} calc(100% - ${props => props.theme.topbar.height});
    grid-template-columns: 1fr;
`;

const DraggableTopbar = styled(Draggable)`
  grid-area: dragbar;
  height: 100%;
  color: ${props => props.theme.gray["700"]};
  background-color: ${props => props.theme.gray["200"]};
  border-bottom: 1px solid ${props => props.theme.gray["400"]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  //display: grid;
  //grid-template-columns: 50% 50%;
`;
