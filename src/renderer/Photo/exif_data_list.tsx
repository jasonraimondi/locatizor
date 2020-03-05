import { ipcRenderer } from "electron";
import ExifData from "exifreader";

export type TYPE_TEST = ExifData.Tags | any

export type VALUE_TAGS = ExifData.ValueTag;

export const getExifDataForPath = (path: string): TYPE_TEST => {
  const { success, data, message } = ipcRenderer.sendSync("exif-from-path", path);
  if (!success) {
    console.error(message);
    return {};
  }

  return data;
};

export type ExifParser = {
  title: string;
  format(): string | number;
}

export const exifFormatter: { [displayValue: string]: SOMETHING } = {
  height: ({ value }) => ({
    title: "Height",
    format: () => Number(value) ?? value.toString(),
  }),
  width: ({ value }) => ({
    title: "Width",
    format: () => Number(value) ?? value.toString(),
  }),
  latitudeRef: ({ description }) => ({
    title: "Latitude Ref",
    format: () => description,
  }),
  latitude: ({ description }) => ({
    title: "Latitude",
    format: () => description,
  }),
  longitudeRef: ({ description }) => ({
    title: "Longitude Ref",
    format: () => description,
  }),
  longitude: ({ description }) => ({
      title: "Longitude",
      format: () => description,
  }),
};

export type SOMETHING = (field: VALUE_TAGS) => ExifParser;
export type FORMAT_DATA = { [key in VALID_EXIF]: VALUE_TAGS };
export type FORMAT_DATA_SOMETHING = { [key in VALID_EXIF]: ExifParser };

export const exifMatchList = {
  height: ["Image Height", "ImageHeight"],
  width: ["Image Width", "ImageWidth"],
  latitudeRef: ["GPSLatitudeRef"],
  latitude: ["GPSLatitude"],
  longitudeRef: ["GPSLongitudeRef"],
  longitude: ["GPSLongitude"],
};

export type VALID_EXIF = "height" | "width" |
  "latitudeRef" |
  "latitude" |
  "longitudeRef" |
  "longitude";

export const formatData = (data: any): Partial<FORMAT_DATA> => {
  const result: Partial<FORMAT_DATA> = {};
  for (const key in exifMatchList) {
    if (exifMatchList.hasOwnProperty(key)) {
      // @ts-ignore
      const [prop] = exifMatchList[key].filter((res: string) => {
        return data.hasOwnProperty(res);
      });
      if (prop) {
        // @ts-ignore
        result[key] = data[prop];
      }
    }
  }
  return result;
};
