import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Photo } from "@/renderer/modules/photo/photo";
import { Layout } from "@/renderer/layout";
import { Home } from "@/renderer/modules/home/home";

export const App: React.FC = () => {
  return <Router>
    <Layout>
      <Switch>
        <Route path="/photo/:photoId">
          <Photo/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  </Router>;
};
