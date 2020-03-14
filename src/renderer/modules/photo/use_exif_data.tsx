import React, { createContext, useContext, useMemo } from "react";

import { getExifDataForPath, ValidExifFields } from "@/renderer/modules/photo/exif_data_helpers";

type Foo = { [key in ValidExifFields]: any };

type ExifDataType = {
  exifData: Foo;
  updateLocationDataForPhoto: any;
};

// @ts-ignore
const ExifDataContext = createContext<ExifDataType>();

export const ExifDataProvider = ({ currentPath, ...props }: any) => {
  const rawData = useMemo<Foo>(() => getExifDataForPath(currentPath), [currentPath]);

  return <ExifDataContext.Provider
    value={{
      exifData: rawData,
    }}
    {...props}
  />;
};

export const useExifData = () => useContext<ExifDataType>(ExifDataContext);
