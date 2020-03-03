import { ipcMain } from "electron";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { isPhoto } from "@/is_photo";

const isFile = (source: string) => !lstatSync(source).isDirectory();
const getFiles = (source: string) => readdirSync(source).map(name => join(source, name)).filter(isFile).filter(isPhoto);

// const isDirectory = (source: string) => lstatSync(source).isDirectory();
// const getDirectories = (source: string) => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

ipcMain.on("files-from-path", (event, { path }) => {
  try {
    const files = getFiles(path);
    event.returnValue = {
      success: true,
      data: files
    };
  } catch (e) {
    event.returnValue = {
      success: false,
      data: [],
      message: e.message
    };
  }
});
