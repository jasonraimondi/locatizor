import { ipcMain } from "electron";
import piexifjs from "piexifjs";

ipcMain.on("exif-from-path", (event, path) => {
  try {
    const exifData = piexifjs.load(path);
    event.returnValue = {
      success: true,
      data: exifData
    };
  } catch (e) {
    event.returnValue = {
      success: false,
      data: {},
      message: e.message,
    };
  }
});
