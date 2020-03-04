import { basename } from "path";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ipcRenderer } from "electron";
// import VisibilitySensor from "react-visibility-sensor";

import "./Gallery.css";
// import { Image } from "@/renderer/elements/Image";

export const Gallery: React.FC<{ path: string }> = ({ path }) => {
  if (!path) {
    return <>Open a path to see something</>;
  }

  const files = useMemo(() => getFilesForPath(path), [path]);

  if (!files.data) {
    return <>No Files</>;
  }

  return (
    <>
      {files.data.map((file, idx) => {
        const name = basename(file);
        return (
          <Link key={idx} to={encodeURI(`/photo/${name}`)} className="flex">
            {/*<div className="w-24 h-24">*/}
              {/*<VisibilitySensor>*/}
              {/*  <Image src={file} className="max-w-full h-full"/>*/}
              {/*</VisibilitySensor>*/}
            {/*</div>*/}
            <div className="flex-1 text-xs font-mono truncate">{name}</div>
          </Link>
        );
      })}
    </>
  );
};

export type IPCResponseType<T = any> = {
  success: boolean;
  data: T;
}

export const getFilesForPath = (path: string): IPCResponseType<string[]> => {
  return ipcRenderer.sendSync("files-from-path", { path });
};
