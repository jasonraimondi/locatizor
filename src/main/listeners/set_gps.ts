import { readFileSync, writeFileSync, copyFileSync, existsSync } from "fs";
import * as piexif from "piexifjs";

import { renamePhoto } from "@/renderer/providers/rename";

const originalRegex = /\.original\./;
export const isOriginal = (name: string): boolean => originalRegex.test(name);
const hasOriginal = (name: string): boolean => existsSync(renamePhoto(name));

export const setGpsForPhoto = (path: string, { lat, lng }: { lat: number, lng: number }): boolean => {
  const noFileFound = !existsSync(path);

  if (noFileFound) {
    console.log("no file found");
    return false;
  }

  const jpgBinary = readFileSync(path).toString("binary");

  if (isOriginal(path)) {
    return false;
  }

  if (!hasOriginal(path)) {
    copyFileSync(path, renamePhoto(path));
  }

  const exifObj = piexif.load(jpgBinary);
  const newExif = {
    ...exifObj,
    GPS: {
      ...exifObj.GPS,
      [piexif.TagValues.GPSIFD.GPSLatitudeRef]: lat < 0 ? "S" : "N",
      [piexif.TagValues.GPSIFD.GPSLatitude]: piexif.GPSHelper.degToDmsRational(lat),
      [piexif.TagValues.GPSIFD.GPSLongitudeRef]: lng < 0 ? "W" : "E",
      [piexif.TagValues.GPSIFD.GPSLongitude]: piexif.GPSHelper.degToDmsRational(lng),
    },
  };
  const exifBytes = piexif.dump(newExif);
  const newJpegBinary = piexif.insert(exifBytes, jpgBinary);
  const newJpeg = Buffer.from(newJpegBinary, "binary");
  writeFileSync(path, newJpeg);
  console.log("successfully updated gps for", path);
  return true;
};

export type SetGpsArgs = {
  path: string;
  lat: number;
  lng: number;
}
