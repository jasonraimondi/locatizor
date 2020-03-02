import "./Gallery.css";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import React from "react";

const isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => !lstatSync(source).isDirectory();

const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(isFile).filter(isPhoto);
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const photoExtensions = [
  ".JPG",
  ".JPEG",
  ".NEF",
];
const photoRegex = new RegExp(photoExtensions.join("|"), "i");
const isPhoto = (file) => photoRegex.test(file);

export const Gallery: React.FC<{ path: string }> = ({path}) => {
  if (!path) {
    return <p>BLANK</p>;
  }

  const files = getFiles(path);

  if (!files) {
    return <p>No Files</p>;
  }

  return <div id="gallery">{files.map((file, idx) => (
    <img key={idx} src={file} alt="" className="col-span-1 inline-block"/>
  ))}</div>;
};
