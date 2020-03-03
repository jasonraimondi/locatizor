import { ipcMain } from "electron";
import ExifReader from "exifreader";
import fs from "fs";

ipcMain.on("exif-from-path", (event, arg) => {
  fs.readFile(arg, (error, data) => {
    if (error) {
      event.returnValue = {
        success: false,
        data: {},
      };
      return;
    }

    try {
      const exifData = ExifReader.load(data.buffer);
      delete exifData.MakerNote;
      event.returnValue = {
        success: true,
        data: exifData
      };
    } catch (error) {
      if (error instanceof ExifReader.errors.MetadataMissingError) {
        console.log("No Exif data found", arg);
      }
    }
  });
});
