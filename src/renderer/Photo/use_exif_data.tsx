import React, { createContext, useContext, useMemo } from "react";

import {
  getExifDataForPath,
  exifValues,
  ExifDataFormat_SOMETHING,
  ExifParser,
  FORMAT_DATA_SOMETHING
} from "./exif_data_list";

type ExifDataType = {
  exifData: FORMAT_DATA_SOMETHING;
};

// @ts-ignore
const ExifDataContext = createContext<ExifDataType>();

export const ExifDataProvider = ({ currentPath, ...props }: any) => {
  const formatExifData = (unknownExif: ExifDataFormat_SOMETHING) => {
    const exifFormatterKeys = Object.keys(exifValues);
    const unknownExifKeys = Object.keys(unknownExif);
    const commons = unknownExifKeys.filter((val) => {
      return exifFormatterKeys.indexOf(val) !== -1;
    });
    return commons.reduce((previous, key) => {
      // @ts-ignore
      const result: ExifParser = exifValues[key](unknownExif[key]);
      return {
        ...previous,
        [key]: result,
      };
    }, {});
  };

  const rawData = useMemo<ExifDataFormat_SOMETHING>(() => getExifDataForPath(currentPath), [currentPath]);
  const exifData = useMemo(() => formatExifData(rawData), [rawData]);

  return <ExifDataContext.Provider
    value={{
      exifData,
    }}
    {...props}
  />;
};

export const useExifData = () => useContext<ExifDataType>(ExifDataContext);
