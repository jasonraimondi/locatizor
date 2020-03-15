import { basename } from "path";
import React, { useMemo } from "react";

import "@/renderer/file_list.css";
import { getFilesForPath } from "@/renderer/helpers";
import { useCurrentPath } from "./providers/current_path";
import { Path } from "./providers/path";
import { useMap } from "./providers/map_provider";

type Props = {
  path: string;
  cacheBusterVersion?: number;
};

export const FileList: React.FC<Props> = ({ path }) => {
  const error = <p>No files selected...</p>;
  const { setPath } = useCurrentPath();
  const { cacheBuster } = useCurrentPath();
  const { setUserPosition } = useMap();

  if (!path) {
    return error;
  }

  const files = useMemo(() => getFilesForPath(path), [path, cacheBuster]);

  if (!files.data || files.data.length === 0) {
    return error;
  }

  const handleClick = (file: string) => {
    setUserPosition(undefined);
    setPath(Path.fromString(file));
  };

  return <ul className="list-reset w-full text-xs font-mono">
    {files.data.map((file, idx) => {
      const name = basename(file);
      return (
        // <Link key={idx} to={encodeURI(`/photo/${name}`)} className="flex hover:bg-blue-200">
        <li key={idx} className="flex-1" onClick={() => handleClick(file)}>
          {name}
        </li>
        // </Link>
      );
    })}
  </ul>;
};
