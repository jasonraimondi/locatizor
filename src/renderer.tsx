import "@/renderer/styles/style.css";

import React from "react";
import { parse } from "path";
import ReactDOM from "react-dom";

import { App } from "@/renderer/app";
import { CurrentPathProvider } from "@/renderer/providers/current_path";
import { ElectronSettingService } from "@/main/settings_service";
import { SETTINGS } from "@/renderer/constants";
import { ExifDataProvider } from "./renderer/providers/use_exif_data";
import { MapProvider } from "./renderer/providers/map_provider";
import "./leaflet_hackfix";

if (!ElectronSettingService.has(SETTINGS.PathList)) {
  ElectronSettingService.set(SETTINGS.PathList, [parse("~/")]);
}

export default ReactDOM.render(
  <CurrentPathProvider>
    <ExifDataProvider>
      <MapProvider>
        <App/>
      </MapProvider>
    </ExifDataProvider>
  </CurrentPathProvider>,
  document.getElementById("app-root"),
);
