import React, { createContext, useContext, useState } from "react";
import { ParsedPath } from "path";

import { dialog } from "@/renderer/elements/clipboard";
import { ElectronSettingService } from "@/main/settings_service";
import { SETTINGS } from "@/renderer/constants";
import { Path } from "./path";

type CurrentPathType = {
  cacheBuster: number;
  pathHistory: ParsedPath[];
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

  const [history, _setHistory] = useState<ParsedPath[]>(ElectronSettingService.get<string[]>(SETTINGS.PathList));
  const [path, _setPath] = useState<Path>(Path.fromObject(history[0]));

  const [cacheBuster, setCacheBusterVersion] = useState(0);

  const setPath = (p: Path) => {
    const index = history.findIndex((idxPath: ParsedPath) => JSON.stringify(idxPath) === JSON.stringify(p));
    const found = index !== -1;
    if (found) history.splice(index, 1);
    history.unshift(p.toObject());
    ElectronSettingService.set(SETTINGS.PathList, history);
    _setHistory(history);
    _setPath(p);
    setCacheBusterVersion(cacheBuster + 1);
  };

  return <CurrentPathContext.Provider
    value={{
      cacheBuster,
      path,
      setPath,
      openFileSelector,
      pathHistory: history,
    }}
    {...props}
  />;
};

export const useCurrentPath = () => useContext<CurrentPathType>(CurrentPathContext);
