import "@/renderer/styles/style.css";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "@/renderer/app";
import { CurrentPathProvider } from "@/renderer/providers/current_path";
import { ElectronSettingService } from "@/main/settings_service";
import { SETTINGS } from "@/renderer/constants";

if (!ElectronSettingService.has(SETTINGS.PathList)) {
  ElectronSettingService.set(SETTINGS.PathList, []);
}

export default ReactDOM.render(
  <CurrentPathProvider>
    <App />
  </CurrentPathProvider>,
  document.getElementById("app-root"),
);
