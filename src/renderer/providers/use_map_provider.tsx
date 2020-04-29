import type { MessageBoxOptions } from "electron";
import { ipcRenderer } from "electron";
import { LatLngTuple } from "leaflet";
import React, { createContext, useContext, useMemo, useState } from "react";

import { ElectronSettingService } from "../../main/settings_service";
import { COMMANDS } from "../constants";
import { dialog } from "../elements/clipboard";
import { Path } from "./path";
import { useCurrentPath } from "./use_current_path";
import { useExifData } from "./use_exif_data";

type MapType = {
  exifPosition: LatLngTuple;
  userPosition: LatLngTuple;
  setUserPosition: (s: any) => void,
  zoom: number,
  setZoom: (z: number) => void;
  updateImagesForDirectory: () => void;
  updateImageGPS: () => void;
};

const START_LAT = 0;
const START_LNG = 0;

// @ts-ignore
const MapContext = createContext<MapType>();

const getPosition = (exifData: any, position?: [number, number]) => {
  if (position) {
    return [position];
  }
  return [exifData.latitude ?? START_LAT, exifData.longitude ?? START_LNG];
};

export const MapProvider = (props: any) => {
  const { path } = useCurrentPath();
  const { exifData } = useExifData();
  const [zoom, setZoom] = useState<number>(12);
  const [userPosition, setUserPosition] = useState<[number, number] | undefined>(undefined);
  const exifPosition = useMemo(() => getPosition(exifData), [exifData]);

  const updateImageGPS = () => {
    update(path?.toFullPath());
  };

  const updateImagesForDirectory = () => {
    update(path?.getFullDirectory());
  };

  const update = (p?: string) => {
    if (!p || !userPosition) {
      return;
    }

    const [lat, lng] = userPosition;

    const options: MessageBoxOptions = {
      type: "question",
      buttons: ["Cancel", "Yes, apply updates"],
      defaultId: 0,
      title: "Apply location updates",
      message: "Are you sure?",
      detail: `This will update the following image:

${Path.fromString(p).toShortString()}

This is crazy yes
      `,
      // checkboxLabel: "Disable this?",
      // checkboxChecked: ElectronSettingService.get("disable-check-dialogue") ?? false,
      // icon: NativeImage.createFromPath(p),
    };

    dialog.showMessageBox(null, options, (response: any, checkboxChecked: any) => {
      ElectronSettingService.set("disable-check-dialog", checkboxChecked);
      console.log(response);
      console.log(checkboxChecked);
      console.log("Callback");
      ipcRenderer.send(COMMANDS.SetGPS, {
        path: p,
        lat,
        lng,
      });
    });
  };

  return <MapContext.Provider
    value={{
      exifPosition,
      userPosition,
      setUserPosition,
      zoom,
      setZoom,
      updateImagesForDirectory,
      updateImageGPS,
    }}
    {...props}
  />;
};

export const useMap = () => useContext<MapType>(MapContext);
