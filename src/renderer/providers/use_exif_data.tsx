import { getExifDataForPath } from "@/renderer/modules/photo/exif_data_helpers";
import React, { createContext, useContext, useMemo } from "react";
import { FormattedExifData } from "../../main/listeners/exif_from_path";
import { useCurrentPath } from "./use_current_path";

type ExifDataType = {
  exifData: FormattedExifData;
};

// @ts-ignore
const ExifDataContext = createContext<ExifDataType>();

export const ExifDataProvider = (props: any) => {
  const { path } = useCurrentPath();
  const exifData = useMemo(() => getExifDataForPath(path), [path?.toShortString()]);

  return <ExifDataContext.Provider
    value={{
      exifData,
    }}
    {...props}
  />;
};

export const useExifData = () => useContext<ExifDataType>(ExifDataContext);
