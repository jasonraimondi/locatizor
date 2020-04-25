import React, { DragEvent } from "react";
import styled from "styled-components";

import { Home } from "@/renderer/home";
import { useCurrentPath } from "@/renderer/providers/use_current_path";
import { Path } from "@/renderer/providers/path";
import { Draggable } from "./elements/elements";

export const App: React.FC = () => {
  const { setPath } = useCurrentPath();

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const draggedPath = e.dataTransfer?.files?.[0]?.path;

    if (draggedPath) {
      setPath(Path.fromString(draggedPath));
    }
  };

  return <AppWrapper>
    <DraggableTopbar>Locatizor</DraggableTopbar>
    <MainContainer onDragOver={onDragOver} onDrop={onDrop}>
      <Home />
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
