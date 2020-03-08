import { ipcMain } from "electron";
import { readFileSync } from "fs";
import * as piexif from "piexifjs";
import { IExif, GPSHelper } from "piexifjs";

ipcMain.on("exif-from-path", (event, path) => {
  try {
    console.log("HI JASON");
    console.log(path);
    const exifBinary = readFileSync(path).toString("binary");
    const { thumbnail, ...exifObj } = piexif.load(exifBinary);

    try {
      delete exifObj["0th"]?.[piexif.TagValues.ExifIFD.MakerNote];
      delete exifObj["1st"]?.[piexif.TagValues.ExifIFD.MakerNote];
      delete exifObj.Exif?.[piexif.TagValues.ExifIFD.MakerNote];
      delete exifObj.GPS?.[piexif.TagValues.ExifIFD.MakerNote];
    } catch (e) {
      console.log(e);
    }

    event.returnValue = {
      success: true,
      data: formatExifData(exifObj)
    };
  } catch (e) {
    console.log(e);
    event.returnValue = {
      success: false,
      data: {},
      message: e.message,
    };
  }
});

const formatExifData = (exifObj: IExif) => {
  console.log(exifObj);
  const result: any = {};

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

  console.log({ result });
  return result;
};
