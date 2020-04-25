import React, { createContext, useContext, useState, useMemo } from "react";

import { LatLngTuple } from "leaflet";
import { useExifData } from "./use_exif_data";
import { ipcRenderer } from "electron";
import { COMMANDS } from "../constants";
import { useCurrentPath } from "./use_current_path";

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
  return [exifData.latitude ?? START_LAT, exifData.longitude ?? START_LNG]
};

export const MapProvider = (props: any) => {
  const { path } = useCurrentPath();
  const { exifData } = useExifData();
  const [zoom, setZoom] = useState<number>(12);
  const [userPosition, setUserPosition] = useState<[number, number]|undefined>(undefined);
  const exifPosition = useMemo(() => getPosition(exifData), [exifData]);

  const updateImageGPS = () => {
    if (!path || !userPosition) {
      return;
    }

    const [lat, lng] = userPosition;

    ipcRenderer.send(COMMANDS.SetGPS, {
      path: path.toFullPath(),
      lat,
      lng,
    });
  }

  const updateImagesForDirectory = () => {
    if (!path || !userPosition) {
      return;
    }

    const [lat, lng] = userPosition;

    ipcRenderer.send(COMMANDS.SetGPS, {
      path: path.getFullDirectory(),
      lat,
      lng,
    });
  }

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
