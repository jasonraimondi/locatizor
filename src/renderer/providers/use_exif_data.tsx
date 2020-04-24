import React, { createContext, useContext, useMemo } from "react";

import { getExifDataForPath } from "@/renderer/modules/photo/exif_data_helpers";
import { useCurrentPath } from "./use_current_path";
import { FormattedExifData } from "../../main/listeners/exif_from_path";

type ExifDataType = {
  exifData: FormattedExifData;
};

// @ts-ignore
const ExifDataContext = createContext<ExifDataType>();

export const ExifDataProvider = (props: any) => {
  const { path } = useCurrentPath();
  const exifData = useMemo(() => getExifDataForPath(path), [path?.toString()]);

  return <ExifDataContext.Provider
    value={{
      exifData,
    }}
    {...props}
  />;
};

export const useExifData = () => useContext<ExifDataType>(ExifDataContext);
