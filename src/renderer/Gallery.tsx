import "./Gallery.css";

import { lstatSync, readdirSync } from "fs";
import { basename, join } from "path";
import { Link, useRouteMatch } from "react-router-dom";
import React from "react";

const isFile = (source: string) => !lstatSync(source).isDirectory();
const getFiles = (source: string) => readdirSync(source).map(name => join(source, name)).filter(isFile).filter(isPhoto);

// const isDirectory = (source: string) => lstatSync(source).isDirectory();
// const getDirectories = (source: string) => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const photoExtensions = [
  ".JPG",
  ".JPEG",
  ".NEF",
];
const photoRegex = new RegExp(photoExtensions.join("|"), "i");
const isPhoto = (file: string) => photoRegex.test(file);

export const Gallery: React.FC<{ path: string }> = ({path}) => {
  const match = useRouteMatch();

  if (!path) {
    return <>Open a path to see something</>;
  }

  const files = getFiles(path);

  if (!files) {
    return <>No Files</>;
  }

  return (
    <div id="gallery">
      {files.map((file, idx) => {
        const name = basename(file);
        return (
          <Link key={idx} to={`${match.path}/photo/${name}`}>
            <img src={file} alt="" className="col-span-1 inline-block"/>
          </Link>
        );
      })}
    </div>
  );
};
