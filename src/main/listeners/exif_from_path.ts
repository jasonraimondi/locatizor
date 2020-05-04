import dayjs from "dayjs";
import { existsSync, readFileSync } from "fs";
import * as piexif from "piexifjs";
import { GPSHelper, IExif } from "piexifjs";

export const getExifFromPath = (path?: string): FormattedExifData => {
  if (!path || !existsSync(path)) {
    console.warn("file does not exist", path);
    return {};
  }
  const file = readFileSync(path);
  const { thumbnail, ...exifObj } = piexif.load(file.toString("binary"));

  delete exifObj["0th"]?.[piexif.TagValues.ExifIFD.MakerNote];
  delete exifObj["1st"]?.[piexif.TagValues.ExifIFD.MakerNote];
  delete exifObj.Exif?.[piexif.TagValues.ExifIFD.MakerNote];
  delete exifObj.GPS?.[piexif.TagValues.ExifIFD.MakerNote];

  return formatExifData({ exifObj });
};

export type FormattedExifData = {
  [key in ExifKeys]?: string | number | number[] | number[][];
};

type ExifKeys = "longitudeRef" |
  "longitude" |
  "latitudeRef" |
  "latitude" |
  "captureDate"

const formatExifData = ({ exifObj }: { exifObj: IExif }): FormattedExifData => {
  const result: FormattedExifData = {};

  try {
    // @ts-ignore
    const date = dayjs(exifObj?.Exif?.[piexif.TagValues.ExifIFD.DateTimeOriginal]?.replace?.(/\:/, "-") ?? 0)
      .toDate();
    const options = {
      year: "numeric", month: "long", day: "numeric",
      hour: "numeric", minute: "numeric"
    };
    result.captureDate = new Intl.DateTimeFormat("default", options).format(date);
    // tslint:disable-next-line:no-empty
  } catch (_) {
  }

  result.longitudeRef = exifObj?.GPS?.[piexif.TagValues.GPSIFD.GPSLongitudeRef];
  const longitude = exifObj?.GPS?.[piexif.TagValues.GPSIFD.GPSLongitude];
  if (longitude) {
    // @ts-ignore
    result.longitude = GPSHelper.dmsRationalToDeg(longitude, result.longitudeRef);
  }

  result.latitudeRef = exifObj?.GPS?.[piexif.TagValues.GPSIFD.GPSLatitudeRef];
  const latitude = exifObj?.GPS?.[piexif.TagValues.GPSIFD.GPSLatitude];
  if (latitude) {
    // @ts-ignore
    result.latitude = GPSHelper.dmsRationalToDeg(latitude, result.latitudeRef);
  }

  return result;
};
