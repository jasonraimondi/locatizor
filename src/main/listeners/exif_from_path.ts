import { IS_DEV_ENV } from "@/environment";
import dayjs from "dayjs";
import { existsSync, readFileSync } from "fs";
import * as piexif from "piexifjs";
import { GPSHelper, IExif } from "piexifjs";
// @ts-ignore
import probe from "probe-image-size";

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

  const imageProbe: ImageProbe = probe.sync(file);

  return formatExifData({ exifObj, imageProbe });
};

type ImageProbe = {
  width: number;
  height: number;
  type: string;
  mime: string;
  wUnits: string;
  hUnits: string;
}

export type FormattedExifData = {
  [key in ExifKeys]?: string | number | number[] | number[][];
};

type ExifKeys = "longitudeRef" |
  "longitude" |
  "latitudeRef" |
  "latitude" |
  "width" |
  "height" |
  "captureDate"

const formatExifData = ({ exifObj, imageProbe }: { exifObj: IExif; imageProbe: any }): FormattedExifData => {
  const result: FormattedExifData = {};

  if (IS_DEV_ENV) console.log(exifObj);

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

  result.width = `${imageProbe.width}${imageProbe.wUnits}`;
  result.height = `${imageProbe.height}${imageProbe.hUnits}`;
  return result;
};
