import "@/renderer/styles/style.css";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "@/renderer/App";

export default ReactDOM.render(
  <App />,
  document.getElementById("app-root"),
);

ipcRenderer.on("file", (event, fn, stat) => {
  console.log("file", event, fn, stat)
});

ipcRenderer.on("directory", (event, fn, stat) => {
  console.log("directory", event, fn, stat)
});
