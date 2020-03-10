import { ipcRenderer } from "electron";

export const getExifDataForPath = (path: string): any => {
  const { success, data, message } = ipcRenderer.sendSync("exif-from-path", path);
  if (!success) {
    console.error({message});
    return {};
  }
  console.log(data);
  return data;
};

export type ValidExifFields = "height" | "width" |
  "latitudeRef" |
  "latitude" |
  "longitudeRef" |
  "longitude";
