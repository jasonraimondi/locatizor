import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Photo } from "@/renderer/Photo";

import "./App.css";
import { Layout } from "./Layout";

export const App: React.FC = () => {
  return <Router>
    <Layout>
      <Switch>
        <Route path="/photo/:photoId">
          <Photo/>
        </Route>
        <Route path="/">
          <div className="flex items-center justify-center h-full">List of saved paths</div>
        </Route>
      </Switch>
    </Layout>
  </Router>;
};
