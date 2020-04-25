import React, { createContext, useContext, useState } from "react";

import { dialog } from "@/renderer/elements/clipboard";
import { Path } from "./path";

type CurrentPathType = {
  path: Path;
  setPath: (path: Path) => void;
  openFileSelector: () => Promise<void>;
};

// @ts-ignore
const CurrentPathContext = createContext<CurrentPathType>();

export const CurrentPathProvider = (props: any) => {
  const openFileSelector = async () => {
    const { filePaths: [dir] } = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    setPath(Path.fromString(dir));
  };

  const [path, _setPath] = useState<Path>();

  const setPath = (p: Path) => {
    _setPath(p);
  };

  return <CurrentPathContext.Provider
    value={{
      path,
      setPath,
      openFileSelector,
      pathHistory: history,
    }}
    {...props}
  />;
};

export const useCurrentPath = () => useContext<CurrentPathType>(CurrentPathContext);
