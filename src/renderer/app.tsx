import React, { DragEvent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { parse } from "path";

import { Photo } from "@/renderer/modules/photo/photo";
import { PathListHistory } from "@/renderer/modules/path_list_history/path_list_history";
import { Home } from "@/renderer/home";
import { MapProvider } from "@/renderer/providers/map_provider";
import { useCurrentPath } from "./providers/current_path";
import { statSync } from "fs";

export const App: React.FC = () => {
  const { setCurrentPath } = useCurrentPath();

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const draggedPath = e.dataTransfer?.files?.[0]?.path;

    if (draggedPath) {
      const stats = statSync(draggedPath);
      let dir = draggedPath;
      if (!stats.isDirectory()) {
        dir = parse(draggedPath).dir;
      }
      setCurrentPath(dir);
    }
  };

  return <div className="h-full" onDragOver={onDragOver} onDrop={onDrop}>
    <Router>
      <Switch>
        <Route path="/photo/:photoId">
          <Photo/>
        </Route>
        <Route path="/oldhome">
          <PathListHistory />
        </Route>
        <Route path="/">
          <MapProvider>
            <Home/>
          </MapProvider>
        </Route>
      </Switch>
    </Router>
  </div>;
};
