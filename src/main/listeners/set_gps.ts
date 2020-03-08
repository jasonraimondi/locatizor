import { ipcMain } from "electron";
import { readFileSync, writeFileSync } from "fs";
import * as piexif from "piexifjs";

type Args = {
  path: string;
  lat: number;
  lng: number;
}

ipcMain.on("set-gps", (event, { path, lat, lng }: Args) => {
  try {
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
    writeFileSync(`${path}-newone.jpg`, newJpeg);
    event.returnValue = {
      success: true,
    };
  } catch (e) {
    console.log(e);
    event.returnValue = {
      success: false,
    };
  }
});
