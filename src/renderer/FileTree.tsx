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
  const foo = getFiles(path).filter(isPhoto);
  if (!foo) return <p>No Files</p>;
  return <code style={{ fontSize: 8 }}><pre>
    {foo.join("\n")}
  </pre></code>;
};
