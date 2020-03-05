import React, { createContext, useContext, useMemo } from "react";

import {
  getExifDataForPath,
  formatData,
  exifFormatter,
  FORMAT_DATA,
  TYPE_TEST,
  ExifParser,
  VALID_EXIF,
  FORMAT_DATA_SOMETHING
} from "./exif_data_list";

type ExifDataType = {
  rawData: any;
  formattedData: any;
  get: (key: VALID_EXIF) => ExifParser | undefined;
  foo: FORMAT_DATA_SOMETHING;
};

// @ts-ignore
const ExifDataContext = createContext<ExifDataType>();

export const ExifDataProvider = ({ currentPath, ...props }: any) => {
  const rawData = useMemo<TYPE_TEST>(() => getExifDataForPath(currentPath), [currentPath]);
  const formattedData = useMemo<Partial<FORMAT_DATA>>(() => formatData(rawData), [rawData]);

  const get = (key: string): ExifParser | undefined => {
    if (!exifFormatter.hasOwnProperty(key)) {
      console.log("exifFormatter missing props:", key);
      return;
    }
    if (!formattedData.hasOwnProperty(key)) {
      console.log("formattedData missing prop:", key);
      return;
    }
    // @ts-ignore
    return exifFormatter[key](formattedData[key]);
  };

  const foo = () => {
    const exifFormatterKeys = Object.keys(exifFormatter);
    const formattedDataKeys = Object.keys(formattedData);
    const commons = formattedDataKeys.filter((val) => {
      return exifFormatterKeys.indexOf(val) !== -1;
    });
    return commons.reduce((previous, key) => {
      // @ts-ignore
      const result: ExifParser = exifFormatter[key](formattedData[key]);
      return {
        ...previous,
        [key]: result,
      };
    }, {});
  };

  return <ExifDataContext.Provider
    value={{
      rawData,
      formattedData,
      get,
      foo: foo(),
    }}
    {...props}
  />;
};

export const useExifData = () => useContext<ExifDataType>(ExifDataContext);
