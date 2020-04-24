import { ipcMain } from "electron";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";

import { isPhoto } from "@/is_photo";

const isFile = (source: string) => !lstatSync(source).isDirectory();
export const getFiles = (source: string) =>
  readdirSync(source).map(name => join(source, name)).filter(isFile).filter(isPhoto);

// const isDirectory = (source: string) => lstatSync(source).isDirectory();
// const getDirectories = (source: string) => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
