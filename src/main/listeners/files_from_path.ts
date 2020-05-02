import { isPhoto } from "@/is_photo";
import { isOriginal } from "@/main/listeners/set_gps";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";

// const ignoredFiles = [
//   ".DS_Store",
// ];

const isFile = (source: string) => !lstatSync(source).isDirectory();
// const isIgnoredFile = (source: string) => ignoredFiles.includes(basename(source));
export const getFiles = (source: string) => (
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isFile)
    .filter(isPhoto)
    .filter(f => !isOriginal(f))
    .map(f => {
      console.log(f);
      return f;
    })
);
// const isDirectory = (source: string) => lstatSync(source).isDirectory();
// const getDirectories = (source: string) => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
