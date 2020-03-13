import { basename } from "path";
import React, { useMemo } from "react";
import { ipcRenderer } from "electron";

import "@/renderer/file_list.css";

export const FileList: React.FC<{ path: string }> = ({ path }) => {
  const error = <p>No files selected...</p>;

  if (!path) {
    return error;
  }

  const files = useMemo(() => getFilesForPath(path), [path]);

  if (!files.data || files.data.length === 0) {
    return error;
  }

  return <ul className="list-reset w-full text-xs font-mono">
    {files.data.map((file, idx) => {
      const name = basename(file);
      return (
        // <Link key={idx} to={encodeURI(`/photo/${name}`)} className="flex hover:bg-blue-200">
        <li key={idx} className="flex-1">{`${name}`}</li>
        // </Link>
      );
    })}
  </ul>;
};

export type IPCResponseType<T = any> = {
  success: boolean;
  data: T;
}

export const getFilesForPath = (path: string): IPCResponseType<string[]> => {
  return ipcRenderer.sendSync("files-from-path", { path });
};
