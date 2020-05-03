import "@/leaflet_hackfix";
import { CurrentPathProvider } from "@/renderer/providers/use_current_path";
import "@/renderer/styles/style.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./fathom";
import { App } from "./renderer/app";
import { openLinkExternally } from "./renderer/open_link_externally";
import { ExifDataProvider } from "./renderer/providers/use_exif_data";
import { MapProvider } from "./renderer/providers/use_map_provider";
import { theme } from "./theme";

document.addEventListener("click", openLinkExternally, false);

export default ReactDOM.render(
  <CurrentPathProvider>
    <ExifDataProvider>
      <MapProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <App/>
          </Router>
        </ThemeProvider>
      </MapProvider>
    </ExifDataProvider>
  </CurrentPathProvider>,
  document.getElementById("app-root"),
);
