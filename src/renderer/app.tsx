import React, { DragEvent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "@/renderer/home";
import { useCurrentPath } from "./providers/current_path";
import { Path } from "./providers/path";

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

  return <div className="h-full" onDragOver={onDragOver} onDrop={onDrop}>
    <Router>
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  </div>;
};
