import React, { createContext, useContext, useMemo } from "react";

import { getExifDataForPath, ExifDataFormat_SOMETHING, ValidExifFields } from "./exif_data_list";
import { ipcRenderer } from "electron";

type ExifDataType = {
  exifData: { [key in ValidExifFields]: any };
  updateLocationDataForPhoto: any;
};

// @ts-ignore
const ExifDataContext = createContext<ExifDataType>();

export const ExifDataProvider = ({ currentPath, ...props }: any) => {
  const rawData = useMemo<ExifDataFormat_SOMETHING>(() => getExifDataForPath(currentPath), [currentPath]);

  const setGPS = ({ lat, lng }: any): void => {
    ipcRenderer.sendSync("set-gps", {
      path: currentPath,
      lat,
      lng,
    });
  };

  return <ExifDataContext.Provider
    value={{
      exifData: rawData,
      updateLocationDataForPhoto: setGPS,
    }}
    {...props}
  />;
};

export const useExifData = () => useContext<ExifDataType>(ExifDataContext);
