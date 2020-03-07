import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Photo } from "@/renderer/Photo/Photo";
import { Layout } from "./Layout";
import { Home } from "./Home/Home";

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
