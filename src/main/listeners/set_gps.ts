import { ipcMain } from "electron";
import { readFileSync, writeFileSync, copyFileSync } from "fs";
import * as piexif from "piexifjs";

import { renamePhoto } from "@/renderer/rename";
import { getFiles } from "@/main/listeners/files_from_path";

type Args = {
  path: string;
  lat: number;
  lng: number;
}

ipcMain.on("set-gps", (event, { path, lat, lng }: Args) => {
  const files = getFiles(path);

  for (const file of files) {
    setGpsForPhoto(file, { lat, lng });
  }

  event.returnValue = {
    success: true,
  };
});

// @ts-ignore
const setGpsForPhoto = (path: string, { lat, lng }) => {
  try {
    copyFileSync(path, renamePhoto(path));
    const jpgBinary = readFileSync(path).toString("binary");
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
  } catch (e) {
    console.log(e);
  }
};
