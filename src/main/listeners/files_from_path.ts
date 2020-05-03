import { isPhoto } from "@/is_photo";
import { isOriginal } from "@/main/listeners/set_gps";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";

const isFile = (source: string) => !lstatSync(source).isDirectory();

export const getFiles = (source: string) => (
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isFile)
    .filter(isPhoto)
    .filter(f => !isOriginal(f))
);
