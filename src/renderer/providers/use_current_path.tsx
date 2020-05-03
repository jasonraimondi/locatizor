import { dialog } from "@/renderer/elements/clipboard";
import React, { createContext, useContext, useMemo, useState } from "react";
import { getFilesForPath } from "../helpers";
import { Path } from "./path";

type CurrentPathType = {
  path: Path;
  files: string[];
  setPath: (path: Path) => void;
  clearPath: () => void;
  openFileSelector: () => Promise<void>;
};

// @ts-ignore
const CurrentPathContext = createContext<CurrentPathType>();

export const CurrentPathProvider = (props: any) => {
  const openFileSelector = async () => {
    const { filePaths: [dir] } = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    if (dir && typeof dir === "string") setPath(Path.fromString(dir));
  };

  const [path, _setPath] = useState<Path>();

  const setPath = (p: Path) => {
    _setPath(p);
  };

  const files = useMemo<string[]>(() => getFilesForPath(path?.getFullDirectory()), [path]);

  return <CurrentPathContext.Provider
    value={{
      files,
      path,
      setPath,
      openFileSelector,
      clearPath: () => {
        _setPath(undefined);
      },
      pathHistory: history,
    }}
    {...props}
  />;
};

export const useCurrentPath = () => useContext<CurrentPathType>(CurrentPathContext);
