import "./Gallery.css";

import { lstatSync, readdirSync } from "fs";
import { basename, join } from "path";
import { Link, useRouteMatch } from "react-router-dom";
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
  const match = useRouteMatch();

  if (!path) {
    return <p>BLANK</p>;
  }

  const files = getFiles(path);

  if (!files) {
    return <p>No Files</p>;
  }

  return (
    <div id="gallery">
      {files.map((file, idx) => {
        const name = basename(file);
        return (
          <Link key={idx} to={`/photo/${name}`}>
            <img src={file} alt="" className="col-span-1 inline-block"/>
          </Link>
        );
      })}
    </div>
  );
};
