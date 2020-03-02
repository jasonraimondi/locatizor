import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import React from "react";

const isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => !lstatSync(source).isDirectory();

const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(isFile);
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const photoExtensions = [
  ".JPG",
  ".JPEG",
  ".NEF",
];
const photoRegex = new RegExp(photoExtensions.join("|"), "i");
const isPhoto = (file) => photoRegex.test(file);

export const FileTree: React.FC<{ path: string }> = ({path}) => {
  if (!path) {
    return <p>Select Path</p>;
  }

  const files = getFiles(path).filter(isPhoto);

  if (!files) {
    return <p>No Files</p>;
  }

  return <div className="grid grid-rows-4">{files.map((file, idx) => (
    <img key={idx} src={file} alt="" className="col-span-1 inline-block"/>
  ))}</div>;
};
