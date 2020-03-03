import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { FileSelect } from "@/renderer/FileSelect";
import { Photo } from "@/renderer/Photo";

export const App = () => {

  return <Router>
    <nav className="mt-8">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/photo/2">Two</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route path="/photo/:photoId">
        <Photo/>
      </Route>
      <Route path="/">
        <FileSelect />
      </Route>
    </Switch>
  </Router>;
};
