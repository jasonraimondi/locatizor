import React, { createContext, useContext, useState } from "react";

import { dialog } from "@/renderer/elements/clipboard";
import { ElectronSettingService } from "@/main/settings_service";
import { SETTINGS } from "@/renderer/constants";

type CurrentPathType = {
  pathList: string[];
  currentPath: string;
  setCurrentPath: any;
  handleOpenDirectory(): Promise<void>;
};

// @ts-ignore
const CurrentPathContext = createContext<CurrentPathType>();

export const CurrentPathProvider = (props: any) => {
  const handleOpenDirectory = async () => {
    const { filePaths: [path] } = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    setCurrentPath(path);
  };

  const [pathList, setPathList] = useState<string[]>(ElectronSettingService.get<string[]>(SETTINGS.PathList));
  const [activePath, setActivePath] = useState<string | undefined>(pathList[0]);

  const setCurrentPath = (path: string) => {
    const index = pathList.findIndex((ele: string) => ele === path);
    const found = index !== -1;
    if (found) pathList.splice(index, 1);
    pathList.unshift(path);
    ElectronSettingService.set(SETTINGS.PathList, pathList);
    setPathList(pathList);
    setActivePath(path);
  };

  return <CurrentPathContext.Provider
    value={{
      currentPath: activePath,
      setCurrentPath,
      pathList,
      handleOpenDirectory,
    }}
    {...props}
  />;
};

export const useCurrentPath = () => useContext<CurrentPathType>(CurrentPathContext);
