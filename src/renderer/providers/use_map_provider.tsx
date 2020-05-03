import type { MessageBoxOptions } from "electron";
import { ipcRenderer, nativeImage } from "electron";
import { LatLngTuple } from "leaflet";
import React, { createContext, useContext, useMemo, useState } from "react";
import { pin } from "zondicons";
import { COMMANDS } from "../constants";
import { dialog } from "../elements/clipboard";
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

// 200 santa monica pier
const START_LAT = 34.0108235;
const START_LNG = -118.4956453;

// @ts-ignore
const MapContext = createContext<MapType>();

const getPosition = (exifData: any, position?: [number, number]) => {
  if (position) {
    return [position];
  }
  return [exifData.latitude ?? START_LAT, exifData.longitude ?? START_LNG];
};

export const MapProvider = (props: any) => {
  const { path, files } = useCurrentPath();
  const { exifData } = useExifData();
  const [zoom, setZoom] = useState<number>(12);
  const [userPosition, setUserPosition] = useState<[number, number] | undefined>(undefined);

  const exifPosition = useMemo(() => getPosition(exifData), [exifData]);
  const updateImageGPS = () => {
    update();
  };

  const updateImagesForDirectory = () => {
    update(false);
  };

  const update = async (isSingleImage = true) => {
    if (!path || !userPosition) {
      return;
    }

    let fullPath = path.getFullDirectory();
    let shortPath = path.getDirectory();
    const numToUpdate = isSingleImage ? 1 : files.length;

    if (isSingleImage) {
      fullPath = path.toFullPath();
      shortPath = path.toShortPath();
    }

    const [lat, lng] = userPosition;

    const options: MessageBoxOptions = {
      type: "question",
      buttons: ["Cancel", `Yes, apply update${numToUpdate > 1 ? "s" : ""}`],
      defaultId: 0,
      title: "Apply location updates",
      message: `Are you sure you want to update ${numToUpdate.toLocaleString()} image${numToUpdate > 1 ? "s" : ""}?`,
      detail: shortPath,
      // icon: nativeImage.createFromPath(folderOpenIcon),
    };

    const { response } = await dialog.showMessageBox(null, options);
    if (!response) return;
    ipcRenderer.send(COMMANDS.SetGPS, { path: fullPath, lat, lng, });
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
