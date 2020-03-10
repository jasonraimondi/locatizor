import { ipcRenderer } from "electron";
import ExifData from "exifreader";

export type ExifTagsType = ExifData.Tags | any

export type ExifValueType = ExifData.ValueTag;

export const getExifDataForPath = (path: string): ExifTagsType => {
  const { success, data, message } = ipcRenderer.sendSync("exif-from-path", path);
  if (!success) {
    console.error(message);
    return {};
  }
  console.log(data);
  return data;
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
export type ExifDataFormat_SOMETHING = { [key in ValidExifFields]: ExifValueType };
export type FORMAT_DATA_SOMETHING = { [key in ValidExifFields]: ExifParser };

export type ValidExifFields = "height" | "width" |
  "latitudeRef" |
  "latitude" |
  "longitudeRef" |
  "longitude";
