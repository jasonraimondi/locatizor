import { ipcRenderer } from "electron";
import ExifData from "exifreader";

export type ExifTagsType = ExifData.Tags | any

export type ExifValueType = ExifData.ValueTag;

export const getExifDataForPath = (path: string): ExifTagsType => {
  const { success, data, message } = ipcRenderer.sendSync("exif-from-path", path);
  console.log({data});
  if (!success) {
    console.error(message);
    return {};
  }

  return formatData(data);
};

export const exifMatchList = {
  height: ["Image Height", "ImageHeight"],
  width: ["Image Width", "ImageWidth"],
  latitudeRef: ["GPSLatitudeRef"],
  latitude: ["GPSLatitude"],
  longitudeRef: ["GPSLongitudeRef"],
  longitude: ["GPSLongitude"],
};

export type ExifParser = {
  title: string;
  format(): string | number;
}
const digits = /[^0-9$.,]/g;
export const exifValues: { [displayValue: string]: SOMETHING } = {
  height: ({ value }) => ({
    title: "Height",
    format: () => Number(value) ?? value,
  }),
  width: ({ value }) => ({
    title: "Width",
    format: () => Number(value) ?? value,
  }),
  latitudeRef: ({ description }) => ({
    title: "Latitude Ref",
    format: () => description,
  }),
  latitude: ({ description }) => ({
    title: "Latitude",
    format: () => {
      if (typeof description === "string") {
        return Number(description?.replace(digits, ""));
      }
      return description;
    },
  }),
  longitudeRef: ({ description }) => ({
    title: "Longitude Ref",
    format: () => description,
  }),
  longitude: ({ description }) => ({
    title: "Longitude",
    format: () => {
      if (typeof description === "string") {
        return Number(description?.replace(digits, "")) * -1;
      }
      return description * -1;
    },
  }),
};

export type SOMETHING = (field: ExifValueType) => ExifParser;
export type ExifDataFormat_SOMETHING = { [key in ValidExifFields]: ExifValueType };
export type FORMAT_DATA_SOMETHING = { [key in ValidExifFields]: ExifParser };

export type ValidExifFields = "height" | "width" |
  "latitudeRef" |
  "latitude" |
  "longitudeRef" |
  "longitude";

export const formatData = (data: any): Partial<ExifDataFormat_SOMETHING> => {
  const result: Partial<ExifDataFormat_SOMETHING> = {};
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
