import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Photo } from "@/renderer/modules/photo/photo";
import { PathListHistory } from "@/renderer/modules/path_list_history/path_list_history";
import { Home } from "@/renderer/home";
import { MapProvider } from "@/renderer/providers/map_provider";

export const App: React.FC = () => {
  return <Router>
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
  </Router>;
};
