import { basename } from "path";
import React, { useMemo } from "react";
import { ipcRenderer } from "electron";

import "@/renderer/file_list.css";

export const FileList: React.FC<{ path: string }> = ({ path }) => {
  if (!path) {
    return <>Open a path to see something</>;
  }

  const files = useMemo(() => getFilesForPath(path), [path]);

  if (!files.data) {
    return <>No Files</>;
  }

  return <>
    {files.data.map((file, idx) => {
      const name = basename(file);
      return (
        // <Link key={idx} to={encodeURI(`/photo/${name}`)} className="flex hover:bg-blue-200">
        <div key={idx} className="flex-1 text-xs font-mono truncate">{name}</div>
        // </Link>
      );
    })}
  </>;
};

export type IPCResponseType<T = any> = {
  success: boolean;
  data: T;
}

export const getFilesForPath = (path: string): IPCResponseType<string[]> => {
  return ipcRenderer.sendSync("files-from-path", { path });
};
