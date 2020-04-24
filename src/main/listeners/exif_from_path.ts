import { readFileSync, existsSync } from "fs";
import * as piexif from "piexifjs";
import { IExif, GPSHelper } from "piexifjs";

export const getExifFromPath = (path?: string): FormattedExifData => {
  if (!path || !existsSync(path)) {
    console.warn("file does not exist", path);
    return {};
  }
  const exifBinary = readFileSync(path).toString("binary");
  const { thumbnail, ...exifObj } = piexif.load(exifBinary);

  delete exifObj["0th"]?.[piexif.TagValues.ExifIFD.MakerNote];
  delete exifObj["1st"]?.[piexif.TagValues.ExifIFD.MakerNote];
  delete exifObj.Exif?.[piexif.TagValues.ExifIFD.MakerNote];
  delete exifObj.GPS?.[piexif.TagValues.ExifIFD.MakerNote];

  return formatExifData(exifObj);
};

export type FormattedExifData = {
  [key in ExifKeys]?: string | number | number[] | number[][];
};

type ExifKeys = "longitudeRef" |
  "longitude" |
  "latitudeRef" |
  "latitude" |
  "width" |
  "height"

const formatExifData = (exifObj: IExif): FormattedExifData => {
  const result: FormattedExifData = {};

  result.longitudeRef = exifObj?.GPS?.[piexif.TagValues.GPSIFD.GPSLongitudeRef];
  result.longitude = exifObj?.GPS?.[piexif.TagValues.GPSIFD.GPSLongitude];
  // @ts-ignore
  if (result.longitude) result.longitude = GPSHelper.dmsRationalToDeg(result.longitude, result.longitudeRef);

  result.latitudeRef = exifObj?.GPS?.[piexif.TagValues.GPSIFD.GPSLatitudeRef];
  result.latitude = exifObj?.GPS?.[piexif.TagValues.GPSIFD.GPSLatitude];
  // @ts-ignore
  if (result.latitude) result.latitude = GPSHelper.dmsRationalToDeg(result.latitude, result.latitudeRef);

  result.width = exifObj?.["0th"]?.[piexif.TagValues.ExifIFD.PixelXDimension];
  if (!result.width) result.width = exifObj?.["1st"]?.[piexif.TagValues.ExifIFD.PixelXDimension];
  if (!result.width) result.width = exifObj.Exif?.[piexif.TagValues.ExifIFD.PixelXDimension];
  if (!result.width) result.width = exifObj.Interop?.[piexif.TagValues.ExifIFD.PixelXDimension];

  result.height = exifObj?.["0th"]?.[piexif.TagValues.ExifIFD.PixelYDimension];
  if (!result.height) result.height = exifObj?.["1st"]?.[piexif.TagValues.ExifIFD.PixelYDimension];
  if (!result.height) result.height = exifObj?.Exif?.[piexif.TagValues.ExifIFD.PixelYDimension];
  if (!result.height) result.height = exifObj?.Interop?.[piexif.TagValues.ExifIFD.PixelYDimension];

  return result;
};
