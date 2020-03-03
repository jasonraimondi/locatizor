// import { basename } from "path";
import React, { useMemo } from "react";
// import { Link } from "react-router-dom";
import { ipcRenderer } from "electron";

import "./Gallery.css";

export const Gallery: React.FC<{ path: string }> = ({path}) => {
  if (!path) {
    return <>Open a path to see something</>;
  }

  const files = useMemo(() => getFilesForPath(path), [path]);
  console.log({files});
  if (!files) {
    return <>No Files</>;
  }

  return (
    <div id="gallery">
      HI YA SLUGGER
      {/*{files.map((file, idx) => {*/}
      {/*  const name = basename(file);*/}
      {/*  return (*/}
      {/*    <Link key={idx} to={`/photo/${name}`}>*/}
      {/*      <img src={file} alt="" className="col-span-1 inline-block"/>*/}
      {/*    </Link>*/}
      {/*  );*/}
      {/*})}*/}
    </div>
  );
};

export const getFilesForPath = (path: string): { success: boolean, data: string[] } => {
  return ipcRenderer.sendSync("files-from-path", path);
};