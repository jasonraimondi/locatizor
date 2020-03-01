import * as React from "react";
import * as ReactDOM from "react-dom";
import { ipcRenderer } from "electron";

import { openLinkExternally } from "@/main/OpenLinkExternally";
import { App } from "@/renderer/App";

document.addEventListener("click", openLinkExternally, false);

export default ReactDOM.render(
  <App/>,
  document.getElementById("app-root"),
);

ipcRenderer.on("file", (event, fn, stat) => {
  console.log("file", event, fn, stat)
});

ipcRenderer.on("directory", (event, fn, stat) => {
  console.log("directory", event, fn, stat)
});
