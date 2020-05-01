import "@/renderer/styles/style.css";
import "@/leaflet_hackfix";

import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import { App } from "@/renderer/app";
import { CurrentPathProvider } from "@/renderer/providers/use_current_path";
import { theme } from "./theme";
import { MapProvider } from "./renderer/providers/use_map_provider";
import { ExifDataProvider } from "./renderer/providers/use_exif_data";

import "./fathom"

export default ReactDOM.render(
  <CurrentPathProvider>
    <ExifDataProvider>
      <MapProvider>
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </MapProvider>
    </ExifDataProvider>
  </CurrentPathProvider>,
  document.getElementById("app-root"),
);
