import { basename } from "path";
import React, { useMemo } from "react";

import "@/renderer/file_list.css";
import { getFilesForPath } from "@/renderer/helpers";
import { useCurrentPath } from "./providers/current_path";

type Props = {
  path: string;
  cacheBusterVersion?: number;
};

export const FileList: React.FC<Props> = ({ path }) => {
  const error = <p>No files selected...</p>;

  const { cacheBusterVersion } = useCurrentPath();

  if (!path) {
    return error;
  }

  const files = useMemo(() => getFilesForPath(path), [path, cacheBusterVersion]);

  if (!files.data || files.data.length === 0) {
    return error;
  }

  return <ul className="list-reset w-full text-xs font-mono">
    {files.data.map((file, idx) => {
      const name = basename(file);
      return (
        // <Link key={idx} to={encodeURI(`/photo/${name}`)} className="flex hover:bg-blue-200">
        <li key={idx} className="flex-1">
          {name}
        </li>
        // </Link>
      );
    })}
  </ul>;
};
