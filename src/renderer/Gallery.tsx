import { basename } from "path";
import React, { useMemo } from "react";
import { ipcRenderer } from "electron";

import "./Gallery.css";
import { Link } from "react-router-dom";

export const Gallery: React.FC<{ path: string }> = ({ path }) => {
  if (!path) {
    return <>Open a path to see something</>;
  }

  const files = useMemo(() => getFilesForPath(path), [path]);

  if (!files.data) {
    return <>No Files</>;
  }

  return (
    <div>
      {files.data.map((file, idx) => {
        const name = basename(file);
        return (
          <>
            <Link key={idx} to={`/photo/${name}`} className="flex">
              <img src={file} alt="" className="w-24"/>
              <div className="flex-1">Hi ya slugger</div>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export const getFilesForPath = (path: string): { success: boolean, data: string[] } => {
  return ipcRenderer.sendSync("files-from-path", { path });
};