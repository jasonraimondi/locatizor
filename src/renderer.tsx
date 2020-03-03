import "@/renderer/styles/style.css";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "@/renderer/App";
import { CurrentPathProvider } from "@/renderer/providers/currentPath";

export default ReactDOM.render(
  <CurrentPathProvider>
    <App />
  </CurrentPathProvider>,
  document.getElementById("app-root"),
);
